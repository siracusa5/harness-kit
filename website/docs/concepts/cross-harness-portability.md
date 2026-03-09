---
sidebar_position: 2
title: Cross-Harness Portability
---

# Cross-Harness Portability

:::caution Not Yet Implemented
This is a planned feature. The page exists to document the concept and direction. No implementation work has started.
:::

## The Vision

harness-kit plugins currently target Claude Code. Cross-harness portability means the same plugin definition could work across multiple AI coding tools — Cursor, Windsurf, Copilot, and others — with a compatibility layer that translates between plugin formats.

## Why It Matters

- Avoid vendor lock-in for your AI configuration investment
- Share plugins with teams using different tools
- Build a plugin once, distribute everywhere

## Open Questions

- What's the common denominator across plugin formats?
- Which capabilities are tool-specific vs. portable?
- Should the compatibility layer live in harness-kit or as a separate tool?

## Status

Tracking as a future exploration. The current focus is building great plugins for Claude Code and establishing the marketplace pattern.
