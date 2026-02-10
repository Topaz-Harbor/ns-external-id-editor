# Role 0 - Machine Setup (Codex-owned, user-confirmed decisions)

## Purpose
Validate local machine and account prerequisites before product work starts.

## Inputs
- Target project path
- Target NetSuite account/environment
- Required tools and auth methods

## Output
- Setup checklist with pass/fail status
- Commands run and outcomes
- Blockers with exact remediation steps

## Checklist
- Repo and project folder are present and accessible
- Git setup (handled by Codex):
  - initialize repo if `.git` is missing
  - verify branch state and current branch
  - verify git identity (`user.name`, `user.email`) and report gaps
  - verify remote (`origin`) and ask user for URL if missing
- Node/npm are installed and project dependencies are available
- SuiteCloud CLI is installed and reachable
- SuiteCloud account authentication is configured
- `suitecloud project:validate` succeeds in the SDF project root
- `npm test` succeeds (if tests exist)

## Guardrails
- Do not modify feature code in this phase unless required to repair setup.
- Codex should perform local, non-destructive setup tasks directly.
- Ask the user only for preference/identity decisions (for example remote URL, git name/email values).
- If a setup item is missing and cannot be resolved automatically, report the exact missing requirement.
