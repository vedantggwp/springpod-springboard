/**
 * One-time migration script: converts MkDocs markdown to MDX.
 *
 * Transforms:
 * 1. <details><summary>TITLE</summary>CONTENT</details> → <Collapsible title="TITLE">CONTENT</Collapsible>
 * 2. - [ ] / - [x] checkboxes → <ChecklistItem> components
 * 3. Internal .md links → extensionless links
 * 4. :material-*: / :octicons-*: icons → removed (homepage is hand-crafted)
 *
 * Usage: npx tsx scripts/convert-md-to-mdx.ts
 */

import fs from "fs";
import path from "path";

const docsDir = path.join(process.cwd(), "docs");
const contentDir = path.join(process.cwd(), "src/content");

function convertContent(content: string, filePath: string): string {
  let result = content;

  // 1. Convert <details><summary>...</summary>...</details> to <Collapsible>
  // Handle nested details by processing innermost first, repeatedly
  let prevResult = "";
  while (prevResult !== result) {
    prevResult = result;
    result = result.replace(
      /<details>\s*<summary>\s*(.*?)\s*<\/summary>([\s\S]*?)<\/details>/g,
      (_match, title: string, body: string) => {
        const trimmedBody = body.trim();
        return `<Collapsible title="${title.replace(/"/g, "&quot;")}">\n\n${trimmedBody}\n\n</Collapsible>`;
      }
    );
  }

  // 2. Convert checkbox lists to ChecklistItem components
  // Match lines like: - [ ] **text** or - [x] **text** or - [ ] text
  let checklistId = 0;
  const fileBase = path.basename(filePath, ".md").replace(/[^a-z0-9]/gi, "-");

  result = result.replace(
    /^- \[([ xX])\] (.+)$/gm,
    (_match, checked: string, label: string) => {
      checklistId++;
      const id = `${fileBase}-${checklistId}`;
      const isChecked = checked.toLowerCase() === "x";
      const cleanLabel = label.replace(/\*\*/g, "");
      return `<ChecklistItem id="${id}" label="${cleanLabel.replace(/"/g, "&quot;")}"${isChecked ? " defaultChecked" : ""} />`;
    }
  );

  // 3. Fix internal .md links → remove extension
  result = result.replace(
    /\]\(([^)]*?)\.md\)/g,
    (_match, linkPath: string) => {
      // Convert relative paths to absolute
      let resolved = linkPath;
      if (resolved.startsWith("../")) {
        resolved = resolved.replace(/^\.\.\//g, "/");
      } else if (!resolved.startsWith("/")) {
        const dir = path.dirname(filePath).replace(docsDir, "");
        resolved = `${dir}/${resolved}`;
      }
      // Normalize
      resolved = resolved.replace(/\/+/g, "/");
      if (!resolved.startsWith("/")) {
        resolved = `/${resolved}`;
      }
      return `](${resolved})`;
    }
  );

  // 4. Remove MkDocs-specific icon syntax
  result = result.replace(/:material-[a-z-]+:\{[^}]*\}\s*/g, "");
  result = result.replace(/:octicons-[a-z-]+-\d+:\s*/g, "");

  // 5. Remove <div class="grid cards" markdown> wrapper (homepage uses custom components)
  result = result.replace(/<div class="grid cards" markdown>\s*/g, "");
  result = result.replace(/<\/div>\s*/g, "");

  return result;
}

function processDirectory(dir: string, outDir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(dir, entry.name);
    const destDir = outDir;

    if (entry.isDirectory()) {
      if (entry.name === "stylesheets") continue; // Skip CSS
      const subOutDir = path.join(outDir, entry.name);
      fs.mkdirSync(subOutDir, { recursive: true });
      processDirectory(srcPath, subOutDir);
    } else if (entry.name.endsWith(".md")) {
      const content = fs.readFileSync(srcPath, "utf-8");
      const converted = convertContent(content, srcPath);
      const outName = entry.name.replace(/\.md$/, ".mdx");
      const outPath = path.join(destDir, outName);
      fs.writeFileSync(outPath, converted, "utf-8");
      console.log(`Converted: ${srcPath} → ${outPath}`);
    }
  }
}

// Handle the two reference files that are at docs root in mkdocs
// but should go to reference/ in our structure
function handleReferenceFiles() {
  const refDir = path.join(contentDir, "reference");
  fs.mkdirSync(refDir, { recursive: true });

  for (const name of ["verification-log", "version"]) {
    const srcPath = path.join(docsDir, `${name}.md`);
    if (fs.existsSync(srcPath)) {
      const content = fs.readFileSync(srcPath, "utf-8");
      const converted = convertContent(content, srcPath);
      const outPath = path.join(refDir, `${name}.mdx`);
      fs.writeFileSync(outPath, converted, "utf-8");
      console.log(`Converted (reference): ${srcPath} → ${outPath}`);
    }
  }
}

// Main
fs.mkdirSync(contentDir, { recursive: true });
processDirectory(docsDir, contentDir);
handleReferenceFiles();
console.log("\nDone! Don't forget to hand-craft src/content/index.mdx for the homepage.");
