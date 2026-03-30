# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `templates/rules/code-comments.md`（前端代码注释规范）；`frontend_craft_init_workspace` 会随 `templates/rules/*.md` 一并复制

## [2.0.0] - 2026-03-26

### Breaking

- **Target runtime is OpenClaw** as a **native plugin** (`openclaw.plugin.json`, `package.json` → `src/index.ts`). Claude Code marketplace manifest (`.claude-plugin/`) and `hooks/hooks.json` are removed.
- **Project templates** no longer use `.claude/` + `CLAUDE.md` + `settings.json`. Use OpenClaw **workspace** files: `templates/AGENTS.md`, `templates/rules/` copied to workspace `skills/frontend-craft-rules/`, plus `templates/OPENCLAW-CONFIG.md` for gateway notes.
- **Agents** moved from `agents/` to **`skills/agents/`** as Markdown playbooks (OpenClaw does not run Claude-style subagents from the old layout).

### Added

- Typed hooks via `api.on`: `before_tool_call`, `after_tool_call`, `before_prompt_build`, `agent_end`; optional `gateway_stop` validation when `runValidationOnGatewayStop` is true.
- Optional tool **`frontend_craft_init_workspace`** (allowlist in OpenClaw) to copy templates into a workspace directory.
- `package.json` with `openclaw.extensions`, `peerDependencies.openclaw`, and `npm run typecheck`.

### Removed

- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`
- `hooks/hooks.json`, `templates/settings.json`, `templates/CLAUDE.md`
- Top-level `agents/*.md` (replaced by `skills/agents/*.md`)

---

## [1.1.0] - 2025-03-18

### Added

- `legacy-to-modern-migration` skill — jQuery/MPA 迁移至 React/Vue 3 + TS 的策略与流程
- `e2e-testing` skill — Playwright/Cypress E2E 测试规范
- `nextjs-project-standard` skill — Next.js 项目规范（App Router、SSR/SSG）
- `nuxt-project-standard` skill — Nuxt 3 项目规范（SSR/SSG）
- `monorepo-project-standard` skill — Monorepo 项目规范
- `rules/ci-cd.md` 模板 — CI/CD 流水线规范
- `rules/refactoring.md` 模板 — 重构项目约束（图片、样式、功能等价）
- CONTRIBUTING.md — 贡献指南
- CHANGELOG.md — 版本变更记录

### Changed

- `testing.md` — 补充 E2E 测试规则
- `frontend-architect` agent — 增加 `legacy-to-modern-migration` skill 引用
- `legacy-to-modern-migration` skill — 新增重构实施要求：图片（使用原项目资源、禁止内联 SVG）、样式（参考效果不照搬 CSS、优先 flex、禁止内联样式）、目标（视觉交互一致、功能等价、代码更简洁易维护）

---

## [1.0.0] - 2025-03-18

### Added

- 初始发布
- 5 个 Agents：frontend-architect、performance-optimizer、ui-checker、figma-implementer、design-token-mapper
- 9 个 Skills：frontend-code-review、security-review、accessibility-check、react-project-standard、vue3-project-standard、implement-from-design、test-and-fix、legacy-web-standard、legacy-to-modern-migration
- 3 个 Commands：init、review、scaffold
- Hooks：SessionStart、PreToolUse、PostToolUse、Stop、Notification
- 11 个规则模板：CLAUDE.md、settings.json、vue、react、design-system、testing、git-conventions、i18n、performance、api-layer、state-management、error-handling、naming-conventions
- MCP 集成：Figma、Sketch、MasterGo、Pixso、墨刀
- 多语言 README：English、简体中文、繁體中文、日本語、한국어
- 报告自动保存为 Markdown 至 `reports/` 目录
