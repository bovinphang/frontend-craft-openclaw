import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const blockedFilePattern = /\.(ts|tsx|d\.ts|map)$/i;
const sourceMapReferencePattern = /\/\/# sourceMappingURL=|\/\*# sourceMappingURL=/i;

function walk(root) {
  const out = [];
  if (!existsSync(root)) return out;
  const entries = readdirSync(root);
  for (const name of entries) {
    const abs = join(root, name);
    const st = statSync(abs);
    if (st.isDirectory()) out.push(...walk(abs));
    else out.push(abs);
  }
  return out;
}

function main() {
  const cwd = process.cwd();
  const required = ["dist", "skills", "commands", "templates", ".mcp.json", "openclaw.plugin.json", "README.md", "README.zh-CN.md"];
  const missing = required.filter((name) => !existsSync(join(cwd, name)));
  if (missing.length > 0) {
    console.error("[verify-pack-artifacts] Missing required publish artifacts:");
    for (const name of missing) console.error(` - ${name}`);
    process.exit(1);
  }

  const files = [
    ...walk(join(cwd, "dist")),
    ...walk(join(cwd, "skills")),
    ...walk(join(cwd, "commands")),
    ...walk(join(cwd, "templates")),
    join(cwd, ".mcp.json"),
    join(cwd, "openclaw.plugin.json"),
    join(cwd, "README.md"),
    join(cwd, "README.zh-CN.md"),
  ].map((file) => relative(cwd, file));

  const blockedFiles = files.filter((filePath) => blockedFilePattern.test(filePath));
  if (blockedFiles.length > 0) {
    console.error("[verify-pack-artifacts] Found blocked files in publish artifacts:");
    for (const filePath of blockedFiles) console.error(` - ${filePath}`);
    process.exit(1);
  }

  const compactnessIssues = [];
  const distAssets = files.filter((filePath) => /^dist\/.+\.(js|css)$/i.test(filePath));
  for (const filePath of distAssets) {
    const content = readFileSync(join(cwd, filePath), "utf8");
    if (sourceMapReferencePattern.test(content)) {
      compactnessIssues.push(`${filePath}: contains source map reference`);
      continue;
    }

    const lines = content.split(/\r?\n/).length;
    if (lines > 20) {
      compactnessIssues.push(`${filePath}: expected minified output, got ${lines} lines`);
    }
  }

  if (compactnessIssues.length > 0) {
    console.error("[verify-pack-artifacts] Found unminified or source-leaking dist assets:");
    for (const issue of compactnessIssues) console.error(` - ${issue}`);
    process.exit(1);
  }

  console.log(
    `[verify-pack-artifacts] OK: checked ${files.length} files, no blocked suffix or source leakage found.`,
  );
}

main();
