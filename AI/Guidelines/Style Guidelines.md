# Style Guidelines

## Object Property Shorthand
When object key and variable name are the same, always use property shorthand.

Preferred:
```javascript
return {
  beforeLoad,
  beforeSubmit,
  afterSubmit
};
```

Avoid:
```javascript
return {
  beforeLoad: beforeLoad,
  beforeSubmit: beforeSubmit,
  afterSubmit: afterSubmit
};
```

## Question-Driven Inline Comments
When a user asks what specific code lines do, add a concise inline comment above that block so future readers do not need to ask again.

Rules:
- Keep it short and factual.
- Explain intent, not obvious syntax.
- Place it directly above the relevant lines.

## Prefer Destructuring For Repeated Paths
When object reference paths get long or repeated (for example `context.UserEventType`, `context.newRecord`), prefer destructuring at the top of the function.

Preferred:
```javascript
function beforeLoad(context) {
  const { UserEventType = {}, form, newRecord, type } = context;
}
```

Avoid:
```javascript
function beforeLoad(context) {
  const userEventType = context.UserEventType || {};
  if (!context.form || !context.newRecord) return;
}
```

## Collapse Short Constructs
Collapse simple constructs to one line when the full line is under 80 characters and readability is not reduced.

Preferred:
```javascript
if (!newRecord) return;
if (supportedTypes.length && supportedTypes.indexOf(type) === -1) return;
return { beforeLoad, beforeSubmit };
```

Avoid:
```javascript
if (!newRecord) {
  return;
}
return {
  beforeLoad,
  beforeSubmit
};
```

## Keep Entry Points Thin
Keep framework entry-point functions (for example `beforeLoad`, `beforeSubmit`,
`afterSubmit`) as small as possible.

Rules:
- Entry points should delegate business logic to helper functions.
- Wrap each delegated call in `try/catch` to avoid disrupting primary runtime
  flow when non-critical logic fails.
- Pass `context` through to helpers rather than rehydrating ad-hoc globals.
