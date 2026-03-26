import { execSync } from "node:child_process";
import { platform } from "node:os";

export function notifyTaskComplete(title = "OpenClaw", body = "任务完成"): void {
  const os = platform();
  try {
    if (os === "darwin") {
      execSync(
        `osascript -e 'display notification "${body.replace(/'/g, "'\\''")}" with title "${title.replace(/'/g, "'\\''")}"'`,
        { stdio: "ignore" },
      );
    } else if (os === "linux") {
      execSync(`notify-send "${title}" "${body}"`, { stdio: "ignore" });
    } else if (os === "win32") {
      execSync(
        `powershell -NoProfile -Command "[console]::beep(600,300); Write-Host '${body.replace(/'/g, "''")}'"`,
        { stdio: "ignore" },
      );
    }
  } catch {
    // optional
  }
}
