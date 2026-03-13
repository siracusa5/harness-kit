---
sidebar_position: 1
title: Plugin Overview
---

# Plugins

harness-kit ships 10 plugins across 6 categories. Each packages a proven workflow as a portable prompt template, currently distributed through Claude Code's plugin marketplace.

## At a Glance

| Plugin | What it does | Dependencies |
|--------|-------------|-------------|
| [research](research-knowledge/research) | Process any source into a structured, compounding knowledge base | `gh` CLI (GitHub only), Python 3.10+ |
| [orient](research-knowledge/orient) | Topic-focused session orientation across graph, knowledge, and research | None (optional: MCP Memory Server) |
| [capture-session](research-knowledge/capture-session) | Capture session information into a staging file for later reflection | None |
| [review](code-quality/review) | Structured code review for branches, PRs, or paths with severity labels | `gh` CLI (PR review only) |
| [explain](code-quality/explain) | Layered explanations of files, functions, directories, or concepts | None |
| [data-lineage](data-engineering/data-lineage) | Column-level lineage tracing through SQL, Kafka, Spark, JDBC | None |
| [docgen](documentation/docgen) | Generate or update README, API docs, architecture overview, or changelog | None |
| [ship-pr](devops/ship-pr) | End-of-task workflow: open a PR, code review, fix CI, squash merge | `gh` CLI |
| [pull-request-sweep](devops/pull-request-sweep) | Cross-repo PR sweep: triage, review, merge, fix CI | `gh` CLI |
| [harness-share](productivity/harness-share) | Compile, export, import, and sync harness configs across AI tools | None |

Plugin dependencies are formally declared in `plugin.json` under `requires`. See [Secrets & Configuration](/docs/concepts/secrets-management) for the full schema.

## Install any plugin

```
/plugin marketplace add harnessprotocol/harness-kit
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

SKILL.md files are plain markdown, not SDK code or API calls. While plugins currently distribute through Claude Code's marketplace, the prompt workflows are harness-agnostic — they work in any tool that reads prompt templates. See [Cross-Harness Portability](/docs/concepts/cross-harness-portability) for details.

See [Plugins vs. Skills](/docs/concepts/plugins-vs-skills) for the full rationale.
