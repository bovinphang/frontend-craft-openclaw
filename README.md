# frontend-craft

[![Stars](https://img.shields.io/github/stars/bovinphang/frontend-craft-openclaw?style=flat)](https://github.com/bovinphang/frontend-craft-openclaw/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Vue](https://img.shields.io/badge/-Vue-4FC08D?logo=vue.js&logoColor=white)
![Figma](https://img.shields.io/badge/-Figma-F24E1E?logo=figma&logoColor=white)
![Node](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

---

<div align="center">

**Language / 语言 / 語言 / 言語 / 언어**

[**English**](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md)

</div>

---

**An OpenClaw native plugin for enterprise frontend teams.**

Ships workflow **skills**, **slash-command markdown** under `commands/`, **agent-style playbooks** under `skills/agents/`, optional **`frontend_craft_init_workspace`** tool, and **typed hooks** (`before_tool_call`, `after_tool_call`, `before_prompt_build`, `agent_end`). Review and analysis outputs follow each skill’s convention (typically `reports/*.md`).

**Requirements:** Node.js **≥ 22**, OpenClaw **≥ 2026.4.20**.

---

## Quick start

### 1. Install

From [ClawHub](https://clawhub.ai) (recommended):

```bash
openclaw plugins install clawhub:frontend-craft
```

You can pin a version with `clawhub:frontend-craft@<version>`.

From npm (bare package name; OpenClaw checks ClawHub first, then the registry):

```bash
openclaw plugins install frontend-craft
```

From a clone or release tarball (**recommended for local installs on Windows**):

```bash
# Build and pack first (avoids pnpm symlink copy issues on Windows):
npm install
npm run build
npm pack
openclaw plugins install ./frontend-craft-<version>.tgz

# or linked dev install:
openclaw plugins install -l /path/to/frontend-craft
```

If you install directly from a local directory that uses pnpm-style symlinks in `node_modules`, Windows may fail with `EPERM ... symlink ...`.

Enable explicitly (recommended):

> If `plugins.allow` does not include `frontend-craft`, gateway startup may show a plugin trust prompt / security warning. Add the plugin id to the allowlist before restarting the gateway.

```json5
{
  plugins: {
    allow: ["frontend-craft"],
    entries: {
      "frontend-craft": {
        enabled: true,
        config: {
          // optional — see openclaw.plugin.json configSchema
          // "formatAfterWrite": true,
          // "notifyOnAgentEnd": true,
        },
      },
    },
  },
}
```

Restart the gateway: `openclaw gateway restart` (or your usual restart flow).

Verify:

```bash
openclaw plugins inspect frontend-craft
```

### 2. Update the plugin

If you installed from **ClawHub** or **npm**, OpenClaw keeps a tracked install spec. Update by plugin id:

```bash
openclaw plugins update frontend-craft
```

You can also pass an explicit package spec (version, dist-tag, or `clawhub:` locator), for example:

```bash
openclaw plugins update clawhub:frontend-craft
openclaw plugins update frontend-craft@latest
```

Update every installed plugin:

```bash
openclaw plugins update --all
```

Preview without applying:

```bash
openclaw plugins update frontend-craft --dry-run
```

Then restart the gateway: `openclaw gateway restart`.

**Linked or local path installs** (`openclaw plugins install -l …` or a directory path): reinstall from that same path so files refresh, for example:

```bash
openclaw plugins install -l /path/to/frontend-craft
```

**Skills only** (via `npx skills add …`): in the project where skills were installed (or the matching global scope), run `npx skills update`. Use `npx skills check` first to see what would change.

CLI reference: [OpenClaw plugins](https://docs.openclaw.ai/cli/plugins).

### 3. Initialize the OpenClaw workspace (recommended)

OpenClaw loads context from the **agent workspace** (often `~/.openclaw/workspace`). Use the optional tool **`frontend_craft_init_workspace`** (add it to your tool allowlist if needed) with:

- `workspaceDir`: absolute path to that workspace
- `overwriteAgents`: `true` only if you want to replace an existing `AGENTS.md`

Or copy manually from the plugin root:

- `templates/AGENTS.md` → workspace `AGENTS.md`
- `templates/rules/*.md` → workspace `skills/frontend-craft-rules/`

See [`commands/init.md`](commands/init.md) and [`templates/OPENCLAW-CONFIG.md`](templates/OPENCLAW-CONFIG.md).

### 4. MCP (design tools)

This repo’s [`.mcp.json`](.mcp.json) is a **reference** for Figma, Sketch, MasterGo, Pixso, and 墨刀. **Native OpenClaw plugins do not auto-merge** that file into your runtime — copy the `mcpServers` block into your **embedded Pi / gateway MCP config** (same structure as in `.mcp.json`).

| Variable         | Tool            |
| ---------------- | --------------- |
| `FIGMA_API_KEY`  | Figma / Desktop |
| `SKETCH_API_KEY` | Sketch          |
| `MG_MCP_TOKEN`   | MasterGo        |
| `MODAO_TOKEN`    | 墨刀            |

Pixso: local MCP URL as in `.mcp.json`. 摹客: no MCP; use screenshots or exports.

---

## Repository layout

```
frontend-craft/
├── openclaw.plugin.json   # Manifest (id, skills roots, config schema)
├── package.json           # npm package + openclaw.extensions → src/index.ts
├── src/index.ts           # definePluginEntry: hooks + optional init tool
├── skills/                # Workflow skills + agents/ playbooks
├── commands/              # Markdown command specs (loaded as skill roots)
├── templates/             # AGENTS.md, rules, OpenClaw config notes
├── scripts/               # Legacy Node scripts (hooks now in src/)
└── .mcp.json              # MCP reference for manual merge
```

---

## Features

### Commands (markdown)

| Command    | Purpose                                       |
| ---------- | --------------------------------------------- |
| `init`     | Instructions + tool-based workspace bootstrap |
| `review`   | Guided code review flow                       |
| `scaffold` | Page / feature / component scaffolding        |

### Skills

Workflow definitions under `skills/<name>/SKILL.md`, aligned with the [frontend-craft](https://github.com/bovinphang/frontend-craft) Claude Code plugin. The agent typically **auto-selects** a skill when your task matches its description (exact behavior depends on the harness). To install **only** these folders into Cursor, Codex, Claude Code, etc., use the [Skills CLI](#multi-agent-skills-skills-cli).

| Skill                        | Purpose                                                                         | Report output               |
| ---------------------------- | ------------------------------------------------------------------------------- | --------------------------- |
| `frontend-code-review`       | Architecture, types, rendering, styles, accessibility                           | `code-review-*.md`          |
| `security-review`            | XSS, CSRF, sensitive data leakage, input validation                             | `security-review-*.md`      |
| `accessibility-check`        | WCAG 2.1 AA accessibility                                                       | `accessibility-review-*.md` |
| `react-project-standard`     | React + TypeScript standards (structure, components, routing, state, API layer) | —                           |
| `vue3-project-standard`      | Vue 3 + TypeScript standards (structure, components, routing, Pinia, API layer) | —                           |
| `implement-from-design`      | Implement UI from Figma / Sketch / MasterGo / Pixso / 墨刀 / 摹客               | `design-plan-*.md`          |
| `test-and-fix`               | Run lint, type-check, test, build; fix failures                                 | `test-fix-*.md`             |
| `legacy-web-standard`        | JS + jQuery + HTML legacy project standards                                     | —                           |
| `legacy-to-modern-migration` | jQuery / MPA → React or Vue 3 + TS strategy and phased workflow                 | `migration-plan-*.md`       |
| `e2e-testing`                | Playwright / Cypress E2E: layout, Page Object, CI                               | —                           |
| `nextjs-project-standard`    | Next.js 14+ App Router, SSR/SSG, streaming, metadata, middleware                | —                           |
| `nuxt-project-standard`      | Nuxt 3 SSR/SSG, composables, data fetching, routing, middleware                 | —                           |
| `monorepo-project-standard`  | pnpm workspace, Turborepo, Nx: structure, deps, task orchestration              | —                           |

### Agent playbooks

Markdown under `skills/agents/*.md` corresponds to the **sub-agent** roles in the Claude Code plugin, but in OpenClaw they are **in-session playbooks** (not separate subagent processes). Load the file in context when you need that workflow.

| Playbook                     | Purpose                                                                                 | Report output                 |
| ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| `frontend-architect`         | Page splitting, component architecture, state flow, directory planning, large refactors | `architecture-proposal-*.md`  |
| `performance-optimizer`      | Performance bottlenecks (bundle, render, network); quantified optimization plan         | `performance-review-*.md`     |
| `ui-checker`                 | UI defects, design fidelity vs design specs                                             | `ui-fidelity-review-*.md`     |
| `figma-implementer`          | High-fidelity UI from Figma / Sketch / MasterGo / Pixso / 墨刀 / 摹客                   | `design-implementation-*.md`  |
| `design-token-mapper`        | Map design variables to project Design Tokens                                           | `token-mapping-*.md`          |
| `frontend-code-reviewer`     | Frontend code review (React/Vue/Next/Nuxt, a11y, client security)                       | `code-review-*.md`            |
| `frontend-security-reviewer` | Browser-side security (XSS, secrets, dangerous DOM/API)                                 | `security-review-*.md`        |
| `frontend-e2e-runner`        | E2E journeys, Playwright/Cypress, flaky handling                                        | `e2e-summary-*.md` (optional) |
| `typescript-reviewer`        | TS/JS types, async, security; run typecheck first                                       | `typescript-review-*.md`      |

### Typed hooks (plugin)

| Hook                  | Behavior                                                                                      |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `before_tool_call`    | Blocks dangerous `exec` / shell-style commands (same patterns as legacy `security-check.mjs`) |
| `after_tool_call`     | Optional Prettier on `write` / `edit` targets (`formatAfterWrite`, default on)                |
| `before_prompt_build` | One-line framework + package-manager hint per session (from workspace `package.json`)         |
| `agent_end`           | Optional desktop notification on success (`notifyOnAgentEnd`, default on)                     |

### Plugin config (`plugins.entries.frontend-craft.config`)

| Key                          | Type    | Default | Meaning                                                            |
| ---------------------------- | ------- | ------- | ------------------------------------------------------------------ |
| `formatAfterWrite`           | boolean | `true`  | Prettier after write/edit                                          |
| `notifyOnAgentEnd`           | boolean | `true`  | OS notification when a run succeeds                                |

---

## Multi-agent skills (Skills CLI)

To install **only** the `skills/` workflows into Cursor, Codex, Claude Code, etc.:

```bash
npx skills add bovinphang/frontend-craft-openclaw
```

This does **not** install the OpenClaw native plugin hooks or `src/index.ts`; use `openclaw plugins install clawhub:frontend-craft` (or another install source from above) for OpenClaw.

---

## Report output

Reports are written under the project/workspace `reports/` directory as described in each skill or agent playbook (e.g. `code-review-*.md`, `security-review-*.md`, `typescript-review-*.md`, `performance-review-*.md`, `e2e-summary-*.md`, `design-implementation-*.md`).

---

## Development

```bash
npm install
npm run typecheck
```

---

## License

MIT

---

**If this repo helps you, give it a star.**
