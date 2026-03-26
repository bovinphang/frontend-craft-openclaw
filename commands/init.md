---

## name: init
description: 将 frontend-craft 的 OpenClaw 工作区模板（AGENTS.md、规则 Markdown）初始化到当前代理工作区。

将 frontend-craft 提供的模板复制到 **OpenClaw 代理工作区**（默认常为 `~/.openclaw/workspace`，或以网关配置 `agents.defaults.workspace` 为准）。

## 推荐方式（工具）

在已启用本插件可选工具的前提下，调用 `**frontend_craft_init_workspace`**：

- `workspaceDir`: 工作区根目录的**绝对路径**
- `overwriteAgents`: 若需覆盖已有 `AGENTS.md` 则设为 `true`

## 手动方式

1. 从本插件安装根目录（`openclaw plugins inspect frontend-craft` 查看路径）复制：
  - `templates/AGENTS.md` → 工作区根目录的 `AGENTS.md`
  - `templates/rules/*.md` → 工作区 `skills/frontend-craft-rules/`（自行创建目录）
2. 若已存在 `AGENTS.md`：不要直接覆盖；将模板中「规则与扩展技能」等章节**合并**进现有文件。
3. 阅读 `templates/OPENCLAW-CONFIG.md` 了解网关配置与 MCP 合并说明（本插件不再提供 Claude Code 的 `settings.json`）。
4. 完成后根据项目技术栈编辑 `AGENTS.md` 中的命令与栈说明，并删除 `skills/frontend-craft-rules/` 下不适用的规则文件。

## 完成后

- 根据实际技术栈修改 `AGENTS.md` 中的项目基础信息与常用命令
- 确认设计类 MCP 已按主 README「MCP」章节合并到网关配置

