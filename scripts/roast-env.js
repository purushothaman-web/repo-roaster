import fs from "fs";
import { roast } from "./sarcasm.js";

export function roastEnv(config) {
  if (!fs.existsSync(config.envFile)) return 0;

  const envVars = fs
    .readFileSync(config.envFile, "utf8")
    .split("\n")
    .filter(l => l && !l.startsWith("#"))
    .map(l => l.split("=")[0]);

  const code = fs.readFileSync("src/index.js", "utf8");

  const unused = envVars.filter(v => !code.includes(v));

  unused.forEach(v =>
    console.log(roast(`ENV var ${v} is never used`, config.sarcasmLevel))
  );

  return unused.length;
}
