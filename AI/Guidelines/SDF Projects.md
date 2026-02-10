# SDF Project Structure

Use the SuiteCloud CLI scaffold as the source of truth for required files.

## Bootstrap
- Create project with `suitecloud project:create --type ACCOUNTCUSTOMIZATION --projectname "<name>"`
- Work from the generated project root (folder containing `suitecloud.config.js`).
- The git repo root is never an SDF project root.
- SDF projects always live under `repo_folder/Project Name`.
- In project documentation and role/skill files, use repo-relative paths (no absolute filesystem paths).

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
- Follow script implementation standards in:
  - `AI/Guidelines/SuiteScript User Event Scripts.md`

## Object Location Convention
- Put SDF object XML under:
  - `src/Objects/`
- Keep object IDs and file names synchronized.
  - If a top-level object ID changes (for example root `scriptid`, `fieldid`, or other root object IDs), update both:
    - the ID inside the XML file, and
    - the XML file name itself to match.
  - Subrecord ID changes inside a parent object file (for example nested `scriptdeployment scriptid`) do not rename the parent file.
- For script objects (User Event, Client, Scheduled, etc.), define deployments inside the script object XML using:
  - `<scriptdeployments><scriptdeployment>...</scriptdeployment></scriptdeployments>`
- For UE/Client deployments targeting all record types, use:
  - `<recordtype>RECORD</recordtype>`
- Do not create separate `customdeploy_*.xml` files for deployments of script objects.
- Respect NetSuite script ID limits when naming object IDs.
  - All ScriptIDs must be `<= 40` characters.

## Planning Rule
- In Role 2, list every file to create/update using:
  - Full path relative to git repo root (including `Project Name/` prefix), and
  - Project-relative path inside that SDF project.
- For any new/updated deployment object data, collect and confirm deployment-control inputs before implementation:
  - record targeting (`RECORD` vs specific types)
  - `isdeployed` state
  - status (`TESTING` or `RELEASED`)
  - log level
  - audience/access controls when applicable
