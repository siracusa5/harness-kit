# FAQ

## What is harness-kit?

harness-kit is a plugin collection for Claude Code. Each plugin packages a specific workflow — something like code review or codebase exploration — as a slash command you can install once and use in any project.

## What is an "AI harness"?

Your harness is the configuration that tells Claude how to work in a given session — files like `CLAUDE.md` and `AGENT.md`, plus any installed plugins. harness-kit helps you build and share that setup so it's not stuck on one machine.

## Why do I need this? Can't I just write prompts myself?

You can. The issue is that good prompts tend to disappear — scattered across projects, left behind when you move to a new machine. Plugins give them a stable home with a version number.

## What is a "skill"? What is a "plugin"?

A skill is a `SKILL.md` file — the workflow Claude reads when you type a slash command. A plugin is the package that wraps it: a directory with the skill, optional scripts, and a version. You install the plugin; Claude reads the skill.

See [Plugins vs. Skills](docs/plugins-vs-skills.md) for the full breakdown.

## How is a SKILL.md different from a regular prompt?

A prompt tells Claude what to do. A SKILL.md specifies how: step ordering, input parsing, output format, error handling. That structure is what makes the same command produce consistent output every time.

## Does this only work with Claude Code?

The install system targets Claude Code's plugin marketplace. But SKILL.md files are plain markdown — any tool that reads prompt files can use them. VS Code Copilot reads `CLAUDE.md` natively via `chat.useClaudeMdFile`. See the [Cross-Harness setup guide](https://siracusa5.github.io/harness-kit/docs/cross-harness/setup-guide) for Cursor, Windsurf, and others.

## Is this safe? What does installing a plugin actually do?

Plugins are plain markdown files. There are no binaries, no background processes, no network calls on install. Some plugins include shell scripts (like `research`'s index rebuild) that only run when you invoke the skill. You can read every file before installing.

## Do I need to pay for anything beyond my existing Claude subscription?

No. harness-kit is free and open source (Apache 2.0). All you need is Claude Code.

## How do I share my setup with teammates?

Run `/harness-export` to write a `harness.yaml` with your installed plugins. Commit it to your dotfiles or send it to a teammate. They run `/harness-import harness.yaml` and pick what they want from an interactive list — your setup is a starting point, not something they have to replicate exactly.

## Can I use this across multiple projects?

Yes. Plugins install to your harness globally, not per-project. `research` and `explain` work in any codebase without extra configuration. Project-specific stuff goes in `CLAUDE.md`.

## Can I build my own plugins?

Yes. A minimal plugin is about 10 lines of boilerplate plus a `SKILL.md`. See the [Creating Plugins guide](https://siracusa5.github.io/harness-kit/docs/guides/creating-plugins). You can also start with a bare skill file in `~/.claude/skills/` and promote it to a plugin when you're ready to share it.

## Can I modify the built-in plugins?

The installed files are plain text — edit them directly. For something more lasting, fork the repo and point your marketplace at your fork. If you improve something, a PR is welcome.

## How is harness-kit different from MCP servers?

MCP servers give your AI new tools — database access, web search, external APIs. harness-kit is about what to do with those tools: structured workflows with defined steps and outputs. They work at different levels and don't overlap.

## What is the harness.yaml file?

A list of your installed plugins with their sources and versions. Export it with `/harness-export`, commit it, and restore it anywhere with `/harness-import` or `harness-restore.sh`. See [`harness.yaml.example`](harness.yaml.example) for the format.

## I already have prompts in my CLAUDE.md. Should I move them?

Not necessarily. Project-specific workflows belong in `CLAUDE.md`. If you find yourself copying the same prompt into every new project, that's probably a sign it would work better as a plugin.
