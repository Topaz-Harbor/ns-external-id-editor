# AI Run Artifacts

Store role outputs for each task/release in dated folders.

Folder naming:
- `docs/ai-runs/YYYY-MM-DD-<scope>/`

Template source:
- `docs/ai-runs/_templates/`

Recommended files per run:
- `01-product-owner.md`
- `02-architect-planner.md`
- `04-test-verification.md`
- `05-review.md`
- `06-release-operator.md`

Optional:
- `03-implementer.md` (usually just file list + commit hashes)

Guidelines:
- Keep entries short and decision-focused.
- Include command logs/results in Role 4.
- Include findings and residual risk in Role 5.
- Avoid duplicating full diffs already captured by git.
