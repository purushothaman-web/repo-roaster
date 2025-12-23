import fs from "fs";
import { glob } from "glob";
import { roast } from "./sarcasm.js";

export async function roastCSS(config, log) {
  const cssFiles = await glob("**/*.css", { ignore: config.ignore });
  const jsFiles = await glob("**/*.{js,ts,jsx,tsx,html}", { ignore: config.ignore });

  const content = jsFiles.map(f => fs.readFileSync(f, "utf8")).join("");
  let count = 0;

  cssFiles.forEach(css => {
    const name = css.split("/").pop().replace(".css", "");
    if (!content.includes(name)) {
      log(roast(`- Unused CSS file: \`${css}\``, config.sarcasmLevel));
      count++;
    }
  });

  return count;
}
