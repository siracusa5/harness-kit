# claude-setup

Claude Code configuration worth sharing — skills and scripts developed through daily use.

## Skills

Skills are slash commands that give Claude Code structured, repeatable workflows.

### `/research` — Build a knowledge base from anything

Feed it a URL, GitHub repo, YouTube video, PDF, or local file. It fetches the content, saves it verbatim, synthesizes it into a structured document, and maintains a master index so everything stays findable.

**A session looks like this:**

```
/research: https://github.com/letta-ai/letta
```

Claude fetches the repo tree, identifies key docs, scans for prompt injection, then produces:

```
your-project/
├── resources/
│   └── letta-readme-2026-03-06.md        ← raw content, preserved verbatim
└── research/
    ├── INDEX.md                           ← master index, auto-updated
    └── agent-memory/
        └── letta.md                       ← synthesis with frontmatter tags
```

The synthesis file starts like:

```yaml
---
tags: [github, python, memory, multi-agent, open-source]
date: 2026-03-06
source: https://github.com/letta-ai/letta
---

# Letta

## Overview
...
```

**Multiple sources, one synthesis.** Research the docs today, find a conference talk tomorrow — both feed the same `letta.md` rather than creating parallel documents. Knowledge accumulates rather than sprawls.

**Supported sources:**

| Source | Example |
|--------|---------|
| GitHub repository | `github.com/owner/repo` |
| Documentation site | `docs.example.com` |
| Academic paper | arXiv, PDF URLs |
| Blog post / article | dev.to, Substack, personal sites |
| Reddit thread | any `reddit.com` link |
| YouTube video | description + transcript if available |
| Podcast episode | show notes + any linked transcript |
| Local file | PDF, markdown, text, code |

**Install:**

```bash
cp -r skills/research/ ~/.claude/skills/research/
```

Requires [Claude Code](https://claude.ai/claude-code). The [`gh` CLI](https://cli.github.com/) is only needed for GitHub repo URLs.

Full docs: [`skills/research/README.md`](skills/research/README.md)

---

## Scripts

### `rebuild-research-index.py`

Regenerates `research/INDEX.md` from synthesis file YAML frontmatter. The research skill calls this automatically at the end of each session; run it manually to repair drift or after editing files by hand.

**Requires:** Python 3.10+, `pyyaml`

```bash
pip install pyyaml
python3 scripts/rebuild-research-index.py
python3 scripts/rebuild-research-index.py --dry-run
```

Place it in a `scripts/` directory at your project root, alongside your `research/` directory.

---

## Repo structure

```
claude-setup/
├── skills/
│   └── research/
│       ├── SKILL.md        ← skill implementation (read by Claude)
│       └── README.md       ← usage docs (read by you)
└── scripts/
    └── rebuild-research-index.py
```

Skills install to `~/.claude/skills/`. Scripts live in your project's `scripts/` directory.

---

## Philosophy

This is a working setup, not a framework. Everything here earned its place through use. Nothing is included speculatively.
