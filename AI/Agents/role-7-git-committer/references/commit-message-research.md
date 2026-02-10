# Commit Message Research Notes

This note summarizes primary-source guidance used by the `role-7-git-committer` skill.

## 1) Git commit object structure
- Git stores commit message as a free-form log message attached to the commit object.
- A commit can include a subject and body.
- `git commit` supports multiple `-m` flags, where each flag creates a paragraph.
- Source:
  - [Git commit documentation](https://git-scm.com/docs/git-commit)

## 2) Message style from Git documentation
- Git docs recommend a concise first line and suggest it should usually be no more than about 50 characters.
- A blank line should separate subject from body.
- Source:
  - [Git commit man page: discussion section](https://git-scm.com/docs/git-commit#_discussion)

## 3) Body wrapping / readability
- Git docs recommend formatting paragraphs for readability and tooling, commonly using around 72 characters per line.
- Source:
  - [Git commit man page: discussion section](https://git-scm.com/docs/git-commit#_discussion)

## 4) Trailers / structured footers
- Git has first-class support for commit trailers and parsing/managing them (`git interpret-trailers`).
- This supports footer conventions like issue references and co-authorship.
- Source:
  - [git interpret-trailers](https://git-scm.com/docs/git-interpret-trailers)

## 5) Conventional Commits format
- Conventional Commits defines a structured subject format (`type(scope): description`) and breaking-change signaling.
- This is useful for changelogs and semantic versioning automation.
- Source:
  - [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

## 6) Optional policy enforcement
- Git commit-message hooks (`commit-msg`) can enforce local policy when desired.
- Source:
  - [Git hooks documentation](https://git-scm.com/docs/githooks)

## Practical Synthesis
- Use conventional-commit subject style.
- Keep subject concise and imperative.
- Keep a meaningful body for non-trivial commits.
- Use trailers for machine-readable references when available.
