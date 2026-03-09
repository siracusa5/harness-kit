---
sidebar_position: 1
title: Plugin Overview
---

# Plugins

harness-kit ships 5 plugins, all at v0.1.0. Each encodes a proven workflow as a Claude Code skill, distributed through the plugin marketplace.

## At a Glance

| Plugin | What it does | Dependencies |
|--------|-------------|-------------|
| [research](research) | Process any source into a structured, compounding knowledge base | `gh` CLI (GitHub only), Python 3.10+ |
| [explain](explain) | Layered explanations of files, functions, directories, or concepts | None |
| [data-lineage](data-lineage) | Column-level lineage tracing through SQL, Kafka, Spark, JDBC | None |
| [orient](orient) | Topic-focused session orientation across graph, knowledge, and research | None (optional: MCP Memory Server) |
| [stage](stage) | Capture session information into a staging file for later reflection | None |

## Install any plugin

```
/plugin marketplace add siracusa5/harness-kit
/plugin install <plugin-name>@harness-kit
```

## How plugins work

Each plugin is a directory containing:

```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json          ← metadata + version
├── skills/
│   └── <name>/
│       ├── SKILL.md          ← what Claude reads (the workflow)
│       └── README.md         ← what humans read (usage docs)
└── scripts/                  ← optional automation
```

The **SKILL.md** is the runtime unit — it defines the workflow Claude Code executes when you invoke the slash command. The **plugin** is the distribution unit — it packages the skill with optional scripts, hooks, and agents.

See [Plugins vs. Skills](/docs/concepts/plugins-vs-skills) for the full rationale.
