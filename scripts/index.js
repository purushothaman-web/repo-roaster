import fs from "fs";
import path from "path";

import { roastCSS } from "./roast-css.js";
import { roastEnv } from "./roast-env.js";
import { roastEmptyDirs } from "./roast-empty-dirs.js";
import { roastTodos } from "./roast-todos.js";

// Load config safely (Node 20 compatible)
const config = JSON.parse(
  fs.readFileSync(new URL("../roaster.config.json", import.meta.url))
);

// --------------------
// Report collector
// --------------------
const report = [];

function log(message) {
  console.log(message);
  // Strip ANSI color codes before saving
  report.push(message.replace(/\x1b\[[0-9;]*m/g, ""));
}

(async () => {
  log("# 🔥 Repo Roaster Report\n");

  let issues = 0;

  issues += await roastCSS(config, log);
  issues += roastEnv(config, log);
  issues += roastEmptyDirs(config.srcDir ?? ".", config, log);
  issues += await roastTodos(config, log);

  if (issues === 0) {
    log("\n✅ **No issues found. Repo is clean. Rare discipline detected.**");
  } else {
    log(`\n❌ **Total issues found:** ${issues}`);
    log("\n> Clean your repo. Future you will thank you.");
  }

  // --------------------
  // Write report to repo
  // --------------------
  const reportsDir = "reports";
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  fs.writeFileSync(
    path.join(reportsDir, "latest-roast.md"),
    report.join("\n")
  );

  // Fail CI if issues exist (intentional)
  if (issues > 0) process.exit(1);
})();
