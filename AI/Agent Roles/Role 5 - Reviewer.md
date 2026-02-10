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
- File and line references for each issue
- Residual risks and missing test coverage

## Guardrails
- Prioritize actionable findings over summary text.
- If no findings, state that clearly and note remaining risks.
