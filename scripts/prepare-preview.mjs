import { readFile, writeFile, mkdir } from "node:fs/promises";
// Publish a directory-style URL as well as the standalone HTML preview.
const preview = await readFile(
  new URL("../dist/work-section-concept.html", import.meta.url),
  "utf8",
);
await mkdir(new URL("../dist/preview/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../dist/preview/index.html", import.meta.url),
  preview.replaceAll('href="./#work"', 'href="../#work"'),
);
await writeFile(new URL("../dist/.nojekyll", import.meta.url), "");
