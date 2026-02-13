# Install Guide: Admin Manual Path (No SDF)

Use this path if you are a NetSuite admin and want to install the utility directly in the account UI.

## Prerequisites

- NetSuite role with access to:
  - File Cabinet
  - Script records
  - Script deployments
- Script file from this repo:
  - [External ID Editor/src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/th_external_id_editor_ue.js](https://github.com/Topaz-Harbor/ns-external-id-editor/blob/main/External%20ID%20Editor/src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/th_external_id_editor_ue.js)
- Direct download:
  - [Download th_external_id_editor_ue.js](https://github.com/Topaz-Harbor/ns-external-id-editor/raw/refs/heads/main/External%20ID%20Editor/src/FileCabinet/SuiteScripts/topazHarbor/externalIdEditor/th_external_id_editor_ue.js)

## Steps

1. Upload script file to File Cabinet.
- Suggested folder:
  - `SuiteScripts/topazHarbor/externalIdEditor/`
- Keep filename:
  - `th_external_id_editor_ue.js`

2. Create User Event script record.
- NetSuite path:
  - `Customization > Scripting > Scripts > New`
- Select the uploaded file:
  - `th_external_id_editor_ue.js`
- NetSuite automatically detects the script type from the selected file.
- Name:
  - `TH External ID Editor`
- Script ID:
  - `customscript_th_ext_id_editor`
- Script file:
  - uploaded `th_external_id_editor_ue.js`

3. Create script deployment.
- Deployment title:
  - `TH External ID Editor All Records`
- Deployment script ID:
  - `customdeploy_th_ext_id_editor_all`
- Status:
  - `Released` (for live use) or `Testing` (for controlled rollout)
- Deployed:
  - `Checked`
- Applies to:
  - `All Records` (or narrow to a specific record type if preferred)
- Execution context:
  - `User Interface`

4. Validate in UI.
- Open a record in `VIEW` and `EDIT`.
- Confirm `External ID` field appears.
- Edit and save.
- Reopen record and confirm value persisted.

## Rollback

If behavior is not acceptable:

1. Set deployment to `Not Deployed` or `Testing`.
2. Remove affected deployment audience/record types.
3. Disable or delete script deployment after change review.
