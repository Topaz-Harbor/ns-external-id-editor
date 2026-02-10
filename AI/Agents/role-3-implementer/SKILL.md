---
name: role-3-implementer
description: Use this skill when running Role 3. It implements only the approved plan with tightly scoped code changes.
---

# Role 3 - Implementer

## Purpose
Implement approved plan changes only.

## Required Inputs
- Approved Role 2 plan
- Role 1 constraints/non-goals

## Required Output
- Code changes aligned to acceptance criteria
- No unrelated refactors

## Guardrails
- Keep SuiteScript/SDF conventions:
  - `src/FileCabinet/SuiteScripts/topazHarbor/[utilityName]/[fileName].js`
  - `src/Objects/` for object XML
- Follow UE script coding standards in:
  - `AI/Guidelines/SuiteScript User Event Scripts.md`
- For simple utilities with stable contracts:
  - avoid over-defensive scaffolding and unnecessary safety wrappers
  - only use `try/catch` where a real throwable call needs explicit handling
- Prefer direct field type literals (for example `'text'`) when creating
  NetSuite form fields unless enum imports are required for another reason.
- Script deployments must be inside `customscript_*.xml` under:
  - `<scriptdeployments><scriptdeployment>...</scriptdeployment></scriptdeployments>`
- If requirement says "ALL RECORDS" for UE/Client deployment, use:
  - `<recordtype>RECORD</recordtype>`
- Do not create standalone `customdeploy_*.xml` for script object deployments.
- Do not create/update deployment controls until user confirms:
  - record targeting, status, `isdeployed`, log level, audience/access controls.
- If plan needs to change, stop and return to Role 2.
