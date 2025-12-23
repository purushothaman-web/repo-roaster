import fs from "fs";
import config from "../roaster.config.json" assert { type: "json" };

import { roastCSS } from "./roast-css.js";
import { roastEnv } from "./roast-env.js";
import { roastEmptyDirs } from "./roast-empty-dirs.js";
import { roastTodos } from "./roast-todos.js";

(async () => {
  console.log("\n🔥 REPO ROASTER INITIATED 🔥\n");

  let issues = 0;
  issues += await roastCSS(config);
  issues += roastEnv(config);
  issues += roastEmptyDirs(config.srcDir, config);
  issues += await roastTodos(config);

  if (issues > 0) {
    console.log(`\n🔥 Found ${issues} hygiene issues. Clean your repo.`);
    process.exit(1);
  } else {
    console.log("✨ Repo is clean. Rare discipline detected.");
  }
})();
