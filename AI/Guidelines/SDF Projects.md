# SDF Project Structure

Use the SuiteCloud CLI scaffold as the source of truth for required files.

## Bootstrap
- Create project with `suitecloud project:create --type ACCOUNTCUSTOMIZATION --projectname "<name>"`
- Work from the generated project root (folder containing `suitecloud.config.js`).
- The git repo root is never an SDF project root.
- SDF projects always live under `repo_folder/Project Name`.

## Required Scaffold (generated)
- `suitecloud.config.js`
- `package.json`
- `jest.config.js`
- `src/manifest.xml`
- `src/deploy.xml`
- `src/Objects/`
- `src/FileCabinet/SuiteScripts/`

## Script Location Convention
- Put custom scripts under:
  - `src/FileCabinet/SuiteScripts/topazHarbor/<utilityName>/<fileName>.js`
- Follow camelCase for subfolders under `SuiteScripts`.
- Do not include script type abbreviations in file names (no `ue`, `cs`, `sut` suffixes).

## Object Location Convention
- Put SDF object XML under:
  - `src/Objects/`
- For script objects (User Event, Client, Scheduled, etc.), define deployments inside the script object XML using:
  - `<scriptdeployments><scriptdeployment>...</scriptdeployment></scriptdeployments>`
- Do not create separate `customdeploy_*.xml` files for deployments of script objects.

## Planning Rule
- In Role 2, list every file to create/update using:
  - Full path relative to git repo root (including `Project Name/` prefix), and
  - Project-relative path inside that SDF project.
