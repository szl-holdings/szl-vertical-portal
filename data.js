window.PORTAL_DATA = {
 "schema": "szl.vertical-portal/v1",
 "generated": "2026-11-20T23:20:51Z",
 "honesty": [
  "FAIL-CLOSED",
  "MEASURED-ONLY CLAIMS",
  "NO FAKED GREENS",
  "UNAVAILABLE OVER INVENTED",
  "STATIC-FIRST 3D LAZY"
 ],
 "counts": {
  "spaces": 78,
  "models": 399,
  "datasets": 173,
  "repos": 186
 },
 "stage_note": "space stage is a BUILD-TIME snapshot (2026-11-20T23:20:51Z). The link is the live truth; the label is the receipt.",
 "front_doors": [
  {
   "name": "a-11-oy.com",
   "url": "https://a-11-oy.com",
   "state": "MEASURED 200 by sibling OU20 lane 23:05Z"
  },
  {
   "name": "a11oy.net",
   "url": "https://a11oy.net",
   "state": "MEASURED 200 by sibling OU20 lane 23:05Z"
  }
 ],
 "verticals": [
  {
   "key": "maritime",
   "name": "Maritime Intelligence",
   "icon": "sea",
   "tech": "Fluid/wave-mesh point-cloud (three.js ShaderMaterial + deck.gl PointCloudLayer)",
   "source": "AIS/vessel + unit gate counters (mesh APIs) \u2014 UNAVAILABLE until wired",
   "tier": "P1",
   "spaces": [
    {
     "id": "killinchu",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/killinchu",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 7,
   "repos": [
    "anatomy",
    "killinchu",
    "killinchu-ghsa-x4vh-8v6w-fg2m",
    "szl-substrate",
    "szl-vertical-forge",
    "uds-bundles",
    "vertical-services"
   ],
   "model_count": 2,
   "dataset_count": 3
  },
  {
   "key": "anatomy-medical",
   "name": "Anatomy and Medical",
   "icon": "plus",
   "tech": "Volumetric/SDF slicing (three.js volume via WebGL2)",
   "source": "anatomy mesh APIs \u2014 UNAVAILABLE until wired",
   "tier": "P1",
   "spaces": [
    {
     "id": "anatomy",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/anatomy",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "living-anatomy",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/living-anatomy",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 7,
   "repos": [
    "anatomy",
    "cosmos",
    "lean-rlvr-proving-ground",
    "scientific-evidence-gate",
    "szl-evidence-mandate",
    "szl-microscopy-pilot",
    "szl-muhu-frontier"
   ],
   "model_count": 9,
   "dataset_count": 7
  },
  {
   "key": "immunity-cyber",
   "name": "Immunity & Cyber Defense",
   "icon": "shield",
   "tech": "Node-link lattice + particle flow (three.js InstancedMesh)",
   "source": "shield/log counters \u2014 UNAVAILABLE until wired",
   "tier": "P0",
   "spaces": [
    {
     "id": "immune-lattice",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/immune-lattice",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "immune",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/immune",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-safe-stack",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-safe-stack",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "szl-cyber-shield",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-cyber-shield",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "quant-markets",
   "name": "Quant & Markets",
   "icon": "chart",
   "tech": "3D surface/heatmap (deck.gl ScatterplotLayer/CoverageMap)",
   "source": "market/order receipts \u2014 UNAVAILABLE until wired",
   "tier": "P1",
   "spaces": [
    {
     "id": "finance",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/finance",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "puriq-markets",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/puriq-markets",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "assurance-trust",
   "name": "Underwriting & Assurance",
   "icon": "check",
   "tech": "Trust-lattice globe (three.js sphere graph)",
   "source": "trust counters \u2014 UNAVAILABLE until wired",
   "tier": "P2",
   "spaces": [
    {
     "id": "counsel",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/counsel",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "terra",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/terra",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "terra-assurance",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/terra-assurance",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "counsel-assurance",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/counsel-assurance",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "newton-trust-upgrade",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/newton-trust-upgrade",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "khipu-ancient-math",
   "name": "Khipu Ancient Math",
   "icon": "knot",
   "tech": "Procedural knot-string topology (three.js TubeGeometry curves) \u2014 OUR MATH, OUR STYLE",
   "source": "proof-loom adjacency \u2014 UNAVAILABLE until wired",
   "tier": "P0",
   "spaces": [
    {
     "id": "szl-khipu",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-khipu",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "khipu-playground",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/khipu-playground",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "khipu-hologram",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/khipu-hologram",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "khipu-proof-loom",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/khipu-proof-loom",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    },
    {
     "id": "khipu-yachay",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/khipu-yachay",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "governance-evidence",
   "name": "Governance & Evidence",
   "icon": "stamp",
   "tech": "Receipt-chain DAG (three.js force graph; nodes=receipts, edges=supersede/adjudication)",
   "source": "receipt/mesh APIs (lanelogs, gate counters) \u2014 UNAVAILABLE until wired",
   "tier": "P0",
   "spaces": [
    {
     "id": "sentra",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/sentra",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "oac-system-health-lab",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/oac-system-health-lab",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-foundation-confirmation",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-foundation-confirmation",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "prove-it",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/prove-it",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "foundation-confirmation-v2",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/foundation-confirmation-v2",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "governed-receipt-verifier",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/governed-receipt-verifier",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "governed-agent-bench",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/governed-agent-bench",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    },
    {
     "id": "measured-honesty-census",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/measured-honesty-census",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "truth-router",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/truth-router",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "eternal-auditor",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/eternal-auditor",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-receipts-chain",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-receipts-chain",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-provenance-pitch",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-provenance-pitch",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    }
   ],
   "repo_count": 63,
   "repos": [
    "a11oy",
    "anatomy",
    "ayllu",
    "curation-atlas",
    "david-leads",
    "evidence-doctrine",
    "evidence-studio",
    "evidence-typed-formula-governance",
    "frontier-54-runs",
    "frontier-55-runs",
    "frontier-console",
    "governance-as-code",
    "governed-inference-meter",
    "governed-receipt-spec",
    "hatun-mcp",
    "lutar-lean",
    "pentagi",
    "retrieval-bench",
    "scientific-evidence-gate",
    "sda",
    "szl-asset-registry",
    "szl-attestation",
    "szl-billing",
    "szl-capability-ledger",
    "szl-cram",
    "szl-crosscheck",
    "szl-defensive-control-plane",
    "szl-doctrine",
    "szl-estate-os",
    "szl-evidence-core",
    "szl-evidence-litellm",
    "szl-evidence-mandate",
    "szl-fleet-overlay",
    "szl-formula-ledger",
    "szl-gov",
    "szl-governed-norm",
    "szl-govsign",
    "szl-hf-frontier",
    "szl-holdings.github.io",
    "szl-humanitarian-causal-twin",
    "szl-kernel-attest",
    "szl-khipu-scholar",
    "szl-lambda-gate",
    "szl-microscopy-pilot",
    "szl-otel-mesh",
    "szl-platform",
    "szl-provctl",
    "szl-quant-witness",
    "szl-safe-stack",
    "szl-science-forum-corpus",
    "szl-seismic-review",
    "szl-showcase",
    "szl-skills",
    "szl-trust",
    "szl-uds-deployment",
    "szl-v14",
    "szl-vertical-forge",
    "uds-bundles",
    "vertical-services",
    "vgl-cold-replay",
    "warhacker-demo",
    "wink-observatory",
    "yarqa"
   ],
   "model_count": 8,
   "dataset_count": 25
  },
  {
   "key": "frontier-training",
   "name": "Frontier Training Telemetry",
   "icon": "flame",
   "tech": "Latent-space projection (UMAP/t-SNE in deck.gl)",
   "source": "training ledger receipts \u2014 UNAVAILABLE until wired",
   "tier": "P1",
   "spaces": [
    {
     "id": "szl-frontier",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-frontier",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "gdw-frontier",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/gdw-frontier",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-frontier-deck",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-frontier-deck",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "frontier-showcase",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/frontier-showcase",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-muhu-frontier",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-muhu-frontier",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-cram-demo",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-cram-demo",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "frontier-console",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/frontier-console",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "training-ledger-explorer",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/training-ledger-explorer",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "energy-physics",
   "name": "Energy & Physics",
   "icon": "flash",
   "tech": "Vector fields/flux lines (three.js Line2 curves)",
   "source": "energy labels (MEASURED only) \u2014 UNAVAILABLE until wired",
   "tier": "P1",
   "spaces": [
    {
     "id": "lyte",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/lyte",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-energy-hologram",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-energy-hologram",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-energy-ledger",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-energy-ledger",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "world-science-research",
   "name": "World-Science & Research",
   "icon": "globe",
   "tech": "Citation/atlas globe (deck.gl ArcLayer)",
   "source": "corpus graphs \u2014 UNAVAILABLE until wired",
   "tier": "P2",
   "spaces": [
    {
     "id": "david-leads",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/david-leads",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-seismic-review",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-seismic-review",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "curation-atlas",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/curation-atlas",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-second-brain",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-second-brain",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-research-council",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-research-council",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "wink-observatory",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/wink-observatory",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "szl-science-gate-studio",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-science-gate-studio",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "estate-studios",
   "name": "Estate Studios & Ops",
   "icon": "org",
   "tech": "Isometric digital-twin grid (three.js orthographic)",
   "source": "infra-warden/command-center state \u2014 UNAVAILABLE until wired",
   "tier": "P2",
   "spaces": [
    {
     "id": "a11oy",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/a11oy",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "vertical-services",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/vertical-services",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-command-lab",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-command-lab",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-constellation",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-constellation",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    },
    {
     "id": "szl-model-inference-lab",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-model-inference-lab",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "ayllu",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/ayllu",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "yarqa",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/yarqa",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "a11oy-factory",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/a11oy-factory",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "holographic-unify",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/holographic-unify",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "llm-router-live",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/llm-router-live",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-constellation-staging",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-constellation-staging",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    },
    {
     "id": "the-grid",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/the-grid",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-forge-lab",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-forge-lab",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "szl-bench-suite",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-bench-suite",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "szl-typesafe-triage",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-typesafe-triage",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-marketing-1-1",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-marketing-1-1",
     "stage": "RUNNING",
     "sdk": "gradio",
     "owner_note": ""
    },
    {
     "id": "szl-brand-campaign",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-brand-campaign",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "szl-router-control",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-router-control",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "nexus",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/nexus",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "agents-studio",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/agents-studio",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szlholdings-si",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szlholdings-si",
     "stage": "PAUSED",
     "sdk": "docker",
     "owner_note": "PAUSED owner-held"
    },
    {
     "id": "estate-gardener",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/estate-gardener",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-chief-engineer",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-chief-engineer",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-infra-warden",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-infra-warden",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-dream-architect",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-dream-architect",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-marketing",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-marketing",
     "stage": "RUNNING",
     "sdk": "static",
     "owner_note": ""
    },
    {
     "id": "estate-holo",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/estate-holo",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    },
    {
     "id": "szl-command-center",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-command-center",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  },
  {
   "key": "creativity",
   "name": "Creativity & Craft",
   "icon": "art",
   "tech": "Generative-craft gallery curves (CatmullRom + instanced tokens)",
   "source": "atelier creation receipts - UNAVAILABLE until wired",
   "tier": "P2",
   "spaces": [
    {
     "id": "szl-atelier",
     "url": "https://huggingface.co/spaces/SZLHOLDINGS/szl-atelier",
     "stage": "RUNNING",
     "sdk": "docker",
     "owner_note": ""
    }
   ],
   "repo_count": 1,
   "repos": [
    "szl-atelier"
   ],
   "model_count": 1,
   "dataset_count": 2
  },
  {
   "key": "needs-tag",
   "name": "Needs Tag (taxonomy pass pending)",
   "icon": "tag",
   "tech": "UNDECIDED",
   "source": "UNAVAILABLE",
   "tier": "P3",
   "spaces": [],
   "repo_count": 0,
   "repos": [],
   "model_count": 0,
   "dataset_count": 0
  }
 ],
 "sources": {
  "census": "GET-only anonymous HF API + gh repo list, this lane, 2026-11-20T23:15Z",
  "runtime": "per-space /runtime GET at build time",
  "leader_panel": "Kimi k3.1-pro + Astra local + Sol local advisory seats, receipts on device"
 }
};