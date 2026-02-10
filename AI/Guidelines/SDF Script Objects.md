# SDF Script Object Structure (Research-Based)

## Scope
Guidelines for how to model NetSuite script objects in SDF XML so deployments are represented correctly.

## Core Rule
- For script object files in `src/Objects/` (for example `usereventscript`, `clientscript`, `scheduledscript`, `mapreducescript`), deployments belong inside the script object XML under:
  - `scriptdeployments > scriptdeployment`
- Do not model script deployments as separate top-level SDF object files (for example `customdeploy_*.xml`) for these script types.

## File Pattern
- One script object per file in `src/Objects/`, named by script ID.
- Script file reference uses File Cabinet path style, for example:
  - `[/SuiteScripts/topazHarbor/<utilityName>/<fileName>.js]`

## Minimum XML Shape (User Event Example)
```xml
<usereventscript scriptid="customscript_example">
  <name>Example</name>
  <scriptfile>[/SuiteScripts/topazHarbor/example/doThing.js]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_example_main">
      <title>Example Deployment</title>
      <status>RELEASED</status>
      <isdeployed>T</isdeployed>
      <recordtype>customer</recordtype>
    </scriptdeployment>
  </scriptdeployments>
</usereventscript>
```

## Agent Guardrails
- In Role 2 plans:
  - explicitly list deployment configuration inside the script object file, not as a separate deployment file.
- In Role 3 implementation:
  - add/update `<scriptdeployments>` in the `customscript_*.xml` object.
  - avoid creating `customdeploy_*.xml` for script deployments unless Oracle documentation for a specific object type explicitly requires it.
- In Role 5 review:
  - flag separate `customdeploy_*.xml` files for script deployments as a structural issue.

## Sources (Oracle / NetSuite)
- SuiteScript 2.x User Event Script Type overview: [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4387799721.html)
- SDF XML Reference (User Event Script object, includes `scriptdeployments` structured field): [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_143509726.html)
- SDF XML Reference (Scheduled Script object, same deployment structure concept): [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_664627002.html)
