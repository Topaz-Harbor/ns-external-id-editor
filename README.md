# External ID Editor (Free Utility)

External ID Editor is a free Topaz Harbor utility for NetSuite that exposes the `externalid` value on record forms so admin teams can view and update it safely and quickly.

## Utility Family

This utility is part of the **Topaz Harbor Admin Utilities** lineup.

## Who This Is For

- NetSuite admins who need a practical utility for managing External ID quickly.
- NetSuite developers who prefer SDF/CLI-based deployment workflows.

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

- When deployed via SDF, the utility currently deploys to all record types (`recordtype=RECORD`) and runs in UI context only.
- Review deployment status and role permissions before enabling in production.

## License

This project is licensed under the MIT License.
