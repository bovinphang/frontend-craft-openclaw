# frontend-craft（한국어 요약）

[![Stars](https://img.shields.io/github/stars/bovinphang/frontend-craft-openclaw?style=flat)](https://github.com/bovinphang/frontend-craft-openclaw/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

---

<div align="center">

[**English**](../../README.md) | [简体中文](../../README.zh-CN.md) | [繁體中文](../zh-TW/README.md) | [日本語](../ja-JP/README.md) | [한국어](README.md)

</div>

---

이 저장소는 **OpenClaw 네이티브 플러그인**입니다(`openclaw.plugin.json`, `src/index.ts`). 프론트엔드 워크플로 스킬, `skills/agents/` 플레이북, 선택 도구 **`frontend_craft_init_workspace`**, typed hooks(위험한 `exec` 차단, 선택적 Prettier, 워크스페이스 힌트 등)를 제공합니다.

**요구 사항:** Node.js ≥ 22, OpenClaw ≥ 2026.4.20.

## 설치

[ClawHub](https://clawhub.ai)에서 설치(권장):

```bash
openclaw plugins install clawhub:frontend-craft
```

버전 고정: `clawhub:frontend-craft@<version>`.

npm 패키지 이름(ClawHub를 먼저 조회한 뒤 레지스트리):

```bash
openclaw plugins install frontend-craft
```

로컬 클론 등(Windows에서는 이 방식 권장):

```bash
# 먼저 패키징 후 설치(pnpm symlink 복사 EPERM 회피):
npm install
npm run build
npm pack
openclaw plugins install ./frontend-craft-<version>.tgz

# 개발용 링크 설치:
openclaw plugins install -l /path/to/frontend-craft
openclaw gateway restart
openclaw plugins inspect frontend-craft
```

`node_modules`가 pnpm symlink 구조인 로컬 디렉터리를 직접 설치하면 Windows에서 `EPERM ... symlink ...`가 날 수 있습니다.

`plugins.allow` 및 `plugins.entries.frontend-craft` 설정을 권장합니다.

> `plugins.allow`에 `frontend-craft`가 없으면 게이트웨이 시작 시 플러그인 신뢰 확인 프롬프트/보안 경고가 나타날 수 있습니다. 게이트웨이를 재시작하기 전에 allowlist에 플러그인 ID를 추가하세요.

## 업데이트

ClawHub / npm으로 설치한 경우 플러그인 id로 업데이트:

```bash
openclaw plugins update frontend-craft
```

명시 spec 예: `openclaw plugins update clawhub:frontend-craft`, `frontend-craft@latest`. 전체는 `openclaw plugins update --all`, 미리보기는 `--dry-run`. 이후 `openclaw gateway restart`.

`-l` 또는 로컬 경로 설치는 동일 경로에서 다시 설치하세요.

**스킬만** (`npx skills add …`): 해당 프로젝트(또는 전역)에서 `npx skills update`. 사전에 `npx skills check`. 자세한 내용은 [README.md](../../README.md) 업데이트 절을 참고하세요.

## 워크스페이스 초기화

`templates/AGENTS.md` 및 `templates/rules/`를 OpenClaw 에이전트 워크스페이스(보통 `~/.openclaw/workspace`)로 복사하거나 `frontend_craft_init_workspace` 도구를 사용하세요. 자세한 내용은 [README.md](../../README.md), [commands/init.md](../../commands/init.md)를 참고하세요.

## MCP

[`.mcp.json`](../../.mcp.json)은 참고용이며, 게이트웨이/Pi MCP 설정에 수동으로 병합해야 합니다.

## 스킬 및 에이전트 플레이북(요약)

**스킬**: `skills/<이름>/SKILL.md`. [frontend-craft](https://github.com/bovinphang/frontend-craft) 플러그인과 동일. 작업 설명이 스킬과 맞으면 에이전트가 자동 선택하기 쉬움(환경에 따라 다름).

| Skill                        | 목적                                                              | 리포트                      |
| ---------------------------- | ----------------------------------------------------------------- | --------------------------- |
| `frontend-code-review`       | 아키텍처, 타입, 렌더링, 스타일, 접근성                            | `code-review-*.md`          |
| `security-review`            | XSS, CSRF, 민감 정보 유출, 입력 검증                              | `security-review-*.md`      |
| `accessibility-check`        | WCAG 2.1 AA                                                       | `accessibility-review-*.md` |
| `react-project-standard`     | React + TypeScript(구조, 컴포넌트, 라우팅, 상태, API 레이어)      | —                           |
| `vue3-project-standard`      | Vue 3 + TypeScript(동일 + Pinia)                                  | —                           |
| `implement-from-design`      | Figma/Sketch/MasterGo/Pixso/墨刀/摹客 기반 UI 구현                | `design-plan-*.md`          |
| `test-and-fix`               | lint, type-check, test, build 및 실패 수정                        | `test-fix-*.md`             |
| `legacy-web-standard`        | JS + jQuery + HTML 레거시 규약                                    | —                           |
| `legacy-to-modern-migration` | jQuery/MPA → React 또는 Vue 3 + TS 전략·단계                      | `migration-plan-*.md`       |
| `e2e-testing`                | Playwright/Cypress: 구조, Page Object, CI                         | —                           |
| `nextjs-project-standard`    | Next.js 14+ App Router, SSR/SSG, 스트리밍, 메타데이터, middleware | —                           |
| `nuxt-project-standard`      | Nuxt 3 SSR/SSG, composables, 데이터 페칭, 라우팅, middleware      | —                           |
| `monorepo-project-standard`  | pnpm workspace, Turborepo, Nx                                     | —                           |

**에이전트 플레이북**: `skills/agents/*.md`는 Claude Code 플러그인의 서브 에이전트 역할과 대응. OpenClaw에서는 세션에서 불러 쓰는 Markdown이며 별도 서브 에이전트 프로세스가 아님.

| 플레이북                | 목적                                                               | 리포트                       |
| ----------------------- | ------------------------------------------------------------------ | ---------------------------- |
| `frontend-architect`    | 페이지 분할, 컴포넌트 아키텍처, 상태 흐름, 디렉터리, 대규모 리팩터 | `architecture-proposal-*.md` |
| `performance-optimizer` | 번들·렌더·네트워크 병목과 정량적 개선안                            | `performance-review-*.md`    |
| `ui-checker`            | UI 결함과 디자인 충실도                                            | `ui-fidelity-review-*.md`    |
| `figma-implementer`     | 디자인 시안에 맞춘 고충실도 UI                                     | `design-implementation-*.md` |
| `design-token-mapper`   | 디자인 변수를 Design Token에 매핑                                  | `token-mapping-*.md`         |

## 전체 문서

영어: [README.md](../../README.md)　간체中文: [README.zh-CN.md](../../README.zh-CN.md)

## Skills CLI(스킬만)

```bash
npx skills add bovinphang/frontend-craft-openclaw
```

OpenClaw 플러그인 엔트리와 hooks는 포함되지 않습니다. OpenClaw 전체 플러그인은 `openclaw plugins install clawhub:frontend-craft` 등을 사용하세요.
