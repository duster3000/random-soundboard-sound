import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const functionSource = await readFile(new URL("./fetch-url.mjs", import.meta.url), "utf8");
assert.match(functionSource, /allowedHosts/);
assert.match(functionSource, /parsedTarget\.protocol !== "https:"/);
assert.match(functionSource, /allowedHosts\.has\(parsedTarget\.hostname\)/);
assert.doesNotMatch(functionSource, /corsproxy\.io/);
console.log("Netlify proxy configuration checks passed.");
