import { execSync } from "node:child_process";

const blockedFilePattern = /\.(ts|tsx|d\.ts|map)$/i;

function getPackFiles() {
    const output = execSync("npm pack --dry-run --json --ignore-scripts", {
        encoding: "utf8"
    });
    const parsed = JSON.parse(output);
    const packEntry = parsed?.[0];
    const files = packEntry?.files?.map((file) => file.path) ?? [];
    return files;
}

function main() {
    const files = getPackFiles();
    const blockedFiles = files.filter((filePath) => blockedFilePattern.test(filePath));

    if (blockedFiles.length > 0) {
        console.error("[verify-pack-artifacts] Found blocked files in npm package:");
        for (const filePath of blockedFiles) {
            console.error(` - ${filePath}`);
        }
        process.exit(1);
    }

    console.log(`[verify-pack-artifacts] OK: checked ${files.length} files, no blocked suffix found.`);
}

main();
