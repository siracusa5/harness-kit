---
sidebar_position: 3
title: Comparisons
---

# Comparisons

## devenv

If you've used [devenv](https://devenv.sh), Harness Kit will feel familiar. The analogy is direct:

> **devenv is to your shell environment what Harness Kit is to your AI agent environment.**

devenv lets you declare a reproducible development environment — packages, languages, services — and carry that setup across machines and teammates. Harness Kit does the same thing for your AI workflows: declare the plugins you need, install them once, and they're available everywhere you work with Claude.

### What they share

| Concept | devenv | Harness Kit |
|---------|--------|-------------|
| Portable | `devenv.nix` travels with your repo | Plugins install by name, follow you everywhere |
| Declarative | Specify what you need; the tool resolves it | Specify which plugins; the harness loads them |
| Composable | Combine modules and inputs | Mix and match plugins per project |
| Shareable | Commit config, team gets same environment | Share a plugin name, team runs same workflow |

### Where they differ

devenv manages your **shell environment** — the packages, runtimes, and services your code needs to run. It's built on Nix and solves reproducibility at the OS/toolchain level.

Harness Kit manages your **AI agent environment** — the skills, workflows, and behaviors your Claude harness needs to be useful. It's built on the plugin system and solves portability at the workflow level.

devenv answers: *"How do I make sure every developer has the same Node version and Postgres instance?"*

Harness Kit answers: *"How do I make sure every session has the same code review workflow and research process?"*

### What Harness Kit doesn't try to be

Harness Kit is not a dev environment manager. It won't install packages, manage runtimes, or spin up services. If you need that, use devenv (or Nix, Docker, mise, etc.) alongside Harness Kit — they operate at different layers and compose naturally.

---

## Agent-to-Agent (A2A) Protocol

[A2A](https://a2aproject.github.io/A2A/) is an open protocol for runtime communication between agents — how a running agent delegates a task to another running agent, discovers its capabilities, and receives results. It's the messaging layer of multi-agent systems.

Harness Kit is not a messaging protocol. It never touches runtime agent communication.

> **A2A governs what agents say to each other. Harness Kit governs how an agent is set up before it says anything.**

### The layer distinction

| | A2A | Harness Kit |
|---|---|---|
| **When it runs** | At runtime, between live agents | At session start, before the agent does anything |
| **What it defines** | Task lifecycle, message format, capability discovery | Plugin configuration, MCP servers, instructions, permissions |
| **Analogy** | HTTP — the request/response protocol | package.json — what the process needs loaded to run |
| **Question answered** | How does Agent A delegate work to Agent B? | How is this agent configured to do its job? |

### They compose naturally

A team could use both: Harness Kit applies a consistent agent configuration at session start, and that agent uses A2A to coordinate with other agents at runtime. The two never conflict because they operate at different times with different concerns.

---

## Claude Agent SDK

The [Claude Agent SDK](https://docs.anthropic.com/en/docs/agents) is a developer API for building applications powered by Claude — managing multi-turn conversations, tool use, and agent orchestration in code.

Harness Kit is not a programming API. It's a configuration tool for people using Claude, not for people building Claude-powered products.

> **The Claude Agent SDK is for developers building on top of Claude. Harness Kit is for developers working alongside Claude.**

### The user distinction

| | Claude Agent SDK | Harness Kit |
|---|---|---|
| **Primary user** | App developer building a Claude-powered product | Developer using Claude Code as a coding assistant |
| **What you write** | Python/TypeScript application code | `harness.yaml` configuration files |
| **What it manages** | API calls, tool schemas, conversation state | Plugins, MCP servers, instructions, permissions |
| **Question answered** | How do I program an agent to do X? | How do I configure my AI environment to work the way I want? |

### What Harness Kit doesn't try to be

Harness Kit is not an SDK. It has no programmatic API for controlling Claude's behavior turn-by-turn. If you're building a product that uses Claude as a backend, use the Claude Agent SDK. If you're a developer who wants a better, more portable Claude Code setup, use Harness Kit.
