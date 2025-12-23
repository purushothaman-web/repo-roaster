import fs from "fs";
import { glob } from "glob";
import { roast } from "./sarcasm.js";

export async function roastTodos(config) {
  const files = await glob("**/*.{js,ts,jsx,tsx}", { ignore: config.ignore });
  const now = Date.now();
  let count = 0;

  files.forEach(file => {
    const stats = fs.statSync(file);
    const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

    if (ageDays > config.todoMaxAgeDays) {
      const content = fs.readFileSync(file, "utf8");
      if (content.includes("TODO")) {
        console.log(
          roast(`TODO left for ${Math.floor(ageDays)} days in ${file}`, config.sarcasmLevel)
        );
        count++;
      }
    }
  });

  return count;
}
