---
name: orient
description: Use when user invokes /orient with a topic keyword, entity type, project name, time qualifier, or combination. Searches the MCP Memory Server graph, knowledge files, journal entries, and research index to produce a focused orientation briefing. Gracefully degrades if MCP Memory Server is not connected.
---

# Topic-Focused Orientation

## Overview

Produce a focused orientation briefing for a specific topic by searching across the knowledge graph, knowledge files, journal entries, and research index. Designed for targeted context loading — get only what's relevant instead of everything.

**Core principles:**
1. **Targeted, not exhaustive.** Only return information related to the requested topic.
2. **Graceful degradation.** If MCP Memory Server is not connected, skip graph sections. Knowledge files and research still work.
3. **Conversation output.** Briefing goes to the conversation, not files. The user can ask to save.
4. **Token-conscious.** Output stays between ~800-2000 tokens. Orientation briefing, not document dump.

## When to Use

User types `/orient` followed by:
- **Topic keyword** → search everything for that topic (`membrain`, `data engineering`)
- **Entity type name** → search graph for that type (`desires`, `open tensions`)
- **Time qualifier** → show recent entries (`recent`, `last week`, `today`)
- **Combination** → compound search (`recent membrain`, `desires and tensions`)

## Invocation Examples

```
/orient membrain
/orient desires and tensions
/orient recent evidence
/orient the streaming migration project
/orient data engineering
```

## Workflow Order (MANDATORY)

**You MUST follow this order. No skipping steps.**

---

### Step 1: Parse Input

Classify the argument into one or more of:

| Type | Detection | Example |
|------|-----------|---------|
| Entity type | Matches known graph type (case-insensitive): Desire, Tension, Evidence, Project, Research, Concept, Value, Idea, Procedure, Question, Goal | `desires`, `open tensions` |
| Time qualifier | Contains: "recent", "latest", "last week", "today", date patterns (YYYY-MM-DD) | `recent evidence` |
| Topic keyword | Everything else — natural language | `membrain`, `data engineering` |

- Strip filler words ("the", "and", "about") when extracting the core query
- Handle compound inputs: "desires and tensions" → two entity types
- Combinations are valid: "recent membrain" = time qualifier + topic keyword

---

### Step 2: Search Graph

**Requires:** MCP Memory Server (`search_nodes`, `open_nodes` tools available)

If MCP Memory Server is not connected, skip this step entirely and note it in the output: *"Graph: MCP Memory Server not connected — skipped."*

**Search strategy:**
- Call `search_nodes("topic")` with the parsed topic keyword
- If entity type detected, also call `search_nodes("EntityType")` for each type
- If both topic and entity type detected, search for both

**Hard caps (MANDATORY):**

| Guard | Limit |
|-------|-------|
| `read_graph` | NEVER called — this dumps the entire graph |
| `search_nodes` calls | Max 3 per orientation |
| `open_nodes` calls | Max 2 per orientation |
| Entities shown | Max 10 |
| Observations per entity | Max 3 |

**Breadth guard:** If search returns >15 results, report the count and ask the user to narrow their query instead of dumping everything.

**Selection:** From results, select the top 10 most relevant entities. Show max 3 observations per entity.

---

### Step 3: Scan Knowledge Files

1. List the `knowledge/` directory to discover what files exist
2. Grep discovered files for the topic keyword(s)
3. For time qualifiers: list `knowledge/journal/` and read matching date entries (most recent first)
4. Extract only the enclosing section (H2/H3 level) around each match — NOT entire files
5. **Cap:** Read from at most 3 files
6. **Cap:** Read at most 3 journal entries

If no `knowledge/` directory exists, skip this step and note it.

---

### Step 4: Scan Research Index (conditional)

1. If `research/INDEX.md` exists, grep it for the topic keyword(s)
2. Check if a `research/[topic]/` directory exists — if so, list its files
3. **List only** — do NOT read synthesis files. Offer to read specific ones.
4. **Cap:** Show up to 5 matching research entries

If no `research/` directory or INDEX.md exists, skip this step.

---

### Step 5: Present Briefing

Use this output structure. **Omit empty sections** — do not include a section header with no content.

```markdown
## Orient: [Topic]

### Graph
- **EntityName** (Type) — observation 1; observation 2; observation 3
- **EntityName** (Type) — observation 1

### Knowledge
> From projects.md: [relevant excerpt — the enclosing section, condensed]
> From evidence.md: [relevant excerpt]

### Journal
- **2026-03-07:** [relevant excerpt from that day's entry]
- **2026-03-06:** [relevant excerpt]

### Research
- `research/membrain/architecture.md` — membrain architecture reference
- `research/agent-memory/hindsight.md` — biomimetic agent memory

### Suggested Queries
- `search_nodes("membrain governance")` — governance layer details
- `open_nodes(["Desire-Build-Something-Shippable"])` — full desire context
```

**Adaptive rules:**
- If both Graph and Knowledge are empty, say so explicitly: *"No results found for '[topic]'. Try a different keyword or check available entity types."*
- Always include at least one populated section or a clear "nothing found" message
- If Graph was skipped due to MCP not being connected, note that in the Graph section position
- Suggested Queries section: include 1-3 queries that would logically extend the orientation. Only suggest `search_nodes` or `open_nodes` — never `read_graph`.

---

### Step 6: Offer Follow-Up

End with a contextual follow-up offer:

- **For topic queries:** "Want me to read any of the research files, load more graph entities, or orient on a related topic?"
- **For entity-type queries:** "Want me to open specific entities for full details?"
- **For time queries:** "Want me to read more journal entries or search for a specific topic within this timeframe?"

---

## Scope Controls Summary

| Guard | Limit |
|-------|-------|
| `read_graph` | NEVER called |
| `search_nodes` calls | Max 3 |
| `open_nodes` calls | Max 2 |
| Graph entities shown | Max 10 |
| Observations per entity | Max 3 |
| Knowledge files read | Max 3 |
| Journal entries read | Max 3 |
| Research entries listed | Max 5 (listed, not read) |
| Total output | ~800-2000 tokens |
| Broad result threshold | >15 results → ask user to narrow |

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Calling `read_graph` | NEVER. Use `search_nodes` with targeted queries only. |
| Reading entire knowledge files | Extract only the enclosing H2/H3 section around the match. |
| Reading research synthesis files | List them. Offer to read specific ones. Don't read proactively. |
| Exceeding search caps | Stop at 3 `search_nodes` calls, 2 `open_nodes` calls. If you need more, offer follow-up queries. |
| Dumping >15 graph results | Report the count and ask the user to narrow their query. |
| Including empty sections | Omit sections that have no content. Don't show "### Research" with nothing under it. |
| Ignoring MCP availability | Check if `search_nodes`/`open_nodes` tools exist before calling them. If not, skip Graph and note it. |
| Wall of text | Keep output between ~800-2000 tokens. This is a briefing, not a report. Condense excerpts. |
| Suggesting `read_graph` in follow-ups | Only suggest `search_nodes` or `open_nodes` as follow-up queries. |
