# External ID Editor Admin Guide

## Install
1. Open a terminal in `/Users/slemp/local/th/ns-external-id/External ID Editor`.
2. Confirm account authentication is configured for SuiteCloud CLI.
3. Run:
   ```bash
   suitecloud project:deploy
   ```
4. Verify the following objects are deployed:
   - `customscript_th_external_id_editor`
   - `customdeploy_th_external_id_editor_customer`

## Configure
1. In NetSuite, open **Customization > Scripting > Scripts**.
2. Open `TH External ID Editor`.
3. Review the deployment `TH External ID Editor - Customer`:
   - Set **Status** to `Released`.
   - Set **Deployed** to `T`.
   - Confirm target record type is `Customer`.
4. To support additional record types, create additional deployments of the same script per record type.

## Troubleshoot
### Field is not visible
- Confirm script deployment is active and released.
- Confirm the user has permission to edit the target record.
- Check whether the form shows a System Information tab; if not, the field is rendered without that container.

### Value does not persist after save
- Confirm deployment is attached to the correct record type.
- Confirm `beforeSubmit` executes in the context used (edit/create/copy/xedit).
- Review script execution logs for deployment `customdeploy_th_external_id_editor_customer`.

### Deploy command fails
- Run `npm test` and fix failing tests first.
- Validate SuiteCloud account authentication and target environment.
- Re-run deployment with explicit account if needed:
  ```bash
  suitecloud project:deploy --account <account_id>
  ```
