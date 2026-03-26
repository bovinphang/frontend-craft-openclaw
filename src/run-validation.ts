import { existsSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";

/**
 * Best-effort lint/typecheck/test/build using package.json scripts (cwd = project root).
 */
export function runPackageValidation(cwd: string): void {
  if (!existsSync(`${cwd}/package.json`)) return;
  let scripts: Record<string, string> = {};
  try {
    const pkg = JSON.parse(readFileSync(`${cwd}/package.json`, "utf-8")) as {
      scripts?: Record<string, string>;
    };
    scripts = pkg.scripts ?? {};
  } catch {
    return;
  }

  let runner = "npm";
  if (existsSync(`${cwd}/pnpm-lock.yaml`)) runner = "pnpm";
  else if (existsSync(`${cwd}/yarn.lock`)) runner = "yarn";

  const runIfExists = (name: string) => {
    if (!scripts[name]) return;
    try {
      execSync(`${runner} run ${name}`, {
        cwd,
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 120_000,
      });
    } catch {
      /* continue */
    }
  };

  runIfExists("lint");
  if (scripts["type-check"]) runIfExists("type-check");
  else runIfExists("typecheck");
  runIfExists("test");
  runIfExists("build");
}
