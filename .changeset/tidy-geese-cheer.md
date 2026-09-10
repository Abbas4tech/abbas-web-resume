---
"abbas-web-resume": patch
---

Replaced the E2E fixture's fake `images.ctfassets.net` URLs with local placeholder images under `public/fixtures/`. Purely cosmetic — the fake URLs 404'd against the real CDN on every render (Next Image still worked fine, this just quieted the `upstream image response failed` spam in every local/CI E2E run).
