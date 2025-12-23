import fs from "fs";
import path from "path";
import { roast } from "./sarcasm.js";

function isEmpty(dir) {
  return fs.readdirSync(dir).length === 0;
}

export function roastEmptyDirs(baseDir, config) {
  let count = 0;

  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        if (isEmpty(full)) {
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
