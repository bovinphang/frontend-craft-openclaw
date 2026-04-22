# frontend-craft（繁體中文摘要）

[![Stars](https://img.shields.io/github/stars/bovinphang/frontend-craft-openclaw?style=flat)](https://github.com/bovinphang/frontend-craft-openclaw/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

<div align="center">

[**English**](../../README.md) | [简体中文](../../README.zh-CN.md) | [繁體中文](README.md) | [日本語](../ja-JP/README.md) | [한국어](../ko-KR/README.md)

</div>

---

本倉庫為 **OpenClaw 原生插件**（`openclaw.plugin.json` + `src/index.ts`），提供前端工作流技能、`skills/agents/` 劇本、可選工具 **`frontend_craft_init_workspace`**，以及 typed hooks（`exec` 安全攔截、可選 Prettier、工作區框架提示、可選完成通知等）。

**需求：** Node.js ≥ 22、OpenClaw ≥ 2026.4.20。

## 安裝

自 [ClawHub](https://clawhub.ai) 安裝（建議）：

```bash
openclaw plugins install clawhub:frontend-craft
```

可使用 `clawhub:frontend-craft@<版本>` 鎖定版本。

以 npm 套件名安裝（OpenClaw 會先查 ClawHub，再走 registry）：

```bash
openclaw plugins install frontend-craft
```

本機克隆或壓縮包（Windows 建議此方式）：

```bash
# 先打包再安裝（避免 pnpm symlink 在 Windows 複製 EPERM）：
npm install
npm run build
npm pack
openclaw plugins install ./frontend-craft-<version>.tgz

# 開發可用連結安裝：
openclaw plugins install -l /path/to/frontend-craft
openclaw gateway restart
openclaw plugins inspect frontend-craft
```

若直接安裝本機目錄且 `node_modules` 為 pnpm 符號連結結構，Windows 可能出現 `EPERM ... symlink ...`。

建議在 `openclaw.json` 設定 `plugins.allow` 與 `plugins.entries.frontend-craft`。

## 更新

若自 ClawHub / npm 安裝，可用插件 id 更新：

```bash
openclaw plugins update frontend-craft
```

亦可指定完整說明，例如 `openclaw plugins update clawhub:frontend-craft`、`frontend-craft@latest`。全部插件：`openclaw plugins update --all`；僅預覽：`--dry-run`。完成後執行 `openclaw gateway restart`。

以 `-l` 或本機路徑安裝者，請自同一路徑重新安裝以刷新檔案。

**僅技能**（`npx skills add …`）：在安裝技能的專案（或對應全域範圍）執行 `npx skills update`，可先 `npx skills check`。完整說明見倉庫根目錄 [README.md](../../README.md)。

## 工作區初始化

將 `templates/AGENTS.md` 與 `templates/rules/` 複製到 OpenClaw **代理工作區**（常為 `~/.openclaw/workspace`），或使用工具 `frontend_craft_init_workspace`。詳見倉庫根目錄 [README.md](../../README.md)、[commands/init.md](../../commands/init.md)。

## MCP

[`.mcp.json`](../../.mcp.json) 僅供參考，請手動合併至閘道／Pi 的 MCP 設定。環境變數說明見 [README.md](../../README.md)。

## 技能與代理劇本（摘要）

**技能**：`skills/<名稱>/SKILL.md`，與 [frontend-craft](https://github.com/bovinphang/frontend-craft) 外掛一致；任務符合描述時，代理通常會自動選用（依執行環境而定）。

| Skill                        | 用途                                                           | 輸出報告                    |
| ---------------------------- | -------------------------------------------------------------- | --------------------------- |
| `frontend-code-review`       | 架構、型別、渲染、樣式、無障礙等維度審查                       | `code-review-*.md`          |
| `security-review`            | XSS、CSRF、敏感資料外洩、輸入驗證                              | `security-review-*.md`      |
| `accessibility-check`        | WCAG 2.1 AA 無障礙                                             | `accessibility-review-*.md` |
| `react-project-standard`     | React + TypeScript 工程規範（結構、元件、路由、狀態、API 層）  | —                           |
| `vue3-project-standard`      | Vue 3 + TypeScript 工程規範（結構、元件、路由、Pinia、API 層） | —                           |
| `implement-from-design`      | 依 Figma/Sketch/MasterGo/Pixso/墨刀/摹客設計稿實作 UI          | `design-plan-*.md`          |
| `test-and-fix`               | 執行 lint、type-check、test、build 並修復失敗                  | `test-fix-*.md`             |
| `legacy-web-standard`        | JS + jQuery + HTML 傳統專案規範                                | —                           |
| `legacy-to-modern-migration` | jQuery/MPA 遷移至 React/Vue 3 + TS 的策略與階段流程            | `migration-plan-*.md`       |
| `e2e-testing`                | Playwright/Cypress E2E：目錄、Page Object、CI                  | —                           |
| `nextjs-project-standard`    | Next.js 14+ App Router、SSR/SSG、串流、metadata、middleware    | —                           |
| `nuxt-project-standard`      | Nuxt 3 SSR/SSG、composables、資料取得、路由、middleware        | —                           |
| `monorepo-project-standard`  | pnpm workspace、Turborepo、Nx：結構、依賴、任務編排            | —                           |

**代理劇本**：`skills/agents/*.md`，對應 Claude Code 外掛的子代理角色；於 OpenClaw 為對話中載入的 Markdown 劇本，非獨立子代理行程。

| 劇本                    | 用途                                           | 輸出報告                     |
| ----------------------- | ---------------------------------------------- | ---------------------------- |
| `frontend-architect`    | 頁面拆分、元件架構、狀態流、目錄規劃、大型重構 | `architecture-proposal-*.md` |
| `performance-optimizer` | 效能瓶頸（打包、渲染、網路）與量化優化方案     | `performance-review-*.md`    |
| `ui-checker`            | UI 問題與設計還原度                            | `ui-fidelity-review-*.md`    |
| `figma-implementer`     | 依設計稿高還原實作 UI                          | `design-implementation-*.md` |
| `design-token-mapper`   | 設計變數對應至 Design Token                    | `token-mapping-*.md`         |

## 完整說明

請以英文主文為準：[README.md](../../README.md)；簡體摘要：[README.zh-CN.md](../../README.zh-CN.md)。

## Skills CLI（僅技能）

```bash
npx skills add bovinphang/frontend-craft-openclaw
```

不會安裝 OpenClaw 插件執行檔與 hooks；完整插件請使用 `openclaw plugins install clawhub:frontend-craft` 等方式。
