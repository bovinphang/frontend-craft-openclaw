# frontend-craft

[Stars](https://github.com/bovinphang/frontend-craft-openclaw/stargazers)
[License](LICENSE)
TypeScript
React
Vue
Figma
Node

---

**Language / 语言 / 語言 / 言語 / 언어**

**[English](README.md)** | [简体中文](README.zh-CN.md) | [繁體中文](docs/zh-TW/README.md) | [日本語](docs/ja-JP/README.md) | [한국어](docs/ko-KR/README.md)

---

**面向企业级前端团队的 OpenClaw 原生插件。**

提供工作流 **技能**、`commands/` 下的**斜杠命令 Markdown**、`skills/agents/` 下的**代理式剧本**、可选工具 `**frontend_craft_init_workspace`**，以及 **typed hooks_（`before_tool_call`、`after_tool_call`、`before_prompt_build`、`agent_end`）。各类评审与分析输出遵循各技能/文档约定（一般为 `reports/_.md`）。

**环境要求：** Node.js **≥ 22**，OpenClaw **≥ 2026.3.22**。

---

## 快速开始

### 1. 安装

从 [ClawHub](https://clawhub.ai) 安装（推荐）：

```bash
openclaw plugins install clawhub:frontend-craft
```

可使用 `clawhub:frontend-craft@<版本号>` 固定版本。

npm 包名安装（OpenClaw 会先查 ClawHub，再走 registry）：

```bash
openclaw plugins install frontend-craft
```

本地克隆或压缩包：

```bash
openclaw plugins install /path/to/frontend-craft
# 开发时可链接安装：
openclaw plugins install -l /path/to/frontend-craft
```

建议在配置中显式允许并启用：

```json5
{
  plugins: {
    allow: ["frontend-craft"],
    entries: {
      "frontend-craft": {
        enabled: true,
        config: {
          // 可选，字段见 openclaw.plugin.json 的 configSchema
        },
      },
    },
  },
}
```

重启网关：`openclaw gateway restart`（或你环境惯用的重启方式）。

检查：

```bash
openclaw plugins inspect frontend-craft
```

### 2. 更新插件

若通过 **ClawHub** 或 **npm** 安装，OpenClaw 会记录安装来源。按插件 id 更新：

```bash
openclaw plugins update frontend-craft
```

也可显式指定包说明（版本、dist-tag 或 `clawhub:` 定位符），例如：

```bash
openclaw plugins update clawhub:frontend-craft
openclaw plugins update frontend-craft@latest
```

更新全部已安装插件：

```bash
openclaw plugins update --all
```

仅预览、不执行：

```bash
openclaw plugins update frontend-craft --dry-run
```

完成后重启网关：`openclaw gateway restart`。

**链接或本地路径安装**（`openclaw plugins install -l …` 或目录路径）：请从同一路径重新安装以刷新文件，例如：

```bash
openclaw plugins install -l /path/to/frontend-craft
```

**仅技能**（通过 `npx skills add …`）：在安装了技能的项目目录（或对应全局作用域）执行 `npx skills update`。可先运行 `npx skills check` 查看可用更新。

命令说明见：[OpenClaw plugins](https://docs.openclaw.ai/cli/plugins)。

### 3. 初始化 OpenClaw 工作区（推荐）

OpenClaw 从**代理工作区**加载上下文（常为 `~/.openclaw/workspace`）。使用可选工具 `**frontend_craft_init_workspace`（如需请加入工具 allowlist）：

- `workspaceDir`：工作区根目录的**绝对路径**
- `overwriteAgents`：仅在需要覆盖已有 `AGENTS.md` 时设为 `true`

或从插件根目录手工复制：

- `templates/AGENTS.md` → 工作区 `AGENTS.md`
- `templates/rules/*.md` → 工作区 `skills/frontend-craft-rules/`

详见 `[commands/init.md](commands/init.md)` 与 `[templates/OPENCLAW-CONFIG.md](templates/OPENCLAW-CONFIG.md)`。

### 4. MCP（设计工具）

仓库根目录 `[.mcp.json](.mcp.json)` 为 **参考配置**。**原生插件不会自动合并**到运行时 — 请将其中 `mcpServers` 拷贝到 **embedded Pi / 网关 MCP 配置**（结构保持一致）。


| 变量               | 工具              |
| ---------------- | --------------- |
| `FIGMA_API_KEY`  | Figma / Desktop |
| `SKETCH_API_KEY` | Sketch          |
| `MG_MCP_TOKEN`   | MasterGo        |
| `MODAO_TOKEN`    | 墨刀              |


Pixso 见 `.mcp.json` 中的本地 URL。摹客无 MCP，请用截图或导出。

---

## 仓库结构

```
frontend-craft/
├── openclaw.plugin.json
├── package.json
├── src/index.ts
├── skills/           # 含 agents/ 剧本
├── commands/
├── templates/
├── scripts/
└── .mcp.json
```

---

## 功能概览

### 命令（Markdown）


| 命令         | 说明              |
| ---------- | --------------- |
| `init`     | 工作区初始化说明 + 工具方式 |
| `review`   | 代码评审引导          |
| `scaffold` | 页面 / 功能 / 组件脚手架 |


### 技能

工作流定义位于 `skills/<名称>/SKILL.md`，与 [frontend-craft](https://github.com/bovinphang/frontend-craft) Claude Code 插件中的技能包一致。任务描述与技能匹配时，代理通常会**自动选用**（具体行为因运行环境而异）。若只需把技能目录安装到 Cursor、Codex、Claude Code 等，见下文 [多工具技能（Skills CLI）](#多工具技能skills-cli)。


| Skill                        | 用途                                                 | 输出报告                        |
| ---------------------------- | -------------------------------------------------- | --------------------------- |
| `frontend-code-review`       | 从架构、类型、渲染、样式、可访问性等维度审查代码                           | `code-review-*.md`          |
| `security-review`            | XSS、CSRF、敏感数据泄露、输入校验等安全审查                          | `security-review-*.md`      |
| `accessibility-check`        | WCAG 2.1 AA 无障碍检查                                  | `accessibility-review-*.md` |
| `react-project-standard`     | React + TypeScript 项目工程规范（结构、组件、路由、状态、API 层）       | —                           |
| `vue3-project-standard`      | Vue 3 + TypeScript 项目工程规范（结构、组件、路由、Pinia、API 层）    | —                           |
| `implement-from-design`      | 基于 Figma/Sketch/MasterGo/Pixso/墨刀/摹客设计稿实现 UI       | `design-plan-*.md`          |
| `test-and-fix`               | 执行 lint、type-check、test、build 并修复失败                | `test-fix-*.md`             |
| `legacy-web-standard`        | JS + jQuery + HTML 传统项目的开发与维护规范                    | —                           |
| `legacy-to-modern-migration` | jQuery/MPA 迁移至 React/Vue 3 + TS 的策略、概念映射与分阶段流程     | `migration-plan-*.md`       |
| `e2e-testing`                | Playwright/Cypress E2E 测试规范：目录结构、Page Object、CI 集成 | —                           |
| `nextjs-project-standard`    | Next.js 14+ App Router、SSR/SSG、流式渲染、元数据、中间件规范      | —                           |
| `nuxt-project-standard`      | Nuxt 3 SSR/SSG、组合式 API、数据获取、路由、中间件规范               | —                           |
| `monorepo-project-standard`  | pnpm workspace、Turborepo、Nx：目录结构、依赖管理、任务编排         | —                           |


### 代理剧本（`skills/agents/`）

与 Claude Code 插件中的 **Agents（子代理）** 工作流一一对应；在 OpenClaw 中为 **Markdown 剧本**，于对话中按需载入上下文使用，**并非**独立子代理进程。


| 剧本                      | 用途                                            | 输出报告                         |
| ----------------------- | --------------------------------------------- | ---------------------------- |
| `frontend-architect`    | 页面拆分、组件架构、状态流设计、目录规划、大型重构                     | `architecture-proposal-*.md` |
| `performance-optimizer` | 分析性能瓶颈（打包体积、渲染性能、网络请求），输出量化优化方案               | `performance-review-*.md`    |
| `ui-checker`            | UI 视觉问题排查、设计还原度评估                             | `ui-fidelity-review-*.md`    |
| `figma-implementer`     | 按 Figma/Sketch/MasterGo/Pixso/墨刀/摹客设计稿精确实现 UI | `design-implementation-*.md` |
| `design-token-mapper`   | 将设计变量映射到项目 Design Token                       | `token-mapping-*.md`         |


### Typed hooks


| Hook                  | 行为                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------- |
| `before_tool_call`    | 拦截危险 exec/shell 命令（等同原 `security-check.mjs`）                                          |
| `after_tool_call`     | 对 `write`/`edit` 目标可选运行 Prettier（`formatAfterWrite`，默认开启）                             |
| `before_prompt_build` | 每个会话一次框架与包管理器提示                                                                       |
| `agent_end`           | 成功结束时可选系统通知（`notifyOnAgentEnd`，默认开启）                                                  |
| `gateway_stop`        | 可选在网关停止时跑 `lint` / `type-check` / `test` / `build`（`runValidationOnGatewayStop`，默认关闭） |


### 插件配置项


| 键                            | 类型      | 默认      | 含义          |
| ---------------------------- | ------- | ------- | ----------- |
| `formatAfterWrite`           | boolean | `true`  | 写后 Prettier |
| `notifyOnAgentEnd`           | boolean | `true`  | 运行成功桌面通知    |
| `runValidationOnGatewayStop` | boolean | `false` | 网关停止时跑校验脚本  |


---

## 多工具技能（Skills CLI）

若只需把 `skills/` 安装到 Cursor、Codex、Claude Code 等：

```bash
npx skills add bovinphang/frontend-craft-openclaw
```

这**不会**安装 OpenClaw 的 `src/index.ts` 与 hooks；OpenClaw 请用 `openclaw plugins install clawhub:frontend-craft`（或上文其他安装方式）。

---

## 报告输出

各技能/剧本中约定的 `reports/` 下 Markdown 文件。

---

## 开发

```bash
npm install
npm run typecheck
```

---

## 许可证

MIT

---

**觉得有用请点 Star。**