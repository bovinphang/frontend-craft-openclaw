import { stdin } from "node:process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const chunks = [];
for await (const chunk of stdin) chunks.push(chunk);
const input = Buffer.concat(chunks).toString();

let filePath = "";
try {
  const data = JSON.parse(input);
  filePath = data?.tool_input?.file_path ?? data?.tool_input?.filePath ?? "";
} catch {
  process.exit(0);
}

if (!filePath || !existsSync(filePath)) process.exit(0);

const formattable = /\.(js|jsx|ts|tsx|vue|css|scss|less|json|md|html)$/;
if (!formattable.test(filePath)) process.exit(0);

try {
  const prettier = await import("prettier");
  const src = readFileSync(filePath, "utf8");
  const out = await prettier.format(src, { filepath: filePath });
  writeFileSync(filePath, out);
} catch {
  // prettier not available or failed, not blocking
}

process.exit(0);
