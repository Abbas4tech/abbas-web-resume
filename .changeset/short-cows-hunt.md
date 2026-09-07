---
"abbas-web-resume": patch
---

Capped local Playwright workers at `"50%"` of available cores (was: one per core) and added one local retry, matching what CI already does more conservatively. The default full-core worker count was reliably producing a couple of contention-related flakes per local run of the 6-project matrix — passing in isolation and under `--workers=1`, so not real defects, just too many parallel browser instances fighting for CPU on a single machine.
