import fs from "fs";
import path from "path";

const reportsDir = "reports";
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

fs.writeFileSync(
  path.join(reportsDir, "latest-roast.md"),
  report.join("\n")
);
