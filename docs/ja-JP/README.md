# frontend-craft（日本語サマリー）

[![Stars](https://img.shields.io/github/stars/bovinphang/frontend-craft-openclaw?style=flat)](https://github.com/bovinphang/frontend-craft-openclaw/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

<div align="center">

[**English**](../../README.md) | [简体中文](../../README.zh-CN.md) | [繁體中文](../zh-TW/README.md) | [日本語](README.md) | [한국어](../ko-KR/README.md)

</div>

---

このリポジトリは **OpenClaw ネイティブプラグイン**です（`openclaw.plugin.json` と `src/index.ts`）。フロントエンド向けスキル、`skills/agents/` のプレイブック、任意ツール **`frontend_craft_init_workspace`**、typed hooks（危険な `exec` のブロック、任意の Prettier、ワークスペースのフレームワークヒントなど）を提供します。

**要件:** Node.js ≥ 22、OpenClaw ≥ 2026.4.20。

## インストール

[ClawHub](https://clawhub.ai) から（推奨）:

```bash
openclaw plugins install clawhub:frontend-craft
```

バージョン固定: `clawhub:frontend-craft@<version>`。

npm パッケージ名（ClawHub を優先し、なければレジストリ）:

```bash
openclaw plugins install frontend-craft
```

ローカルクローンなど（Windows ではこちらを推奨）:

```bash
# 先にパッケージ化してからインストール（pnpm symlink の EPERM 回避）:
npm install
npm run build
npm pack
openclaw plugins install ./frontend-craft-<version>.tgz

# 開発時のリンクインストール:
openclaw plugins install -l /path/to/frontend-craft
openclaw gateway restart
openclaw plugins inspect frontend-craft
```

`node_modules` が pnpm 形式の symlink 構成だと、Windows では `EPERM ... symlink ...` が発生する場合があります。

`plugins.allow` と `plugins.entries.frontend-craft` の設定を推奨します。

> `plugins.allow` に `frontend-craft` が含まれていない場合、ゲートウェイ起動時にプラグインの信頼確認プロンプト／セキュリティ警告が表示されることがあります。再起動前に allowlist へプラグイン ID を追加してください。

## 更新

ClawHub / npm で入れた場合はプラグイン id で更新:

```bash
openclaw plugins update frontend-craft
```

明示 spec の例: `openclaw plugins update clawhub:frontend-craft` や `frontend-craft@latest`。全件は `openclaw plugins update --all`、確認のみは `--dry-run`。あと `openclaw gateway restart`。

`-l` やローカルパスで入れた場合は、同じパスから再インストールしてください。

**スキルのみ** (`npx skills add …`): 該当プロジェクト（またはグローバル）で `npx skills update`。事前に `npx skills check`。詳細は [README.md](../../README.md) の更新節を参照。

## ワークスペース初期化

`templates/AGENTS.md` と `templates/rules/` を OpenClaw のエージェントワークスペース（多くは `~/.openclaw/workspace`）へコピーするか、ツール `frontend_craft_init_workspace` を使います。詳細は [README.md](../../README.md)、[commands/init.md](../../commands/init.md) を参照してください。

## MCP

[`.mcp.json`](../../.mcp.json) は参考用です。ゲートウェイ／Pi の MCP 設定へ手動でマージしてください。

## スキルとエージェントプレイブック（概要）

**スキル**: `skills/<name>/SKILL.md`。[frontend-craft](https://github.com/bovinphang/frontend-craft) プラグインと同内容。タスクが説明と一致するとエージェントが自動選択しやすい（実行環境による）。

| Skill                        | 目的                                                                    | レポート                    |
| ---------------------------- | ----------------------------------------------------------------------- | --------------------------- |
| `frontend-code-review`       | アーキテクチャ、型、レンダリング、スタイル、a11y                        | `code-review-*.md`          |
| `security-review`            | XSS、CSRF、機密漏えい、入力検証                                         | `security-review-*.md`      |
| `accessibility-check`        | WCAG 2.1 AA                                                             | `accessibility-review-*.md` |
| `react-project-standard`     | React + TypeScript（構成、コンポーネント、ルーティング、状態、API 層）  | —                           |
| `vue3-project-standard`      | Vue 3 + TypeScript（同上 + Pinia）                                      | —                           |
| `implement-from-design`      | Figma/Sketch/MasterGo/Pixso/墨刀/摹客から UI 実装                       | `design-plan-*.md`          |
| `test-and-fix`               | lint / type-check / test / build と失敗修正                             | `test-fix-*.md`             |
| `legacy-web-standard`        | JS + jQuery + HTML レガシー規約                                         | —                           |
| `legacy-to-modern-migration` | jQuery/MPA → React または Vue 3 + TS の戦略と段階的移行                 | `migration-plan-*.md`       |
| `e2e-testing`                | Playwright/Cypress：構成、Page Object、CI                               | —                           |
| `nextjs-project-standard`    | Next.js 14+ App Router、SSR/SSG、ストリーミング、メタデータ、middleware | —                           |
| `nuxt-project-standard`      | Nuxt 3 SSR/SSG、composables、データ取得、ルーティング、middleware       | —                           |
| `monorepo-project-standard`  | pnpm workspace、Turborepo、Nx                                           | —                           |

**エージェントプレイブック**: `skills/agents/*.md` は Claude Code 版のサブエージェントに相当。OpenClaw ではセッション内で読み込む Markdown であり、独立したサブエージェントではない。

| プレイブック            | 目的                                                                       | レポート                     |
| ----------------------- | -------------------------------------------------------------------------- | ---------------------------- |
| `frontend-architect`    | ページ分割、コンポーネント設計、状態フロー、ディレクトリ、大規模リファクタ | `architecture-proposal-*.md` |
| `performance-optimizer` | バンドル・描画・ネットワークのボトルネックと改善案                         | `performance-review-*.md`    |
| `ui-checker`            | UI 不具合とデザイン忠実度                                                  | `ui-fidelity-review-*.md`    |
| `figma-implementer`     | デザイン稿に沿った高忠実度 UI                                              | `design-implementation-*.md` |
| `design-token-mapper`   | デザイン変数を Design Token へマッピング                                   | `token-mapping-*.md`         |

## 全文ドキュメント

英語: [README.md](../../README.md)　中国語（簡体）: [README.zh-CN.md](../../README.zh-CN.md)

## Skills CLI（スキルのみ）

```bash
npx skills add bovinphang/frontend-craft-openclaw
```

OpenClaw プラグインのエントリや hooks は含みません。OpenClaw では `openclaw plugins install clawhub:frontend-craft` などを使用してください。
