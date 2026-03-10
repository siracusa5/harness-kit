---
sidebar_position: 0
title: How It Works
---

# How harness-kit Works

harness-kit packages proven AI workflows as portable plugins. This page explains the pieces and how they fit together.

## The Stack

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 310" style={{width: '100%', maxWidth: '560px', display: 'block', margin: '2rem auto'}}>
  <defs>
    <marker id="ap" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
      <polygon points="0 0, 10 3.5, 0 7" style={{fill: 'var(--ifm-color-primary)'}} />
    </marker>
    <marker id="am" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="userSpaceOnUse">
      <polygon points="0 0, 8 3, 0 6" style={{fill: 'var(--ifm-color-emphasis-300)'}} />
    </marker>
  </defs>

  {/* [You] */}
  <rect x="16" y="28" width="72" height="34" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="52" y="50" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '13px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>You</text>

  {/* You → Claude Code */}
  <line x1="88" y1="45" x2="122" y2="45" markerEnd="url(#ap)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="105" y="37" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '10px', fill: 'var(--ifm-color-primary)'}}>install</text>

  {/* [Claude Code] */}
  <rect x="132" y="28" width="126" height="34" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="195" y="50" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '13px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>Your Harness</text>

  {/* Claude Code → Registry */}
  <line x1="258" y1="45" x2="312" y2="45" markerEnd="url(#ap)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="285" y="37" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '10px', fill: 'var(--ifm-color-primary)'}}>fetch</text>

  {/* [Registry] */}
  <rect x="322" y="28" width="108" height="34" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="376" y="50" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '13px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>Registry</text>

  {/* Registry → Plugin Dir */}
  <line x1="376" y1="62" x2="287" y2="100" markerEnd="url(#ap)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="362" y="83" textAnchor="start" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '10px', fill: 'var(--ifm-color-primary)'}}>downloads</text>

  {/* [Plugin Directory] */}
  <rect x="200" y="108" width="150" height="34" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="275" y="130" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '13px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>Plugin Directory</text>

  {/* Fan-out: Plugin Dir → 4 components */}
  <line x1="275" y1="142" x2="72" y2="188" markerEnd="url(#am)" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <line x1="275" y1="142" x2="196" y2="188" markerEnd="url(#am)" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <line x1="275" y1="142" x2="318" y2="188" markerEnd="url(#am)" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <line x1="275" y1="142" x2="444" y2="188" markerEnd="url(#am)" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />

  {/* [SKILL.md] — primary */}
  <rect x="26" y="196" width="92" height="28" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="72" y="215" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '12px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>SKILL.md</text>

  {/* [scripts/] */}
  <rect x="152" y="196" width="88" height="28" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <text x="196" y="215" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '12px', fill: 'var(--ifm-font-color-base)', opacity: '0.7'}}>scripts/</text>

  {/* [hooks/] */}
  <rect x="278" y="196" width="80" height="28" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <text x="318" y="215" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '12px', fill: 'var(--ifm-font-color-base)', opacity: '0.7'}}>hooks/</text>

  {/* [agents/] */}
  <rect x="404" y="196" width="80" height="28" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1.5'}} />
  <text x="444" y="215" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '12px', fill: 'var(--ifm-font-color-base)', opacity: '0.7'}}>agents/</text>

  {/* SKILL.md → Workflow */}
  <line x1="72" y1="224" x2="72" y2="256" markerEnd="url(#ap)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="86" y="244" textAnchor="start" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '10px', fill: 'var(--ifm-color-primary)'}}>/command</text>

  {/* [Workflow] */}
  <rect x="26" y="264" width="92" height="28" rx="6" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="72" y="283" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '12px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>Workflow</text>

  {/* LOCAL / REMOTE region indicators */}
  <text x="18" y="14" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.08em'}}>LOCAL</text>
  <text x="322" y="14" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.08em'}}>REMOTE</text>
  <rect x="310" y="18" width="142" height="54" rx="8" style={{fill: 'none', stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1', strokeDasharray: '4 3'}} />
</svg>

## Plugin Lifecycle

1. **Source** — You register harness-kit as a plugin source in your AI tool. This points to the collection — not individual plugins.
2. **Install** — You install a plugin by name. Your harness downloads the plugin directory and makes it available locally.
3. **Discovery** — At session start, your harness scans installed plugins and registers any skills it finds.
4. **Invocation** — You invoke a command (e.g. `/research`). Your harness loads the matching `SKILL.md` into context as the workflow definition.
5. **Execution** — The AI follows the steps in the SKILL.md, using available tools (file I/O, web fetch, shell commands, MCP servers).

> **Distribution today:** harness-kit distributes through Claude Code's plugin marketplace. SKILL.md files are plain markdown — any tool that reads prompt templates can use them directly. See [Using with Other Tools](/docs/cross-harness/setup-guide).

## Starting Fresh on a New Machine

Your harness setup is fully reproducible. Config files live in version control; plugins reinstall from the registry with the same commands you used the first time.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 210" style={{width: '100%', maxWidth: '560px', display: 'block', margin: '2rem auto'}}>
  <defs>
    <marker id="arr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
      <polygon points="0 0, 10 3.5, 0 7" style={{fill: 'var(--ifm-color-primary)'}} />
    </marker>
  </defs>

  {/* Machine A label */}
  <text x="103" y="24" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>Your Machine</text>

  {/* Machine A box */}
  <rect x="8" y="30" width="190" height="172" rx="8" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />

  {/* Machine A: config files */}
  <text x="103" y="48" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.06em'}}>IN YOUR REPO</text>
  <rect x="18" y="54" width="84" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="60" y="70" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>CLAUDE.md</text>
  <rect x="112" y="54" width="78" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="151" y="70" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>AGENT.md</text>
  <rect x="18" y="86" width="80" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="58" y="102" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>.mcp.json</text>

  {/* Machine A: divider */}
  <line x1="18" y1="122" x2="188" y2="122" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1'}} />

  {/* Machine A: plugins */}
  <text x="103" y="136" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.06em'}}>PLUGINS</text>
  <rect x="18" y="142" width="60" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="48" y="157" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>explain</text>
  <rect x="86" y="142" width="74" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="123" y="157" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>research</text>
  <rect x="18" y="170" width="94" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="65" y="185" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>data-lineage</text>
  <rect x="120" y="170" width="60" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="150" y="185" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>review …</text>

  {/* Center: transfer steps */}
  <line x1="202" y1="78" x2="354" y2="78" markerEnd="url(#arr)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="278" y="70" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-color-primary)'}}>git clone</text>
  <line x1="202" y1="158" x2="354" y2="158" markerEnd="url(#arr)" style={{stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="278" y="150" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-color-primary)'}}>/plugin install</text>

  {/* Machine B label */}
  <text x="457" y="24" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>New Machine</text>

  {/* Machine B box */}
  <rect x="362" y="30" width="190" height="172" rx="8" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />

  {/* Machine B: config files */}
  <text x="457" y="48" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.06em'}}>IN YOUR REPO</text>
  <rect x="372" y="54" width="84" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="414" y="70" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>CLAUDE.md</text>
  <rect x="466" y="54" width="78" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="505" y="70" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>AGENT.md</text>
  <rect x="372" y="86" width="80" height="24" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-primary)', strokeWidth: '1.5'}} />
  <text x="412" y="102" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fontWeight: '600', fill: 'var(--ifm-font-color-base)'}}>.mcp.json</text>

  {/* Machine B: divider */}
  <line x1="372" y1="122" x2="542" y2="122" style={{stroke: 'var(--ifm-color-emphasis-300)', strokeWidth: '1'}} />

  {/* Machine B: plugins */}
  <text x="457" y="136" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '9px', fill: 'var(--ifm-color-emphasis-500)', letterSpacing: '0.06em'}}>PLUGINS</text>
  <rect x="372" y="142" width="60" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="402" y="157" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>explain</text>
  <rect x="440" y="142" width="74" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="477" y="157" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>research</text>
  <rect x="372" y="170" width="94" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="419" y="185" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>data-lineage</text>
  <rect x="474" y="170" width="60" height="22" rx="5" style={{fill: 'var(--ifm-color-emphasis-100)', stroke: 'var(--ifm-color-emphasis-400)', strokeWidth: '1.5'}} />
  <text x="504" y="185" textAnchor="middle" style={{fontFamily: 'var(--ifm-font-family-base)', fontSize: '11px', fill: 'var(--ifm-font-color-base)', opacity: '0.8'}}>review …</text>
