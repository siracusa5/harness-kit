---
sidebar_position: 1
title: Installation
---

# Installation

harness-kit requires [Claude Code](https://claude.ai/claude-code).

## Plugin Marketplace (recommended)

Add the marketplace once, then install plugins by name:

```
/plugin marketplace add siracusa5/harness-kit
/plugin install research@harness-kit
```

Repeat for any plugin you want:

```
/plugin install explain@harness-kit
/plugin install data-lineage@harness-kit
/plugin install orient@harness-kit
/plugin install stage@harness-kit
```

## Fallback: Install Script

If your Claude Code build doesn't support the plugin marketplace yet:

```bash
curl -fsSL https://raw.githubusercontent.com/siracusa5/harness-kit/main/install.sh | bash
```

This downloads skill files to `~/.claude/skills/` over HTTPS. It installs **only the skill files** — bundled scripts (like the research index rebuilder) require the full marketplace install.

## Verify

After installing, invoke any skill to confirm it loaded:

```
/research
/explain src/main.ts
```

If the skill responds with its workflow, you're set.

## Requirements per Plugin

| Plugin | Requirements |
|--------|-------------|
| research | `gh` CLI (GitHub sources only), Python 3.10+ (index rebuild) |
| explain | None |
| data-lineage | None |
| orient | None (optional: [MCP Memory Server](https://github.com/anthropics/claude-code-memory)) |
| stage | None |
