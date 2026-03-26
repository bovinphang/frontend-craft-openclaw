import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const FORMATTABLE = /\.(js|jsx|ts|tsx|vue|css|scss|less|json|md|html)$/;

export function tryPrettierWrite(absPath: string): void {
  if (!absPath || !existsSync(absPath)) return;
  if (!FORMATTABLE.test(absPath)) return;
  try {
    execSync(`npx prettier --write "${absPath.replace(/"/g, '\\"')}"`, {
      stdio: "ignore",
    });
  } catch {
    // prettier missing or failed — non-blocking
  }
}

export function pathFromWriteLikeParams(
  toolName: string,
  params: Record<string, unknown> | undefined,
): string {
  if (!params) return "";
  const p =
    params.path ?? params.file_path ?? params.filePath ?? params.target_file;
  return typeof p === "string" ? p.trim() : "";
}
