# LEADERS - who we studied and what we absorbed

## Tech leaders (3D web)
- three.js (+ WebGPU/TSL) - the estate 3D substrate; data-viz skill pattern (deck.gl next-steps): https://deck.gl/next/docs/whats-new and https://skills.rest/skill/threejs-data-visualization
- deck.gl (AttributeManager, layers for spatial data) - paired with three.js in the estate card brief: https://deck.gl
- Style reference: holographic-media-dashboard (WebGL glassmorphic real-time monitoring): https://github.com/Morlock52/holographic-media-dashboard
- 2026 field survey (three.js vs R3F vs Babylon vs PlayCanvas, WebGPU/WGSL): https://www.pistack.xyz/posts/2026-08-18-threejs-vs-babylonjs-vs-playcanvas-webgl-engine-comparison/ and https://codecudos.com/blog/three-js-vs-react-three-fiber-vs-babylon-js-2026

## HF-side 3D leaders (Spaces to study for the "align HF with cutting-edge 3D" leg)
- 3d-arena CVPR 2026 collection: https://huggingface.co/collections/3d-arena/cvpr-2026
- 3D generation demos (TRELLIS-class): https://huggingface.co/spaces/dsangouanesy/TRELLIS-demo
- HF Spaces 3D search surface: https://huggingface.co/spaces?q=3d

## Panel verdicts (advisory, receipts on device)
- Kimi k3.1-pro, Astra (local), Sol 6.1 (local, community rail) all converge: first 3D targets = governance receipt-DAG, khipu knot geometry, immunity/cyber lattice. Absorb high-refresh shaders + glassmorphism; do NOT copy SaaS aesthetics or simulate intelligence. Trap list: no mock data, no green glows without a measured receipt, no smoothing data to look better, lazy-load with static fallback.

## 2026-11-21 · Python-first runtime qualification (official primary sources)
- **Hugging Face Hub SpaceRuntime**: `get_space_runtime()` exposes a Space stage independent of its Hub landing page. Adapted into our stdlib-only, read-only `validators/hf_runtime_readback.py`, which separates `STAGE_RUNNING_ONLY`, `STAGE_NOT_RUNNING` and `RUNTIME_UNKNOWN` without ever asserting an application's readiness: https://huggingface.co/docs/huggingface_hub/en/package_reference/space_runtime
- **Hugging Face Gradio**: Python-owned interfaces can present images, 3D objects and plots; each vertical can keep Python as its data/validation/control boundary. Actual interactive 3D rendering remains a **separate browser WebGL/WebGPU concern** that needs device-specific fallback tests, rather than pretending a Python runtime-stage witness verifies it: https://huggingface.co/docs/hub/spaces-sdks-gradio
- **vis.gl deck.gl**: high-volume, layered 3D spatial rendering informs the receipt-DAG and khipu-knot visual adapter, but remains **advisory** until tied to immutable measured source data and actual browser evidence: https://deck.gl/docs

**Acceptance line:** GitHub protected-main SHA → immutable HF revision → verified runtime-stage observation → app-level route/renderer check → independently signed inference/evaluation evidence. A green Hub landing-page HEAD or `RUNNING` stage may only satisfy its own, narrower readback. The current portal's 78-Space census is a dated build snapshot, not proof of 78 operational apps. No provider, model, billing, access, or deployment permissions follow from this research.
