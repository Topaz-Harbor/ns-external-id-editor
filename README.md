# External ID Editor (Free Utility)

External ID Editor is a free Topaz Harbor utility for NetSuite that exposes the `externalid` value on record forms so admin teams can view and update it more safely and quickly.

## Utility Family

This utility is part of the **Topaz Harbor Admin Utilities** lineup.

## Who This Is For

- NetSuite admins who need a practical utility and do not use SDF.
- NetSuite developers who want fast project-based deployment with SuiteCloud CLI.

## Installation Paths

Use the guide that matches your workflow:

- Admin manual install (no SDF): `docs/install-admin-manual.md`
- Developer SDF install: `docs/install-developer-sdf.md`
- Post-install operations and troubleshooting: `docs/admin.md`

## Testing and Verification

- Current verification record: `docs/testing-verification.md`
- Validation command:
  - `suitecloud project:validate`

## Repository Layout

- SDF project root: `External ID Editor/`
- Script file:
  - `External ID Editor/src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/th_external_id_editor_ue.js`
- Script object:
  - `External ID Editor/src/Objects/customscript_th_ext_id_editor.xml`

## Notes

- The utility currently deploys to all record types (`recordtype=RECORD`) and runs in UI context.
- Review deployment status and role permissions before enabling in production.
