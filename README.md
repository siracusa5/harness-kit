# claude-setup

Curated Claude Code configuration — skills, scripts, and workflows developed through active use.

## Contents

### Skills

Skills extend Claude Code with slash commands and structured workflows.

#### `/research` — Research Material Processing

Systematically process any source (URLs, GitHub repos, YouTube videos, local files, papers, podcasts) into a structured, searchable knowledge base.

**Key features:**
- Raw content preservation before synthesis (always)
- One synthesis per topic — multiple sources compound rather than sprawl
- Duplicate + topic-match detection before fetching
- Prompt injection scanning for GitHub repos
- YAML frontmatter tagging + master index

**Install:**

```bash
cp -r skills/research/ ~/.claude/skills/research/
```

Then use `/research: <url-or-path>` in any Claude Code session.

See `skills/research/README.md` for full usage docs.

### Scripts

#### `rebuild-research-index.py`

Rebuilds `research/INDEX.md` from synthesis file frontmatter. Called automatically at the end of each research session, but can be run manually.

**Requires:** Python 3.10+, `pyyaml` (`pip install pyyaml`)

```bash
python3 scripts/rebuild-research-index.py
python3 scripts/rebuild-research-index.py --dry-run
```

Expects this layout in your project root:

```
your-project/
├── research/
│   └── category/
│       └── name.md   ← YAML frontmatter with tags: required
└── scripts/
    └── rebuild-research-index.py
```

## Philosophy

This is a working setup, not a framework. Everything here earned its place through use. Nothing is included speculatively.
