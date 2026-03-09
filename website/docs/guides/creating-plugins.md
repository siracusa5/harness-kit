---
sidebar_position: 1
title: Creating Plugins
---

# Creating Plugins

A step-by-step guide to creating a new harness-kit plugin.

## 1. Create the Plugin Directory

```
plugins/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json
├── scripts/              ← optional, for bundled utilities
└── skills/
    └── <skill-name>/
        ├── SKILL.md
        └── README.md
```

Plugins can contain more than skills — agents, hooks, MCP servers, LSP servers, scripts. Everything inside the plugin directory ships together. Reference bundled files via `${CLAUDE_PLUGIN_ROOT}` in SKILL.md.

## 2. Write the Plugin Manifest

Create `plugins/<plugin-name>/.claude-plugin/plugin.json`:

```json
{
  "name": "<plugin-name>",
  "description": "One sentence describing what this plugin does.",
  "version": "0.1.0"
}
```

## 3. Register in the Marketplace

Add an entry to `.claude-plugin/marketplace.json` under `plugins`:

```json
{
  "name": "<plugin-name>",
  "source": "./<plugin-name>",
  "description": "One sentence describing what this plugin does.",
  "version": "0.1.0",
  "author": { "name": "siracusa5" },
  "license": "MIT"
}
```

`source` is relative to `pluginRoot` (`./plugins`), so `"./research"` resolves to `./plugins/research`.

## 4. Write the SKILL.md

The SKILL.md is what Claude Code reads at runtime. Quality here is the primary review criterion.

### Frontmatter (required)

```yaml
---
name: my-skill
description: Use when user invokes /my-skill with [argument types]. [One sentence of behavior.]
---
```

- `name` — the slash command (lowercase, hyphenated)
- `description` — the trigger. Must start with "Use when" and name the invocation pattern explicitly.

### Required sections

| Section | Required when |
|---------|--------------|
| `## Overview` with core principles | Always |
| `## Workflow` with numbered steps | Always (even 1-step skills) |
| `## Common Mistakes` table | Any skill with 3+ steps or file writes |
| `## Scope Controls` | Any skill that touches files |
| `## Argument Types` table | Any parameterized skill |

### Workflow conventions

- Number all steps. Label mandatory order: `## Workflow (MANDATORY — follow in order)`
- Each step: one action, concrete command where applicable.
- Use Bash blocks for exact commands Claude should run.
- If a step requires stopping to verify: `**STOP HERE until file is written.**`

### Common Mistakes table

```markdown
## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Did X wrong | Do Y instead |
```

Two columns, two sentences max per row.

### What NOT to add

- Don't repeat the README in the SKILL.md — README is for humans, SKILL.md is for the model.
- Don't describe philosophy or background. State the workflow.
- Don't add sections not listed above unless they carry real behavioral signal.

## 5. Write the README.md

The README is human-facing documentation. Cover:

- What the plugin does (prose overview)
- Requirements
- Usage examples (copy-paste ready)
- Output structure
- Design notes (rationale)

## 6. Add to Root README

Under the `## Plugins` table in the repo root `README.md`, add a row linking to your plugin's README.

## 7. Test It

```bash
# From within Claude Code:
/plugin marketplace add ./   # add local marketplace
/plugin install <plugin-name>@harness-kit
```

## Versioning

Versions in `plugin.json` and `marketplace.json` must always match.

- **Patch** (0.1.0 → 0.1.1): Bug fixes, typo corrections, documentation. No behavior change.
- **Minor** (0.1.0 → 0.2.0): New features, new capabilities. Existing behavior unchanged.
- **Major** (0.x → 1.0): Breaking changes — renamed commands, removed features, changed output structure.

## Release Checklist

1. Bump `version` in both `plugin.json` and `marketplace.json` (must match)
2. Commit: `chore: bump <plugin> to vX.Y.Z`
3. Create release: `gh release create vX.Y.Z --generate-notes`

## CI Validation

Two checks run on every PR:

| Check | What it validates |
|-------|------------------|
| JSON manifests valid | `marketplace.json` and all `plugin.json` files parse without error |
| Version alignment | `version` in `plugin.json` and `marketplace.json` must match exactly |

Both must pass before merge.
