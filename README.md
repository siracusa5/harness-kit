<div align="center">

# harness-kit

The kit you need to set up your AI harness.

[![Release](https://img.shields.io/github/v/release/siracusa5/harness-kit?style=flat-square)](https://github.com/siracusa5/harness-kit/releases)
[![Validate](https://img.shields.io/github/actions/workflow/status/siracusa5/harness-kit/validate.yml?style=flat-square&label=validate)](https://github.com/siracusa5/harness-kit/actions/workflows/validate.yml)
[![License](https://img.shields.io/github/license/siracusa5/harness-kit?style=flat-square)](LICENSE)

Requires [Claude Code](https://claude.ai/claude-code)

</div>

AI agents work best with structure, but configuring that structure is manual, scattered, and non-portable. harness-kit packages the setup into plugins you can install once and carry across projects — repeatable configuration instead of starting from scratch every time. Everything ships as plain markdown files: no binaries, no runtimes, just prompts your AI can read.

## Install

```
/plugin marketplace add siracusa5/harness-kit
```

<details>
<summary>Fallback: install with script (skills only)</summary>

If your Claude Code build doesn't support the plugin marketplace:

```bash
curl -fsSL https://raw.githubusercontent.com/siracusa5/harness-kit/main/install.sh | bash
```

Downloads skill files to `~/.claude/skills/` over HTTPS. This installs only the skill files; the full plugin (e.g. index rebuild script) comes from the marketplace install.
</details>

## Quick Start

Install `explain` — no dependencies, works in any codebase:

```
/plugin install explain@harness-kit
```

Then try it:

```
/explain src/auth/middleware.ts       # explain a specific file
/explain the payment processing flow  # search the codebase for a concept
/explain src/services/                # map a directory
```

Produces a structured explanation: summary, key components, how it connects, patterns, gotchas, and where to start if you need to change it.

## Plugins

| Plugin | What it does | Try it |
|--------|-------------|--------|
| [`explain`](plugins/explain/skills/explain/README.md) | Layered explanations of files, functions, directories, or concepts | `/explain src/auth/` |
| [`review`](plugins/review/skills/review/README.md) | Code review for a branch, PR, or path — structured output with severity labels | `/review` |
| [`docgen`](plugins/docgen/skills/docgen/README.md) | Generate or update README, API docs, architecture overview, or changelog | `/docgen readme` |
| [`research`](plugins/research/skills/research/README.md) | Process any source into a structured, compounding knowledge base | `/research https://...` |
| [`data-lineage`](plugins/data-lineage/skills/data-lineage/README.md) | Trace column-level data lineage through SQL, Kafka, Spark, and JDBC codebases | `/data-lineage orders.amount` |
| [`orient`](plugins/orient/skills/orient/README.md) ¹ | Topic-focused session orientation across graph, knowledge, journal, and research | `/orient auth` |
| [`stage`](plugins/stage/skills/stage/README.md) ¹ | Capture session information into a staging file for later reflection | `/stage` |

¹ Personal-workflow plugins designed for projects using the [knowledge graph + journal pattern](docs/claude-md-conventions.md).

## Using with GitHub Copilot

harness-kit targets Claude Code, but most of it works with any AI coding tool. SKILL.md files are plain markdown prompt templates — you can copy the relevant sections into your Copilot workspace instructions or custom agent prompt. The [conventions guide](#conventions-guide) applies directly to any tool that supports instruction files.

## Conventions Guide

A standalone guide to organizing Claude Code configuration with separation of concerns. Worth reading even if you don't use any plugins.

| File | Scope | Purpose |
|------|-------|---------|
| `CLAUDE.md` | Global + Project + Package | Operational: build, test, architecture |
| `AGENT.md` | Global + Project | Behavioral: tone, autonomy, workflow |
| `SOUL.md` | Global only | Identity: values, relationship, memory |

Read the full guide: **[Claude Conventions](docs/claude-md-conventions.md)**

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for plugin guidelines, skill conventions, and PR process.

## Docs

- **[Plugins vs. Skills](docs/plugins-vs-skills.md)** — Why everything ships as a plugin, even when it's just a prompt
- **[Claude Conventions](docs/claude-md-conventions.md)** — Organizing Claude Code config with separation of concerns

## License

MIT
