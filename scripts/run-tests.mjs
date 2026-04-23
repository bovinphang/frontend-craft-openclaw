import { existsSync, readFileSync } from "node:fs";

function main() {
  const pkgPath = new URL("../package.json", import.meta.url);
  if (!existsSync(pkgPath)) {
    console.error("[run-tests] package.json not found.");
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const scripts = pkg?.scripts ?? {};
  const candidates = ["lint", "type-check", "typecheck", "test", "build"];
  const available = candidates.filter((name) => typeof scripts[name] === "string");

  console.log("[run-tests] Safe advisory mode.");
  if (available.length === 0) {
    console.log("No validation scripts detected in package.json.");
    return;
  }

  console.log("Detected validation scripts:");
  for (const name of available) {
    console.log(`- ${name}: ${scripts[name]}`);
  }
  console.log("Run them manually in your shell if needed.");
}

main();
