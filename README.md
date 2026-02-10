# ns-external-id
Expose NetSuite Internal ID for view and edit on records

## How to Start a Task
Use the role workflow files in `AI/Agent Roles/`.

SDF pre-step:
- Create or use an existing SuiteCloud project (`suitecloud project:create ...`).
- SDF project files always belong under `repo_folder/Project Name`.
- Never treat git repo root as SDF project root.
- Run implementation inside the generated project root (the folder with `suitecloud.config.js`).

Kickoff template:
- User story:
- Acceptance criteria:
- Done means:
- Avoid:

Process order:
1. Machine Setup (Codex + you): validate local tooling, auth, and project readiness
2. Product Owner (you): provide the template inputs
3. Architect/Planner (Codex): plan only, no code edits
4. Implementer (Codex): code changes per approved plan
5. Test and Verification (Codex): command log + results
6. Reviewer (Codex): PR-style findings
7. Release/Operator (you + Codex): SDF deploy steps, permissions, version/changelog, runbook
8. Git Committer (Codex): commit after explicit approval with professional message
