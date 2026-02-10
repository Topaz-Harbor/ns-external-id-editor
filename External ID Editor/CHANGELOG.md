# Changelog

## 1.1.0
- Switched External ID persistence to `afterSubmit` using `record.submitFields`.
- Added robust System Information tab fallback (`systeminfo`, `s_sysinfo`, `main`) for field placement.
- Updated deployment modeling to nested `scriptdeployments` in script object XML.
- Standardized object IDs to deploy-safe lengths (<= 40 characters).
- Added project lint command (`suitecloud project:validate`) and expanded test coverage.
