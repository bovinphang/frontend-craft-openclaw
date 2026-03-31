# 贡献指南

感谢你对 frontend-craft 插件的关注。欢迎通过 Issue 和 Pull Request 参与贡献。

## 开发环境

- Node.js >= 22（OpenClaw 插件与类型检查）
- Git

## 分支策略

- `main` — 稳定发布分支
- `develop` — 开发分支（如有）
- `feature/xxx` — 新功能
- `fix/xxx` — Bug 修复
- `docs/xxx` — 文档更新

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**type 示例：**

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档 |
| `refactor` | 重构 |
| `chore` | 构建、配置等 |

**示例：**

```
feat(skills): add e2e-testing skill
fix(hooks): resolve Windows path in run-tests.mjs
docs(readme): update installation steps
```

## 如何添加 Skill

1. 在 `skills/` 下创建目录，如 `skills/my-skill/`
2. 创建 `SKILL.md`，包含 YAML frontmatter 和正文：

```markdown
---
name: my-skill
description: 简短描述，说明何时自动激活。当用户提到 xxx 时自动激活。
version: 1.0.0
---

# 技能标题

## 适用场景
- ...

## 核心规则
- ...
```

3. 在 README 的 Skills 表格中新增一行
4. 在 README 的目录结构中补充对应条目

## 如何添加 Agent 剧本（Markdown）

1. 在 `skills/agents/` 下创建 `my-agent.md`（OpenClaw 以技能形式加载，非 Claude 子代理）
2. 使用精简 YAML frontmatter（`name`、`description`）与正文说明职责、流程与报告路径
3. 在主 README 的 Agent playbooks 表格中补充一行，并同步 **README.zh-CN.md**（及 **docs/*/README.md**，如有对应小节）

## 如何添加 Command

1. 在 `commands/` 下创建 `my-command.md`
2. 使用 YAML frontmatter 和 Markdown 描述执行步骤
3. 在 README 的 Commands 表格中新增一行

## 如何添加 Rule 模板

1. 在 `templates/rules/` 下创建 `my-rule.md`
2. 在 `commands/init.md` 的复制清单中新增该文件（若走手工初始化）
3. 在 `templates/AGENTS.md` 的「规则与扩展技能」一节中补充引用说明（如适用）

## 如何扩展插件行为（Hook / 工具）

1. 在 `src/index.ts` 中使用 `api.on("<hookName>", handler)` 注册 [OpenClaw 支持的 typed hook](https://docs.openclaw.ai/plugins/sdk-overview)
2. 可选：在 `openclaw.plugin.json` 的 `configSchema` 中增加布尔或字符串配置，并在 `register` 内读取 `api.pluginConfig`
3. 辅助逻辑可放在 `src/*.ts`；遗留的 `scripts/*.mjs` 仅作参考或 CLI 外呼，不再由 `hooks.json` 驱动

## Pull Request 流程

1. Fork 本仓库
2. 从 `main` 拉取最新代码，创建 `feature/xxx` 或 `fix/xxx` 分支
3. 完成修改，确保符合提交规范
4. 提交 PR，描述变更内容和动机
5. 等待维护者 Review，根据反馈修改
6. 合并后删除分支

## 代码风格

- Markdown：使用标准 Markdown 语法，表格对齐
- 中文与英文、数字之间加空格（如：`使用 React 18`）
- 技能描述简洁，避免冗长

## 问题反馈

- 使用 [GitHub Issues](https://github.com/bovinphang/frontend-craft-openclaw/issues) 提交 Bug 或功能建议
- 描述清晰，包含复现步骤或使用场景
