# Changelog

## 0.2.0 — 2026-03-09

### Added

- `plugins/review/` — `/review` skill for structured code review of branches, PRs, and paths. Per-file output with BLOCKER/WARNING/NIT severity labels, cross-file analysis, and overall verdict.
- `plugins/docgen/` — `/docgen` skill for generating or updating README, API docs, architecture overview, and changelog. Always outputs to conversation before writing to disk.
- README redesign — Quick Start section, enhanced plugin table with invocation examples, GitHub Copilot compatibility note, Contributing section.

### Changed

- All plugin versions bumped to `0.2.0`.

---

## 0.1.0 — 2026-03-06

Initial release.

### Added

- `plugins/research/` — `/research` skill for processing any source (URL, GitHub repo, YouTube, PDF, local file) into a structured, compounding knowledge base with index and synthesis files
- `plugins/explain/` — `/explain` skill for layered code explanations: files, directories, functions, classes, and concepts
- `plugins/data-lineage/` — `/data-lineage` skill for tracing column-level data lineage through SQL, Kafka, Spark, and JDBC codebases
- `plugins/orient/` — `/orient` skill for topic-focused session orientation across graph, knowledge, journal, and research
- `plugins/stage/` — `/stage` skill for capturing session information into a staging file for later reflection and knowledge graph processing
- `scripts/rebuild-research-index.py` — regenerates `research/INDEX.md` from synthesis file frontmatter
- `docs/claude-md-conventions.md` — guide to organizing Claude Code config with CLAUDE.md / AGENT.md / SOUL.md separation
- `docs/plugins-vs-skills.md` — rationale for shipping everything as plugins
- `CONTRIBUTING.md` — plugin guidelines, skill conventions, PR process
