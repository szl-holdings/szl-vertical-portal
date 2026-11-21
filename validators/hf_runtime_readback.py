"""Fail-closed, read-only Hugging Face Space runtime-stage witness.

A Space stage is never a signed deployment, a healthy application, a model
inference result, or a functioning 3D renderer. No credentials or writes.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

SCHEMA = "szl.hf-space-runtime-readback.v2"
SPACE_ID = re.compile(r"[A-Za-z0-9][A-Za-z0-9_.-]{0,95}\Z")
MAX_MANIFEST_BYTES = 2 * 1024 * 1024
MAX_RESPONSE_BYTES = 64 * 1024
MAX_SPACES = 200
MAX_PUBLIC_LIST_BYTES = 4 * 1024 * 1024
HF_BASE = "https://huggingface.co/api/spaces/SZLHOLDINGS/"
HF_PUBLIC_LIST = "https://huggingface.co/api/spaces?author=SZLHOLDINGS&limit=201"


class ReadbackHold(ValueError):
    """Invalid evidence; never silently promote a Space."""


def _strict_pairs(pairs):
    out = {}
    for key, value in pairs:
        if key in out:
            raise ReadbackHold("DUPLICATE_JSON_KEY")
        out[key] = value
    return out


def _decode(raw: bytes, limit: int) -> dict:
    if not isinstance(raw, bytes) or not 0 < len(raw) <= limit:
        raise ReadbackHold("INVALID_BYTE_LENGTH")
    try:
        value = json.loads(raw.decode("utf-8"), object_pairs_hook=_strict_pairs,
                           parse_constant=lambda _: (_ for _ in ()).throw(ReadbackHold("NONFINITE_JSON")))
    except (UnicodeError, json.JSONDecodeError, RecursionError) as exc:
        raise ReadbackHold("INVALID_JSON") from exc
    if not isinstance(value, dict):
        raise ReadbackHold("INVALID_JSON_OBJECT")
    return value


def parse_manifest(raw: bytes) -> dict:
    m = _decode(raw, MAX_MANIFEST_BYTES)
    spaces = m.get("spaces")
    if m.get("schema") != "szl.vertical-portal-manifest/v1" or not isinstance(spaces, dict):
        raise ReadbackHold("INVALID_MANIFEST_SCHEMA")
    if not 0 < len(spaces) <= MAX_SPACES:
        raise ReadbackHold("INVALID_SPACE_COUNT")
    for name, row in spaces.items():
        if not isinstance(name, str) or not SPACE_ID.fullmatch(name):
            raise ReadbackHold("INVALID_SPACE_ID")
        if not isinstance(row, dict) or row.get("url") != "https://huggingface.co/spaces/SZLHOLDINGS/" + name:
            raise ReadbackHold("INVALID_SPACE_URL")
    return m


def classify_stage(stage: object) -> str:
    if stage == "RUNNING":
        return "STAGE_RUNNING_ONLY"
    if stage in ("PAUSED", "SLEEPING", "BUILDING", "STARTING", "STOPPED", "RUNTIME_ERROR", "BUILD_ERROR", "CONFIG_ERROR", "DELETING"):
        return "STAGE_NOT_RUNNING"
    return "RUNTIME_UNKNOWN"


def read_space_stage(name: str, *, opener=urlopen, timeout: float = 5.0) -> dict:
    if not SPACE_ID.fullmatch(name) or not 0 < timeout <= 15:
        raise ReadbackHold("INVALID_REQUEST_SCOPE")
    req = Request(HF_BASE + name + "/runtime", headers={
        "Accept": "application/json", "User-Agent": "szl-vertical-portal-readback/1.0"}, method="GET")
    try:
        with opener(req, timeout=timeout) as response:
            status = response.status
            if status != 200:
                return {"http": status, "stage": None, "classification": "RUNTIME_UNKNOWN"}
            raw = response.read(MAX_RESPONSE_BYTES + 1)
        data = _decode(raw, MAX_RESPONSE_BYTES)
        stage = data.get("stage")
        if type(stage) is not str:
            stage = None
        return {"http": 200, "stage": stage, "classification": classify_stage(stage)}
    except HTTPError as exc:
        return {"http": exc.code, "stage": None, "classification": "RUNTIME_UNKNOWN"}
    except (URLError, TimeoutError, OSError, ReadbackHold):
        return {"http": None, "stage": None, "classification": "RUNTIME_UNKNOWN"}



def read_public_space_ids(*, opener=urlopen, timeout: float = 10.0) -> set[str] | None:
    """Independently list publicly visible org Spaces, not a credentialed census.

    A truncated, denied, malformed, duplicate, or unexpectedly large list is
    UNKNOWN, never zero, complete, or permission to create/wake a Space.
    """
    if not 0 < timeout <= 15:
        raise ReadbackHold("INVALID_REQUEST_SCOPE")
    req = Request(HF_PUBLIC_LIST, headers={
        "Accept": "application/json", "User-Agent": "szl-vertical-portal-readback/1.0"}, method="GET")
    try:
        with opener(req, timeout=timeout) as response:
            if response.status != 200:
                return None
            raw = response.read(MAX_PUBLIC_LIST_BYTES + 1)
        if not 0 < len(raw) <= MAX_PUBLIC_LIST_BYTES:
            return None
        entries = json.loads(raw.decode("utf-8"), object_pairs_hook=_strict_pairs,
                             parse_constant=lambda _: (_ for _ in ()).throw(ReadbackHold("NONFINITE_JSON")))
        if not isinstance(entries, list) or not 0 < len(entries) < MAX_SPACES:
            return None
        names: set[str] = set()
        for row in entries:
            full_id = row.get("id") if isinstance(row, dict) else None
            if not isinstance(full_id, str) or not full_id.startswith("SZLHOLDINGS/"):
                return None
            name = full_id[len("SZLHOLDINGS/"):]
            if not SPACE_ID.fullmatch(name) or name in names:
                return None
            names.add(name)
        return names
    except (HTTPError, URLError, TimeoutError, OSError, UnicodeError,
            json.JSONDecodeError, RecursionError, ReadbackHold):
        return None


def audit(manifest_raw: bytes, *, live: bool = False, limit: int = 10, reader=read_space_stage,
          now=None, public_space_ids: set[str] | None = None) -> dict:
    manifest = parse_manifest(manifest_raw)
    names = sorted(manifest["spaces"])
    public_list_checked = type(public_space_ids) is set and all(
        isinstance(x, str) and SPACE_ID.fullmatch(x) for x in public_space_ids
    )
    observed = public_space_ids if public_list_checked else None
    inventory_match = observed is not None and observed == set(names)
    if not isinstance(limit, int) or type(limit) is bool or not 1 <= limit <= MAX_SPACES:
        raise ReadbackHold("INVALID_SCAN_LIMIT")
    now = now or datetime.now(timezone.utc)
    if now.tzinfo is None:
        raise ReadbackHold("NAIVE_CLOCK")
    age_seconds = None
    try:
        generated = datetime.fromisoformat(manifest["generated"].replace("Z", "+00:00"))
        age_seconds = int((now - generated).total_seconds())
    except (ValueError, TypeError, AttributeError):
        pass
    inspected = names[:limit] if live else []
    rows = []
    for name in inspected:
        result = reader(name)
        if not isinstance(result, dict):
            result = {}
        vertical = manifest["spaces"][name].get("vertical")
        if not isinstance(vertical, str) or not 0 < len(vertical) <= 64:
            vertical = "UNASSIGNED"
        rows.append({"id": name, "vertical": vertical,
                     "http": result.get("http"), "stage": result.get("stage"),
                     "classification": classify_stage(result.get("stage")) if result.get("http") == 200 else "RUNTIME_UNKNOWN",
                     "application_ready": None, "renderer_verified": False,
                     "signed_inference_verified": False})
    by_vertical: dict[str, dict[str, int]] = {}
    for row in rows:
        counts = by_vertical.setdefault(row["vertical"], {
            "checked": 0, "stage_running": 0, "stage_not_running": 0, "runtime_unknown": 0
        })
        counts["checked"] += 1
        state = row["classification"]
        if state == "STAGE_RUNNING_ONLY":
            counts["stage_running"] += 1
        elif state == "STAGE_NOT_RUNNING":
            counts["stage_not_running"] += 1
        else:
            counts["runtime_unknown"] += 1
    return {
        "schema": SCHEMA,
        "checked_at_utc": now.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
        "manifest_sha256": hashlib.sha256(manifest_raw).hexdigest(),
        "snapshot_age_seconds": age_seconds,
        "snapshot_fresh": age_seconds is not None and 0 <= age_seconds <= 86400,
        "expected_spaces": len(names), "checked_spaces": len(rows),
        "manifest_coverage_complete": live and len(rows) == len(names),
        "public_inventory_scope": "PUBLIC_ANONYMOUS_ONLY",
        "public_inventory_checked": observed is not None,
        "public_inventory_matches_manifest": inventory_match,
        "public_inventory_count": len(observed) if observed is not None else None,
        "public_not_in_manifest": sorted(observed - set(names)) if observed is not None else None,
        "manifest_not_in_public": sorted(set(names) - observed) if observed is not None else None,
        "coverage_complete": live and len(rows) == len(names) and inventory_match,
        "runtime_stage_all_running": live and len(rows) == len(names) and bool(rows)
                                     and all(row["classification"] == "STAGE_RUNNING_ONLY" for row in rows),
        "vertical_runtime_stage_counts": dict(sorted(by_vertical.items())),
        "non_running_or_unknown": [
            {"id": row["id"], "vertical": row["vertical"], "stage": row["stage"], "http": row["http"]}
            for row in rows if row["classification"] != "STAGE_RUNNING_ONLY"
        ],
        "readback_state": "LIVE_RUNTIME_STAGE_ONLY" if live else "SNAPSHOT_ONLY",
        "production_admitted": False, "inference_verified": False, "webgl_verified": False,
        "rows": rows,
    }


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, default=Path(__file__).resolve().parents[1] / "MANIFEST.json")
    parser.add_argument("--live", action="store_true", help="read only official public Space runtime endpoints")
    parser.add_argument("--all", action="store_true", help="check every manifest Space (up to 200)")
    parser.add_argument("--limit", type=int, default=10)
    args = parser.parse_args(argv)
    try:
        manifest_raw = args.manifest.read_bytes()
        limit = MAX_SPACES if args.all else args.limit
        public_space_ids = read_public_space_ids() if args.live else None
        report = audit(manifest_raw, live=args.live, limit=limit,
                       public_space_ids=public_space_ids)
    except (OSError, ReadbackHold) as exc:
        print(json.dumps({"schema": SCHEMA, "state": "HOLD", "error": type(exc).__name__}))
        return 2
    print(json.dumps(report, sort_keys=True, separators=(",", ":")))
    if args.live and (not report["coverage_complete"] or not report["snapshot_fresh"] or
                      not report["runtime_stage_all_running"]):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
