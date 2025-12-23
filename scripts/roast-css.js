import fs from "fs";
import { glob } from "glob";
import { roast } from "./sarcasm.js";

export async function roastCSS(config) {
  const cssFiles = await glob("**/*.css", { ignore: config.ignore });
  const jsFiles = await glob("**/*.{js,ts,jsx,tsx,html}", { ignore: config.ignore });

  const content = jsFiles.map(f => fs.readFileSync(f, "utf8")).join("");

  const unused = cssFiles.filter(css => {
    const name = css.split("/").pop().replace(".css", "");
    return !content.includes(name);
  });

  unused.forEach(f =>
    console.log(roast(`Unused CSS file: ${f}`, config.sarcasmLevel))
  );

  return unused.length;
}
