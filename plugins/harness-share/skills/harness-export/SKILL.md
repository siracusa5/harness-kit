---
name: harness-export
description: Use when user invokes /harness-export or wants to save their current harness-kit plugin setup to a shareable harness.yaml file. Detects installed skills, collects marketplace info, and writes the config. Do NOT use for importing or restoring a harness — use /harness-import instead.
disable-model-invocation: true
---

# Export Your Harness Configuration

You are helping the user capture their current harness-kit setup into a `harness.yaml` file they can share with teammates or commit to their dotfiles repo.

## Workflow Order (MANDATORY)

**Follow these steps in order. Do not skip any step.**

---

### Step 1: Detect installed skills

Read the `~/.claude/skills/` directory to find installed skills. Each subdirectory is an installed skill:

```bash
ls ~/.claude/skills/
```

Collect the directory names as your list of installed plugin names.

---

### Step 2: Ask about marketplaces

Tell the user what skills you found, then ask:

> "I found these installed skills: [list]. Which marketplaces have you added? For each, provide the short name and the owner/repo path — for example:
> - `harness-kit` → `siracusa5/harness-kit`
> - `obra` → `obra/superpowers-marketplace`
>
> If you've only added harness-kit, just say so."

Wait for the user's response before proceeding.

---

### Step 3: Build the plugin entries

For each installed skill, determine its marketplace and description:

**Known harness-kit plugins** (marketplace: `harness-kit`):
| Plugin | Description |
|--------|-------------|
| explain | Layered explanations of files, functions, directories, or concepts |
| research | Process any source into a structured, compounding knowledge base |
| data-lineage | Column-level lineage tracing through SQL, Kafka, Spark, and JDBC |
| orient | Topic-focused session orientation across graph, knowledge, and research |
| capture-session | Capture session information into a staging file for later reflection |
| review | Code review for a branch, PR, or path — severity labels and cross-file analysis |
| docgen | Generate or update README, API docs, architecture overview, or changelog |
| harness-export | Export your installed plugins to a shareable harness.yaml |
| harness-import | Import a harness.yaml and interactively select plugins to install |

For any installed skill **not in this table**, ask the user:
> "I see `[name]` installed but don't recognize it. What marketplace is it from, and what does it do in one sentence?"

---

### Step 4: Write harness.yaml

Write `harness.yaml` to the current directory (or a path the user specifies). Use this format exactly:

```yaml
version: 1

marketplaces:
  harness-kit: siracusa5/harness-kit
  # add other marketplaces as: short-name: owner/repo

plugins:
  - name: explain
    marketplace: harness-kit
    description: Layered explanations of files, functions, directories, or concepts
  # additional plugins follow the same structure
```

Rules:
- `marketplaces` is a mapping: short name → `owner/repo` path
- `plugins[].marketplace` must match a key in `marketplaces`
- Include only the marketplaces for plugins that are actually installed

---

### Step 5: Confirm and suggest next steps

Tell the user where the file was written:

> "Saved to `harness.yaml`. Commit it to your dotfiles or share it with a teammate. They can import it with `/harness-import` inside Claude Code, or with the shell fallback:
>
> ```bash
> curl -fsSL https://raw.githubusercontent.com/siracusa5/harness-kit/main/harness-restore.sh | bash -s -- harness.yaml
> ```"

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Including `harness-export` and `harness-import` in the output | Only include plugins the user actually uses. These meta-plugins don't need to be in their config. |
| Using owner as marketplace key when the repo name is the identifier | For harness-kit: key is `harness-kit`, not `siracusa5`. Ask the user if unsure. |
| Writing to a path without confirming | Write to `./harness.yaml` by default. If user specified a path in the invocation, use that. |
