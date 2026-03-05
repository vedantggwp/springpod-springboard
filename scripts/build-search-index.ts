/**
 * Build-time script: generates public/search-index.json for client-side search.
 *
 * Usage: npx tsx scripts/build-search-index.ts
 * Run before `next build` or in CI.
 */

import fs from "fs";
import path from "path";
import { buildSearchIndex } from "../src/lib/search-index";

const outPath = path.join(process.cwd(), "public/search-index.json");
const index = buildSearchIndex();
fs.writeFileSync(outPath, JSON.stringify(index), "utf-8");
console.log(`Search index built: ${index.length} entries → ${outPath}`);
