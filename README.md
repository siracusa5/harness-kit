<div align="center">

# harness-kit

The kit you need to set up your AI harness.

[![Release](https://img.shields.io/github/v/release/siracusa5/harness-kit?style=flat-square)](https://github.com/siracusa5/harness-kit/releases)
[![Validate](https://img.shields.io/github/actions/workflow/status/siracusa5/harness-kit/validate.yml?style=flat-square&label=validate)](https://github.com/siracusa5/harness-kit/actions/workflows/validate.yml)
[![License](https://img.shields.io/github/license/siracusa5/harness-kit?style=flat-square)](LICENSE)

Requires [Claude Code](https://claude.ai/claude-code)

</div>

AI agents work best with structure, but configuring that structure is manual, scattered, and non-portable. harness-kit packages the setup into plugins you can install once and carry across projects — repeatable configuration instead of starting from scratch every time.

## Install

```
/plugin marketplace add siracusa5/harness-kit
/plugin install research@harness-kit
```

<details>
<summary>Fallback: install with script (skills only)</summary>

If your Claude Code build doesn't support the plugin marketplace:

```bash
curl -fsSL https://raw.githubusercontent.com/siracusa5/harness-kit/main/install.sh | bash
```

Downloads skill files to `~/.claude/skills/` over HTTPS. This installs only the skill files; the full plugin (e.g. index rebuild script) comes from the marketplace install.
</details>

## Plugins

| Plugin | What it does | Deps |
|--------|-------------|------|
| [`research`](plugins/research/skills/research/README.md) | Process any source into a structured, compounding knowledge base | gh CLI |
| [`explain`](plugins/explain/skills/explain/README.md) | Layered explanations of files, functions, directories, or concepts | None |
| [`data-lineage`](plugins/data-lineage/skills/data-lineage/README.md) | Trace column-level data lineage through SQL, Kafka, Spark, and JDBC codebases | None |
| [`orient`](plugins/orient/skills/orient/README.md) | Topic-focused session orientation across graph, knowledge, journal, and research | None* |

\* orient works without dependencies; optionally uses [MCP Memory Server](https://github.com/anthropics/claude-code-memory) for graph search.

## Conventions Guide

The repo includes a standalone guide to organizing Claude Code configuration with separation of concerns. Even if you don't use any plugins, this is worth reading.

| File | Scope | Purpose |
|------|-------|---------|
| `CLAUDE.md` | Global + Project + Package | Operational: build, test, architecture |
| `AGENT.md` | Global + Project | Behavioral: tone, autonomy, workflow |
| `SOUL.md` | Global only | Identity: values, relationship, memory |

Read the full guide: **[Claude Conventions](docs/claude-md-conventions.md)**

## Docs

- **[Plugins vs. Skills](docs/plugins-vs-skills.md)** — Why everything ships as a plugin, even when it's just a prompt
- **[Claude Conventions](docs/claude-md-conventions.md)** — Organizing Claude Code config with separation of concerns

## License

MIT
