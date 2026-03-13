---
title: Understanding Agents
---

# Understanding Agents

"Agent" is the most overloaded word in AI. In the context of Claude Code and harness-kit, it means three different things. This page untangles them.

## Quick Reference

| Term | What it is | Where it lives |
|------|-----------|----------------|
| **AGENT.md** | A behavioral config file for Claude | `~/.claude/AGENT.md`, `<repo>/AGENT.md` |
| **Custom subagent** | An isolated specialist worker with its own context, tools, and permissions | `.claude/agents/`, `~/.claude/agents/`, `plugins/<name>/agents/` |
| **"AI agent" generally** | Claude Code itself, or any AI agent in industry usage | N/A (general industry term) |

## AGENT.md — Configuring Claude's Behavior

AGENT.md is part of the [three-file convention](/docs/guides/conventions) for organizing Claude Code configuration. It holds behavioral instructions: tone, autonomy level, workflow preferences, scope constraints.

Despite its name, AGENT.md doesn't define an agent — it configures Claude's behavior. When you write `## Tone: direct and concise` in AGENT.md, you're not creating a new agent; you're telling the existing one (Claude) how to behave.

AGENT.md lives at `~/.claude/AGENT.md` for global behavior, or `<repo>/AGENT.md` for project-specific overrides. Claude Code does not auto-load it — you must add a read instruction to your global `CLAUDE.md`. See the [conventions guide](/docs/guides/conventions) for setup and examples.

## Custom Subagent Definitions

Custom subagents are isolated specialist workers. Each gets:

- A **fresh context window** — no conversation history, no accumulated context from the parent session
- **Scoped tools** — only the tools you explicitly grant
- **Scoped permissions** — read-only, plan-only, or write access as needed
- **A specific model** — you can use haiku for fast cheap tasks, opus for complex ones

### When to Use a Subagent

- **Delegated tasks** — offload work that doesn't need the main conversation context (codebase exploration, document fetching)
- **Parallel work** — multiple agents working simultaneously with `isolation: worktree`
- **Restricted permissions** — an analysis agent that provably cannot modify files
- **Background processing** — long-running tasks that run while you continue working

### File Anatomy

A subagent definition is a markdown file with YAML frontmatter. The frontmatter sets metadata and constraints; the body becomes the agent's system prompt.

```yaml
---
name: code-explorer
description: Read-only codebase explorer — searches, maps, and explains code structure without modifying files
tools: [Read, Glob, Grep, Bash]
model: haiku
permissionMode: plan
---

You are a read-only codebase explorer. Your job is to search, map, and explain code structure.
Never modify files.
```

### Frontmatter Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Identifier for the agent |
| `description` | string | What the agent does — used for routing and invocation |
| `tools` | list | Tools the agent can use (e.g., `[Read, Glob, Grep]`) |
| `disallowedTools` | list | Tools explicitly blocked |
| `model` | string | Model to use: `haiku`, `sonnet`, `opus` (shorthand aliases; full model IDs also accepted) |
| `permissionMode` | string | `plan` (read-only), `acceptEdits`, `bypassPermissions` |
| `maxTurns` | integer | Maximum number of turns before stopping |
| `skills` | list | Skills available to the agent |
| `mcpServers` | list | MCP servers available to the agent |
| `hooks` | object | Lifecycle hooks |
| `memory` | object | Memory configuration |
| `background` | boolean | Run as background task |
| `isolation` | string | `worktree` — run in isolated git worktree |
| `color` | string | Display color in UI |

### Where They Live

| Location | Scope |
|----------|-------|
| `.claude/agents/<name>.md` | Project-level — available in this repo only |
| `~/.claude/agents/<name>.md` | User-level — available across all projects |
| `plugins/<name>/agents/<name>.md` | Plugin-bundled — installed with the plugin |

Plugin-bundled agents are mechanically identical to `.claude/agents/` agents — the difference is distribution. When a user installs a plugin, any agents it contains become available automatically. See [Creating Plugins](/docs/guides/creating-plugins) for how to bundle agents in a plugin.

## "AI Agent" in General

Claude Code itself is an AI agent — it perceives input, decides on actions, and executes them across multiple turns. When the industry says "agentic AI," this is what they mean. This usage doesn't correspond to a specific file or feature to configure; it's just the broader term for what Claude Code is.

## When to Use Which

```
Need to configure Claude's tone, autonomy, or workflow?
 └── AGENT.md

Need to delegate work with isolated context and scoped tools?
 ├── Yes
 │    ├── One-off → context: fork in SKILL.md frontmatter
 │    └── Reusable → Custom subagent definition file
 └── No → Write detailed instructions in your skill or message
```

## Common Confusion

**Does AGENT.md create a subagent?**
No. AGENT.md configures Claude's behavior in your session. It doesn't create a separate worker or isolate context.

**Can a skill run in isolation without a subagent definition?**
Yes — set `context: fork` in your SKILL.md frontmatter. This runs the skill in a fresh context window as a one-off, without needing a named agent definition file.

**Are plugin-bundled agents different from `.claude/agents/` agents?**
Mechanically no — they're the same YAML+markdown format with the same fields. The difference is distribution: `.claude/agents/` agents are local to your machine or project; plugin agents ship with the plugin and install automatically.
