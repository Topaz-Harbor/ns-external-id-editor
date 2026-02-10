# SuiteScript User Event Script Guidelines

## Purpose
Define a consistent, production-safe structure for User Event scripts.

## Style Baseline
- Follow `/Users/slemp/local/th/ns-external-id/AI/Guidelines/Style Guidelines.md`.

## Required Header Tags
All User Event scripts must include:
- `@NApiVersion 2.1`
- `@NScriptType UserEventScript`
- `@author Stephen Lemp <stephen@topazharbor.com>`
- `@description` as standard English text (plain JSDoc description)

Notes:
- Oracle allows `2.0`, `2.x`, and `2.1`, but team standard is always `2.1`.
- `@author` and plain-English `@description` are team-required metadata conventions.

Example:
```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author Stephen Lemp <stephen@topazharbor.com>
 * @description Updates External ID behavior for supported record actions.
 */
```

## Canonical UE Structure
Use the standard SuiteScript 2.1 entry-point pattern:
1. `define([...], function (...) { ... })`
2. Declare `beforeLoad`, `beforeSubmit`, `afterSubmit` handlers as needed.
3. Return only entry points from the `define` return object.
4. Keep exactly one properly structured `define` statement in the entry-point file.

Canonical shape:
```javascript
define(['N/record'], function (record) {
  function beforeLoad(context) {}
  function beforeSubmit(context) {}
  function afterSubmit(context) {}

  return {
    beforeLoad,
    beforeSubmit,
    afterSubmit
  };
});
```

## Implementation Notes
- Keep NetSuite runtime entry points simple and explicit.
- Keep business logic testable via small pure helper functions.
- Keep entry points thin: delegate to helper functions and wrap delegated calls
  in `try/catch` so failures do not disrupt record load/save flow.
- Scope behavior by `context.type` and check required runtime objects (`form`, `newRecord`) before use.
- Keep field IDs/constants centralized at top of file.

## Deployment Modeling Rule
- For SDF object XML, embed deployments inside the script object XML under:
  - `<scriptdeployments><scriptdeployment>...</scriptdeployment></scriptdeployments>`
- Do not use standalone `customdeploy_*.xml` for script object deployments.

## Source References
- Oracle SuiteScript 2.x User Event Script Type:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4387799721.html
- Oracle SuiteScript 2.x JSDoc Validation:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4387175355.html
- Oracle Entry Point Script Validation Guidelines:
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4527904430.html
- Oracle SDF XML Reference (User Event Script object fields, including deployments):
  - https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_143509726.html
