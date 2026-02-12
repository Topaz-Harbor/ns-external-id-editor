# External ID Editor Admin Guide

## Choose an Install Path

- Admin manual install (no SDF):
  - [docs/install-admin-manual.md](https://github.com/Topaz-Harbor/ns-external-id-editor/blob/main/docs/install-admin-manual.md)
- Developer SDF install:
  - [docs/install-developer-sdf.md](https://github.com/Topaz-Harbor/ns-external-id-editor/blob/main/docs/install-developer-sdf.md)

## Direct Script Download (Admin Manual Path)

- [th_external_id_editor_ue.js](https://github.com/Topaz-Harbor/ns-external-id-editor/raw/refs/heads/main/External%20ID%20Editor/src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/th_external_id_editor_ue.js)
- Note: while the repo is private, this link requires GitHub access to the repository.

Use this guide for post-install configuration and troubleshooting.

## Configure

1. In NetSuite, open **Customization > Scripting > Scripts**.
2. Open `TH External ID Editor`.
3. Review deployment `customdeploy_th_ext_id_editor_all`:
   - Set **Status** to `Released`.
   - Set **Deployed** to `T`.
   - Confirm target record type is `All Records` (`recordtype=RECORD` in SDF XML).
   - Set preferred log level (default in SDF is `DEBUG`).
4. If scope should be narrower than all records, update deployment `recordtype` and redeploy.

## Troubleshoot

### Field is not visible
- Confirm script deployment is active and released.
- Confirm the user has permission to edit the target record.
- Check whether the form shows a System Information tab; if not, the field is rendered without that container.
- Current script behavior: `beforeLoad` supports `CREATE`, `EDIT`, and `VIEW` only (not `COPY`).
  - On `COPY`, the editable External ID field is not added by this script.
  - If copy behavior is needed, extend `beforeLoad` to include `UserEventType.COPY`.

### Value does not persist after save
- Confirm deployment is active and status is `Released`.
- Confirm `afterSubmit` executes in the context used (`CREATE`/`EDIT`).
- Confirm record type and record ID exist in the submitted context.
- Review script execution logs for deployment `customdeploy_th_ext_id_editor_all`.

### Deploy command fails
- Run `suitecloud project:validate` first.
- Validate SuiteCloud account authentication and target environment.
- Re-run deployment with explicit account if needed:
  ```bash
  suitecloud project:deploy --account <account_id>
  ```
