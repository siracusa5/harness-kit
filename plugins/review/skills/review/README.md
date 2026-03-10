# review

Structured code review for local branches, open PRs, or scoped paths.

## Usage

```
/plugin install review@harness-kit
```

Then:

```
/review                    # review current branch vs base branch
/review 123                # review PR #123
/review src/auth/          # review changes scoped to a path
```

## What You Get

Per-file review with:
- **BLOCKER / WARNING / NIT** severity labels with line references
- Cross-file analysis: missing test coverage, API contract changes, new dependencies
- Overall verdict: Approve / Request Changes / Questions

## Notes

- Read-only. Never modifies files or posts comments.
- PR-by-number requires the `gh` CLI (`brew install gh`, then `gh auth login`). Local branch review works without it.
- Compares against `main` by default. Set your base branch in the invocation if needed (e.g. `/review main...HEAD`).
