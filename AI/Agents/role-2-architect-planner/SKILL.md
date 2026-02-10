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

## Guardrails
- No code changes.
- Follow:
  - `/Users/slemp/local/th/ns-external-id/AI/Guidelines/SDF Projects.md`
  - `/Users/slemp/local/th/ns-external-id/AI/Guidelines/SDF Script Objects.md`
- Plan against project root `repo_folder/Project Name` (folder with `suitecloud.config.js`), not git repo root.
