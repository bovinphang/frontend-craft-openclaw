process.stdin.resume();
process.stdin.on("data", () => {});

try {
  process.stdout.write("\x07");
} catch {
  /* optional */
}
try {
  process.stderr.write("[OpenClaw] OpenClaw 任务完成\n");
} catch {
  /* optional */
}

process.exit(0);
