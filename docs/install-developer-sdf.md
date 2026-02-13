# Install Guide: Developer Path (SDF)

Use this path if you manage NetSuite code with SuiteCloud CLI and want project-based deployment.

## Prerequisites

- Node.js and SuiteCloud CLI installed.
- Auth ID configured for target account.
- Access to deploy scripts and objects in target account.

## Project Location

Run commands from:

- `External ID Editor/`

This is the SDF project root (contains `suitecloud.config.js` and `src/`).

## Steps

1. Validate project structure.

```bash
suitecloud project:validate
```

2. Deploy project.

```bash
suitecloud project:deploy
```

3. Confirm deployed objects.

- Script record:
  - `customscript_th_ext_id_editor`
- Deployment:
  - `customdeploy_th_ext_id_editor_all`

4. Set deployment status based on rollout stage.

- `Testing` for limited validation
- `Released` for production usage

## Suggested Post-Deploy Checks

- Open at least one record in `VIEW` and `EDIT`.
- Confirm `External ID` field renders and persists changes.
- Review script execution logs for unexpected errors.

## Troubleshooting

- If validation or deploy fails, run validation again and write a log file:

```bash
suitecloud project:validate --log ./validation.log
```

- Confirm auth ID and target account settings.
- Optionally run server-side validation for account-level context:

```bash
suitecloud project:validate --server --log ./validation.log
```
