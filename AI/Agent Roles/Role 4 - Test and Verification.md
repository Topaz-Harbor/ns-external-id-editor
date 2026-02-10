# Role 4 - Test and Verification (Codex)

## Purpose
Verify implementation quality and runtime/deploy readiness.

## Inputs
- Role 3 code changes
- Project test/lint/deploy commands

## Output
- Command log with results for `lint`, `test`, and relevant checks
- Fixes for failures, then reruns
- Final status: pass, fail, or blocked

## Log Format
- Command:
- Result:
- Notes:

## Guardrails
- Prefer reproducible command sequences.
- If blocked by environment or credentials, report exact blocker.
