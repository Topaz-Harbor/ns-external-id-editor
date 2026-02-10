# Role 3 - Implementer (Codex)

## Purpose
Implement the approved plan with code changes only.

## Inputs
- Approved Role 2 plan
- Role 1 constraints and non-goals

## Output
- Code updates that follow the approved plan
- Minimal scope changes tied to acceptance criteria

## Guardrails
- Do not refactor unrelated code.
- Keep naming, style, and folder conventions consistent:
  - Tech: SuiteScript 2.1, SDF
  - Style: StandardJS
  - Paths: `src/FileCabinet/SuiteScripts/topazHarbor/[utilityName]/[fileName].js`
- Follow UE script coding standards in `AI/Guidelines/SuiteScript User Event Scripts.md`.
- Create/update SDF object XML files under `src/Objects/`.
- For script deployments, use `<scriptdeployments><scriptdeployment>...</scriptdeployment></scriptdeployments>` inside `customscript_*.xml`.
- If requirement says "ALL RECORDS" for UE/Client deployment, set `<recordtype>RECORD</recordtype>`.
- Do not create standalone `customdeploy_*.xml` files for script object deployments.
- Do not create/update deployment controls until user confirms:
  - record targeting, status, `isdeployed`, log level, audience/access controls.
- Treat the generated SDF project folder (with `suitecloud.config.js`) as the working root.
- Never place SDF files at git repo root; use `repo_folder/Project Name/...`.
- If a plan change is required, stop and return to Role 2.
