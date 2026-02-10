# SDF Script Object Structure (Research-Based)

## Scope
Guidelines for how to model NetSuite script objects in SDF XML so deployments are represented correctly.

## Core Rule
- For script object files in `src/Objects/` (for example `usereventscript`, `clientscript`, `scheduledscript`, `mapreducescript`), deployments belong inside the script object XML under:
  - `scriptdeployments > scriptdeployment`
- Do not model script deployments as separate top-level SDF object files (for example `customdeploy_*.xml`) for these script types.

## File Pattern
- One script object per file in `src/Objects/`, named by script ID.
- If a script ID changes, rename the object file to match the new ID.
- This rename rule applies to the top-level script object `scriptid`.
- Nested deployment IDs inside `scriptdeployments` do not rename the parent script object file.
- Script file reference uses File Cabinet path style, for example:
  - `[/SuiteScripts/topazHarbor/<utilityName>/<fileName>.js]`
- Keep all `scriptid` values within NetSuite limits.
  - All ScriptIDs must be `<= 40` characters.

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

## Deploying To All Records (UE and Client)
Use `recordtype` value `RECORD` in the deployment when requirement is "ALL RECORDS".

User Event example:
```xml
<usereventscript scriptid="customscript_example">
  <name>Example UE</name>
  <scriptfile>[/SuiteScripts/topazHarbor/example/exampleUE.js]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_example_ue_allrec">
      <isdeployed>T</isdeployed>
      <status>RELEASED</status>
      <recordtype>RECORD</recordtype>
    </scriptdeployment>
  </scriptdeployments>
</usereventscript>
```

Client Script example:
```xml
<clientscript scriptid="customscript_example_client">
  <name>Example Client</name>
  <scriptfile>[/SuiteScripts/topazHarbor/example/exampleClient.js]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_example_cs_allrec">
      <isdeployed>T</isdeployed>
      <status>RELEASED</status>
      <recordtype>RECORD</recordtype>
    </scriptdeployment>
  </scriptdeployments>
</clientscript>
```

Notes:
- `RECORD` means all record types for script deployment recordtype.
- This is different from audience settings (`allroles`, `allemployees`, `allpartners`), which control who can run the deployment.

## Deployment Confirmation Gate
Before creating or modifying script deployments, require explicit user confirmation for deployment controls.

Confirm at minimum:
- Record targeting:
  - specific record type(s) or `RECORD` (all records)
- Deployment state:
  - `isdeployed` (`T` or `F`)
- Release status:
  - `TESTING` or `RELEASED`
- Log level:
  - `DEBUG`, `AUDIT`, `ERROR`, or `EMERGENCY`
- Audience/access controls (when present):
  - `allroles`/specific roles
  - `allemployees`, `allpartners`, `allcustomers` as applicable
- Script execution context controls if used for that script type/account configuration.

If any of the above is unspecified, stop and ask the user before creating deployment XML.

## Agent Guardrails
- In Role 2 plans:
  - explicitly list deployment configuration inside the script object file, not as a separate deployment file.
- In Role 3 implementation:
  - add/update `<scriptdeployments>` in the `customscript_*.xml` object.
  - avoid creating `customdeploy_*.xml` for script deployments unless Oracle documentation for a specific object type explicitly requires it.
  - validate all ScriptID lengths (`<= 40`) before deploy.
  - if any object ID changes, rename the file so filename and ID stay in sync.
  - when requirement says "ALL RECORDS", set `<recordtype>RECORD</recordtype>` in deployment.
  - do not set deployment controls by assumption; require user confirmation first.
- In Role 5 review:
  - flag separate `customdeploy_*.xml` files for script deployments as a structural issue.

## Sources (Oracle / NetSuite)
- SuiteScript 2.x User Event Script Type overview: [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4387799721.html)
- SDF XML Reference (User Event Script object, includes `scriptdeployments` structured field): [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_143509726.html)
- SDF XML Reference (Scheduled Script object, same deployment structure concept): [docs.oracle.com](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/SDFxml_664627002.html)
