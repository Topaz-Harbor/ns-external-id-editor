# Role 2 - Architect / Planner (Codex)

## Purpose
Produce a concrete implementation plan before code changes.

## Inputs
- Approved Role 1 requirements
- Current repo structure and constraints

## Output
- Plan only (no code edits)
- Files and modules to change
  - Explicit list of files to be created
- Data flow: input -> processing -> output
- Risks, unknowns, and assumptions
- Deployment confirmation checklist (required when creating/updating objects):
  - record targeting (`RECORD` vs specific types)
  - status (`TESTING` or `RELEASED`)
  - `isdeployed` (`T` or `F`)
  - log level
  - audience/access controls

## Guardrails
- No code changes in this phase.
- Keep plan aligned to Role 1 scope and non-goals.
- Flag anything missing that could block implementation.
- Follow guidelines in `AI/Guidelines/SDF Projects.md`.
- Follow script object structure rules in `AI/Guidelines/SDF Script Objects.md`.
- Follow UE script coding standards in `AI/Guidelines/SuiteScript User Event Scripts.md`.
- Do not treat git repo root as project root.
- Plan against the SDF project folder under `repo_folder/Project Name` (folder with `suitecloud.config.js`).
- If deployment controls are missing, ask the user and do not finalize Role 2 until confirmed.
