"""Offline regression coverage. Never query Hugging Face in tests."""
import json
from datetime import datetime, timezone
import io
import unittest
from validators.hf_runtime_readback import (
    ReadbackHold, audit, classify_stage, parse_manifest, read_space_stage,
    read_public_space_ids
)


def fixture(stage="RUNNING"):
    return json.dumps({"schema": "szl.vertical-portal-manifest/v1",
                       "generated": "2026-11-21T00:00:00Z",
                       "spaces": {"anatomy": {"url": "https://huggingface.co/spaces/SZLHOLDINGS/anatomy",
                                               "stage_snapshot": stage}}}).encode()


class Response:
    status = 200

    def __init__(self, payload):
        self.stream = io.BytesIO(payload)

    def __enter__(self):
        return self

    def __exit__(self, *_):
        return None

    def read(self, n):
        return self.stream.read(n)


class RuntimeTests(unittest.TestCase):
    def test_running_stage_never_promotes_application_or_inference(self):
        now = datetime(2026, 11, 21, 1, tzinfo=timezone.utc)
        report = audit(fixture(), live=True, reader=lambda _: {"http": 200, "stage": "RUNNING"},
                       public_space_ids={"anatomy"}, now=now)
        self.assertTrue(report["coverage_complete"])
        self.assertTrue(report["runtime_stage_all_running"])
        self.assertEqual(report["non_running_or_unknown"], [])
        self.assertEqual(report["rows"][0]["classification"], "STAGE_RUNNING_ONLY")
        self.assertIsNone(report["rows"][0]["application_ready"])
        self.assertFalse(report["production_admitted"])
        self.assertFalse(report["webgl_verified"])
        self.assertFalse(report["inference_verified"])

    def test_paused_is_not_running_even_with_http_200(self):
        report = audit(fixture("PAUSED"), live=True,
                       reader=lambda _: {"http": 200, "stage": "PAUSED"})
        self.assertEqual(report["rows"][0]["classification"], "STAGE_NOT_RUNNING")
        self.assertFalse(report["runtime_stage_all_running"])
        self.assertEqual(report["non_running_or_unknown"][0]["id"], "anatomy")

    def test_http_503_cannot_be_green_even_with_running_text(self):
        report = audit(fixture(), live=True,
                       reader=lambda _: {"http": 503, "stage": "RUNNING"})
        self.assertEqual(report["rows"][0]["classification"], "RUNTIME_UNKNOWN")

    def test_offline_is_snapshot_only_and_no_network(self):
        report = audit(fixture(), reader=lambda _: self.fail("unexpected network"))
        self.assertEqual(report["readback_state"], "SNAPSHOT_ONLY")
        self.assertEqual(report["checked_spaces"], 0)
        self.assertFalse(report["coverage_complete"])

    def test_staleness_is_explicit_not_inferred_from_running(self):
        now = datetime(2026, 11, 23, tzinfo=timezone.utc)
        report = audit(fixture(), live=True,
                       reader=lambda _: {"http": 200, "stage": "RUNNING"},
                       public_space_ids={"anatomy"}, now=now)
        self.assertFalse(report["snapshot_fresh"])

    def test_duplicate_keys_fail_closed(self):
        with self.assertRaisesRegex(ReadbackHold, "DUPLICATE_JSON_KEY"):
            parse_manifest(b'{"schema":"szl.vertical-portal-manifest/v1","spaces":{},"spaces":{}}')

    def test_refuses_forged_url_or_bad_id(self):
        obj = json.loads(fixture())
        obj["spaces"]["anatomy"]["url"] = "https://other.example/"
        with self.assertRaisesRegex(ReadbackHold, "INVALID_SPACE_URL"):
            parse_manifest(json.dumps(obj).encode())
        obj["spaces"] = {"../secret": {"url": "https://huggingface.co/spaces/SZLHOLDINGS/../secret"}}
        with self.assertRaisesRegex(ReadbackHold, "INVALID_SPACE_ID"):
            parse_manifest(json.dumps(obj).encode())

    def test_http_runtime_stage_and_parse(self):
        calls = []

        def opener(request, timeout):
            calls.append((request.full_url, request.get_method(), timeout))
            return Response(b'{"stage":"RUNNING"}')

        r = read_space_stage("anatomy", opener=opener)
        self.assertEqual(r["classification"], "STAGE_RUNNING_ONLY")
        self.assertEqual(calls[0][0], "https://huggingface.co/api/spaces/SZLHOLDINGS/anatomy/runtime")
        self.assertEqual(calls[0][1], "GET")

    def test_duplicate_response_is_unavailable(self):
        r = read_space_stage("anatomy", opener=lambda *a, **k: Response(b'{"stage":"RUNNING","stage":"RUNNING"}'))
        self.assertEqual(r["classification"], "RUNTIME_UNKNOWN")

    def test_missing_stage_not_green(self):
        self.assertEqual(classify_stage(None), "RUNTIME_UNKNOWN")
        r = read_space_stage("anatomy", opener=lambda *a, **k: Response(b'{}'))
        self.assertEqual(r["classification"], "RUNTIME_UNKNOWN")

    def test_rejects_unbounded_response(self):
        r = read_space_stage("anatomy", opener=lambda *a, **k: Response(b' ' * 65537))
        self.assertEqual(r["classification"], "RUNTIME_UNKNOWN")

    def test_rejects_ssrf_or_zero_timeout(self):
        with self.assertRaisesRegex(ReadbackHold, "INVALID_REQUEST_SCOPE"):
            read_space_stage("../private")
        with self.assertRaisesRegex(ReadbackHold, "INVALID_REQUEST_SCOPE"):
            read_space_stage("anatomy", timeout=0)


    def test_live_scan_without_independent_inventory_must_not_claim_complete(self):
        report = audit(fixture(), live=True,
                       reader=lambda _: {"http": 200, "stage": "RUNNING"})
        self.assertTrue(report["manifest_coverage_complete"])
        self.assertFalse(report["coverage_complete"])
        self.assertFalse(report["public_inventory_checked"])

    def test_public_inventory_mismatch_reports_added_and_missing(self):
        report = audit(fixture(), live=True, public_space_ids={"new-space"},
                       reader=lambda _: {"http": 200, "stage": "RUNNING"})
        self.assertFalse(report["coverage_complete"])
        self.assertEqual(report["public_not_in_manifest"], ["new-space"])
        self.assertEqual(report["manifest_not_in_public"], ["anatomy"])

    def test_official_inventory_exact_and_url_are_required(self):
        requests = []
        def opener(req, timeout):
            requests.append((req.full_url, req.get_method()))
            return Response(b'[{"id":"SZLHOLDINGS/anatomy"}]')
        self.assertEqual(read_public_space_ids(opener=opener), {"anatomy"})
        self.assertEqual(requests[0][0],
                         "https://huggingface.co/api/spaces?author=SZLHOLDINGS&limit=201")
        self.assertEqual(requests[0][1], "GET")

    def test_duplicate_or_external_inventory_is_unavailable(self):
        for bad in (
            b'[{"id":"SZLHOLDINGS/anatomy"},{"id":"SZLHOLDINGS/anatomy"}]',
            b'[{"id":"different-org/anatomy"}]',
            b'[{"id":"SZLHOLDINGS/../private"}]',
            b'[{"id":"SZLHOLDINGS/anatomy","id":"SZLHOLDINGS/another"}]',
            b'[]',
            b'[{"id":"SZLHOLDINGS/anatomy"},false]',
        ):
            with self.subTest(bad=bad[:80]):
                self.assertIsNone(read_public_space_ids(
                    opener=lambda *a, **kw: Response(bad)))

    def test_oversized_and_invalid_inventory_is_unavailable(self):
        self.assertIsNone(read_public_space_ids(
            opener=lambda *a, **kw: Response(b'x' * (4 * 1024 * 1024 + 1))))
        self.assertIsNone(read_public_space_ids(
            opener=lambda *a, **kw: Response(b'not-json')))

    def test_live_inventory_rejects_wrong_types(self):
        for wrong in (["anatomy"], {"../private"}, set()):
            report = audit(fixture(), live=True,
                           reader=lambda _: {"http": 200, "stage": "RUNNING"},
                           public_space_ids=wrong)
            self.assertFalse(report["coverage_complete"])


    def test_all_manifest_spaces_checked_is_not_all_runtime_ready(self):
        report = audit(fixture("PAUSED"), live=True, public_space_ids={"anatomy"},
                       reader=lambda _: {"http": 200, "stage": "PAUSED"})
        self.assertTrue(report["coverage_complete"])
        self.assertFalse(report["runtime_stage_all_running"])
        self.assertEqual(report["non_running_or_unknown"][0]["stage"], "PAUSED")
        self.assertFalse(report["production_admitted"])


if __name__ == "__main__":
    unittest.main()
