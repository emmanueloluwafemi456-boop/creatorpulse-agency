import { writeFile } from "node:fs/promises";
await writeFile(
  new URL("../dist/.nojekyll", import.meta.url),
  "Static single-page site; no Jekyll processing required.\n",
);
