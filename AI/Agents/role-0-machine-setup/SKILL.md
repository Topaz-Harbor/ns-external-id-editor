---
name: role-0-machine-setup
description: Use this skill when running Role 0. It validates local tooling, auth, and project readiness before planning or coding.
---

# Role 0 - Machine Setup

## Purpose
Confirm machine and environment readiness before Role 1-7 execution.

## Required Output
- Setup checklist with pass/fail for each item
- Command log and results
- Explicit blockers and remediation steps

## Checklist
- Project path is correct and writable
- Git repository readiness (Codex-owned):
  - if `.git` is missing, initialize repository
  - verify current branch and branch visibility
  - verify `user.name` and `user.email`; if missing, request values from user
  - verify `origin` remote; if missing, request URL from user
- Node/npm availability and dependency readiness
- SuiteCloud CLI availability (`suitecloud` command)
- SuiteCloud account authentication readiness
- SDF validation passes (`suitecloud project:validate`)
- Project tests pass (`npm test`) when applicable

## Guardrails
- Do not proceed to Role 1+ if setup blockers remain.
- Do not make feature-level code changes during setup validation.
- Perform non-destructive setup actions directly; ask user only for missing decision inputs.
