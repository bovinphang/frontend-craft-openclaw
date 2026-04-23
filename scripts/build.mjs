import { mkdir } from "node:fs/promises";
import { build } from "esbuild";

async function main() {
  await mkdir("dist", { recursive: true });

  await build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    format: "esm",
    platform: "node",
    target: ["node22"],
    minify: true,
    sourcemap: false,
    sourcesContent: false,
    legalComments: "none",
    charset: "utf8",
    logLevel: "info",
    external: ["openclaw"],
  });
}

main().catch((error) => {
  console.error("[build] failed");
  console.error(error);
  process.exit(1);
});
