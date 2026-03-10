---
name: harness-import
description: Use when user invokes /harness-import or wants to install plugins from a shared harness.yaml config file. Reads the config, presents each plugin interactively, and generates the Claude Code install commands for the ones the user selects.
---

# Import a Harness Configuration

You are helping the user install plugins from a `harness.yaml` file — either all of them or a subset they choose.

## Workflow Order (MANDATORY)

**Follow these steps in order. Do not skip any step.**

---

### Step 1: Find and read the config

Check for `harness.yaml` in this order:
1. A path provided by the user after `/harness-import` (e.g., `/harness-import ~/dotfiles/harness.yaml`)
2. `./harness.yaml` in the current directory

If no file is found at either location, tell the user:
> "No `harness.yaml` found. Get one from a teammate or generate your own with `/harness-export`."

Read and parse the file: extract the `marketplaces` mapping and the `plugins` list.

---

### Step 2: Show what's available

Display the plugin list clearly before asking anything:

```
Plugins in this config:

  1. explain (harness-kit) — Layered explanations of files, functions, directories, or concepts
  2. research (harness-kit) — Process any source into a structured, compounding knowledge base
  3. superpowers (obra) — Structured dev workflows — TDD, systematic debugging, subagent delegation
```

Then ask:
> "Would you like to install all of these, pick a subset, or get more details on any before deciding?"

---

### Step 3: Handle the user's choice

**"All"** — mark all plugins as selected, skip to Step 5.

**"Details"** — for each plugin the user asks about, explain what it does based on its description. You can supplement with your knowledge of harness-kit plugins. Then return to this question.

**"Pick" or "subset"** — proceed to Step 4.

---

### Step 4: Individual selection

Walk through each plugin one at a time:

> "**explain** — Layered explanations of files, functions, directories, or concepts. Include? (yes/no)"

Wait for the answer before moving to the next plugin. Collect the selection list.

After all plugins: "Got it — you've selected: [list]. Ready to generate the install commands?"

---

### Step 5: Generate install commands

Output the complete Claude Code command sequence. **Marketplaces come first, plugins second.** Only include marketplaces for the plugins actually selected.

Format:

```
Run these in Claude Code:

/plugin marketplace add siracusa5/harness-kit
/plugin marketplace add obra/superpowers-marketplace

/plugin install explain@harness-kit
/plugin install superpowers@obra
```

To map a plugin's `marketplace` key to the full `owner/repo` path, look it up in the `marketplaces` section of the config. Example: `marketplace: harness-kit` + `marketplaces.harness-kit: siracusa5/harness-kit` → `/plugin marketplace add siracusa5/harness-kit`.

Close with:
> "Paste these into Claude Code and run them in order. Restart Claude Code after the installs complete."

---

### Step 6: Offer shell fallback

After the commands, add:

> "If you'd rather install without Claude Code, use the shell script:
> ```bash
> curl -fsSL https://raw.githubusercontent.com/siracusa5/harness-kit/main/harness-restore.sh | bash -s -- harness.yaml
> ```
> This installs skill files directly (no scripts or hooks — those require the marketplace install)."

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Including marketplaces for plugins the user didn't select | Only add `marketplace add` lines for marketplaces that have at least one selected plugin |
| Forgetting to explain the `@name` convention | The `@name` in `/plugin install` must match the marketplace key in the config, not the owner/repo |
| Skipping the marketplace add commands | They must come before the plugin installs, or the installs will fail |
