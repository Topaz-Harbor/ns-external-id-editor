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

## Guardrails
- No code changes in this phase.
- Keep plan aligned to Role 1 scope and non-goals.
- Flag anything missing that could block implementation.
- Follow guidelines in `/Users/slemp/local/th/ns-external-id/AI/Guidelines/SDF Projects.md`.
- Follow script object structure rules in `/Users/slemp/local/th/ns-external-id/AI/Guidelines/SDF Script Objects.md`.
- Follow UE script coding standards in `/Users/slemp/local/th/ns-external-id/AI/Guidelines/SuiteScript User Event Scripts.md`.
- Do not treat git repo root as project root.
- Plan against the SDF project folder under `repo_folder/Project Name` (folder with `suitecloud.config.js`).
