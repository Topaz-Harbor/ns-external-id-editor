---
name: role-2-architect-planner
description: Use this skill when running Role 2. It produces a plan only, with file-level changes, data flow, risks, and assumptions, without code edits.
---

# Role 2 - Architect / Planner

## Purpose
Produce an implementation plan before any code changes.

## Required Output
- Plan only (no code edits)
- Explicit files/modules to create or update
- Data flow: input -> processing -> output
- Risks, unknowns, assumptions
- Deployment confirmation checklist when object deployments are involved:
  - record targeting (`RECORD` vs specific types)
  - status (`TESTING` or `RELEASED`)
  - `isdeployed` (`T` or `F`)
  - log level
  - audience/access controls

## Guardrails
- No code changes.
- Follow:
  - `AI/Guidelines/SDF Projects.md`
  - `AI/Guidelines/SDF Script Objects.md`
  - `AI/Guidelines/SuiteScript User Event Scripts.md`
- Plan against project root `repo_folder/Project Name` (folder with `suitecloud.config.js`), not git repo root.
- If deployment controls are missing, ask the user before finalizing plan output.
