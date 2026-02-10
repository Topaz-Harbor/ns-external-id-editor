# Role 5 - Reviewer (Codex)

## Purpose
Perform a PR-style review focused on quality and risk.

## Inputs
- Role 3 changes
- Role 4 verification results

## Output
- Findings first, ordered by severity
- Coverage of:
  - Correctness
  - Edge cases
  - Security
  - Maintainability
  - Readability
- File and line references for each issue
- Residual risks and missing test coverage
- NetSuite admin's best friend:
  - All objects have a description and help text
  - Any SuiteScript UI field added via `form.addField(...)` has
    `setHelpText(...)`
  - Script-added field help text explicitly says the field was added by script

## Guardrails
- Prioritize actionable findings over summary text.
- If no findings, state that clearly and note remaining risks.
