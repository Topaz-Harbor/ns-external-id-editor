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
1. Product Owner (you): provide the template inputs
2. Architect/Planner (Codex): plan only, no code edits
3. Implementer (Codex): code changes per approved plan
4. Test and Verification (Codex): command log + results
5. Reviewer (Codex): PR-style findings
6. Release/Operator (you + Codex): SDF deploy steps, permissions, version/changelog, runbook
7. Git Committer (Codex): commit after explicit approval with professional message
