import fs from "fs";
import path from "path";
import { roast } from "./sarcasm.js";

export function roastEmptyDirs(baseDir, config) {
  if (!fs.existsSync(baseDir)) {
    console.log(
      roast(`Skipping empty folder check (no '${baseDir}' directory)`, config.sarcasmLevel)
    );
    return 0;
  }

  let count = 0;

  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (fs.readdirSync(full).length === 0) {
          console.log(roast(`Empty folder: ${full}`, config.sarcasmLevel));
          count++;
        } else {
          walk(full);
        }
      }
    });
  }

  walk(baseDir);
  return count;
}