</svg>

## Plugin Anatomy

Every plugin follows the same directory structure:

```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json         # name, version, description
├── skills/
│   └── <name>/
│       ├── SKILL.md        # the workflow (what Claude reads)
│       └── README.md       # human documentation
└── scripts/                # optional: automation scripts
    hooks/                  # optional: event hooks
    agents/                 # optional: agent configurations
```

| Component | Role | When it runs |
|-----------|------|-------------|
| `plugin.json` | Metadata — name, version, description | At install and update |
| `SKILL.md` | Workflow definition — the actual instructions Claude follows | At slash command invocation |
| `README.md` | Human-facing docs — usage examples, notes | Never (reference only) |
| `scripts/` | Shell scripts for automation | Called by SKILL.md or hooks |
| `hooks/` | Event handlers (e.g., Stop hook) | On harness lifecycle events |
| `agents/` | Agent configurations | When a skill spawns subagents |

## What Makes a Skill Different from a Prompt

A SKILL.md is more than a prompt — it's a **complete workflow specification**:

- **Mandatory step ordering** — steps must execute in sequence, no skipping
- **Input parsing rules** — how to interpret arguments
- **Tool usage patterns** — which tools to use when and how
- **Output structure** — exact format for results
- **Error handling** — what to do when things fail
- **Common mistakes table** — known failure modes and fixes

This structure makes skills repeatable across sessions and transferable across users. The same `/research` invocation produces the same workflow regardless of who runs it.

## Design Philosophy

harness-kit is a framework without a runtime. No SDK, no build step, no execution layer to depend on. The framework is the config format and the portability it creates — uninstall a plugin and nothing breaks, because nothing was ever coupled to it. Skills are plain markdown, readable and editable by anyone.

The SKILL.md is the portable unit. Plugins add distribution, versioning, and optional automation on top — but the workflow itself is just text that any AI tool can read.
