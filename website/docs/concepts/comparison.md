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
