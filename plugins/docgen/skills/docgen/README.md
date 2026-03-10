# docgen

Generate or update project documentation from the codebase — READMEs, API references, architecture overviews, and changelogs.

## Usage

```
/plugin install docgen@harness-kit
```

Then:

```
/docgen readme                          # generate or update project README
/docgen readme src/auth/                # README for a subdirectory
/docgen api src/routes/                 # API endpoint documentation
/docgen architecture                    # architecture overview from codebase structure
/docgen changelog v0.2.0..v0.3.0       # changelog from git history
```

## What You Get

- Docs generated to the **conversation first** — always asks before writing to disk
- Detects existing docs and preserves manually written sections
- Matches the project's existing formatting and style
- Changelog groups commits by type (feat, fix, docs...) — no raw log dumps

## Notes

- No dependencies. `gh` CLI optional for changelog with remote tags.
- Never overwrites without confirmation.
