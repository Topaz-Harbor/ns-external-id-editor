---
name: role-5-reviewer
description: Use this skill when running Role 5. It performs a PR-style review prioritizing findings, risks, and missing tests.
---

# Role 5 - Reviewer

## Purpose
Review changes for correctness and operational risk.

## Required Output
- Findings first, ordered by severity
- Coverage:
  - correctness
  - edge cases
  - security
  - maintainability
- File and line references for each finding
- Residual risks and missing tests

## Guardrails
- Prioritize actionable findings over summary.
- If no findings, state that explicitly and call out remaining risk.
