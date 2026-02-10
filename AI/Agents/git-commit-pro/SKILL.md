---
name: git-commit-pro
description: Use this skill when the user asks to commit changes, create a professional commit message, or commit after approval. It enforces an approval gate, high-quality commit messages, and safe non-interactive Git workflow.
---

# Git Commit Pro

## When To Use
- User asks to commit changes.
- User says changes are approved and wants a commit.
- User asks for a high-quality or standards-based commit message.

## Non-Negotiable Rules
- Never commit until the user explicitly approves.
- Use non-interactive git commands only.
- Do not include unrelated files in the commit.
- Do not use `--amend` unless the user asks.
- Do not use destructive git commands.

## Approval Gate
Only commit after explicit approval text from the user, such as:
- "approved"
- "ship it"
- "commit this"
- "looks good, commit"

If approval is ambiguous, ask a single clarifying question.

## Commit Workflow
1. Inspect candidate changes:
   - `git status --short`
   - `git diff --name-status`
   - `git diff --staged --name-status`
2. Propose commit scope:
   - list files to include
   - identify files to exclude as unrelated
3. Draft commit message and show it before commit.
4. After approval:
   - stage only approved files (`git add <paths>` or `git add -A` if everything is in scope)
   - commit with `git commit -m "<subject>" -m "<body>"` and optional trailers
5. Report:
   - commit hash
   - subject
   - files committed

## Message Standard
Use Conventional Commits with Git-compatible formatting:
- Subject format: `<type>(optional-scope): imperative summary`
- Subject target length: <= 50 characters (hard max 72)
- Blank line after subject
- Body explains:
  - what changed
  - why it changed
  - key tradeoffs/alternatives (if relevant)
- Wrap body lines at about 72 chars.

### Types
- `feat`: new behavior/user-visible capability
- `fix`: bug fix
- `docs`: docs only
- `refactor`: code change without behavior change
- `test`: tests only
- `chore`: tooling/maintenance
- `ci`: CI/CD config
- `perf`: performance improvement

### Breaking Changes
- Use `!` in subject and/or `BREAKING CHANGE:` footer.

### Optional Footers (Trailers)
- `Refs: <id-or-url>`
- `Closes: <id-or-url>`
- `Co-authored-by: Name <email>`

Only add footers when supported by actual context.

## Commit Quality Checks (Before Commit)
- Diff is scoped to approved intent.
- No accidental generated/binary/noise files.
- No secrets in diff.
- Tests/lint status is known (run if requested or required by repo rules).

## Output Template
Before commit:
- `Proposed scope: <files>`
- `Commit message:`
  - Subject: `<subject>`
  - Body:
    - `<line 1>`
    - `<line 2>`
- `Reply "approved" to commit.`

After commit:
- `Committed <hash>: <subject>`
- `Files: <file1>, <file2>, ...`

## References
- See `references/commit-message-research.md` for source-backed rationale.
