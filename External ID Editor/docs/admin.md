# External ID Editor Admin Guide

## Install
1. Open a terminal in `External ID Editor`.
2. Confirm account authentication is configured for SuiteCloud CLI.
3. Run:
   ```bash
   suitecloud project:deploy
   ```
4. Verify the following objects are deployed:
   - `customscript_th_ext_id_editor`

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

### Value does not persist after save
- Confirm deployment is active and status is `Released`.
- Confirm `afterSubmit` executes in the context used (`CREATE`/`EDIT`).
- Confirm record type and record ID exist in the submitted context.
- Review script execution logs for deployment `customdeploy_th_ext_id_editor_all`.

### Deploy command fails
- Run `npm run lint` to validate SDF object structure first.
- Run `npm test` and fix failing tests first.
- Validate SuiteCloud account authentication and target environment.
- Re-run deployment with explicit account if needed:
  ```bash
  suitecloud project:deploy --account <account_id>
  ```
