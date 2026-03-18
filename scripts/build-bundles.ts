/**
 * Build-time script: compiles MDX content into typed JSON bundles for SpringBoard AI.
 *
 * Reads src/content/**\/*.mdx and produces:
 *   public/policy-bundle.json
 *   public/content-bundle.json
 *   public/design-bundle.json
 *   public/tools-bundle.json
 *   public/roles-bundle.json
 *   public/prompts-bundle.json
 *   public/bundle-manifest.json
 *
 * Usage: npx tsx scripts/build-bundles.ts
 * Run as part of `npm run build` (alongside build:search and build:dates).
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";

// ── Helpers ──────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), "src/content");
const outDir = path.join(process.cwd(), "public");

function readMdx(relativePath: string): string {
  return fs.readFileSync(path.join(contentDir, relativePath), "utf-8");
}

function extractTextFromComponents(text: string): string {
  // ChecklistItem: extract label and children
  // <ChecklistItem id="..." label="Do X">Optional detail</ChecklistItem>
  // → "- [ ] Do X\n  Optional detail"
  // Also handle self-closing: <ChecklistItem id="..." label="Do X" />
  text = text.replace(
    /<ChecklistItem[^>]*\blabel="([^"]*)"[^>]*\/>/g,
    (_, label) => `- [ ] ${label}`
  );
  text = text.replace(
    /<ChecklistItem[^>]*\blabel="([^"]*)"[^>]*>([\s\S]*?)<\/ChecklistItem>/g,
    (_, label, children) => {
      const trimmed = children.trim();
      return trimmed ? `- [ ] ${label}\n  ${trimmed}` : `- [ ] ${label}`;
    }
  );

  // Collapsible: extract title and content
  // <Collapsible title="Why?" variant="why">Content</Collapsible>
  // → "**Why?**\nContent"
  text = text.replace(
    /<Collapsible[^>]*\btitle="([^"]*)"[^>]*>([\s\S]*?)<\/Collapsible>/g,
    (_, title, content) => `**${title}**\n${content.trim()}`
  );

  // StepCard: extract number, title, and content
  // <StepCard number={1} title="Do this">Detail</StepCard>
  text = text.replace(
    /<StepCard[^>]*\bnumber=\{?(\d+)\}?[^>]*\btitle="([^"]*)"[^>]*>([\s\S]*?)<\/StepCard>/g,
    (_, num, title, content) => `**Step ${num}: ${title}**\n${content.trim()}`
  );

  // DecisionStep: extract structured data
  // <DecisionStep condition="..." result="..." action="..." />
  text = text.replace(
    /<DecisionStep[^>]*\bcondition="([^"]*)"[^>]*\bresult="([^"]*)"[^>]*\baction="([^"]*)"[^>]*\/>/g,
    (_, condition, result, action) => `If ${condition} → ${result}: ${action}`
  );

  // DecisionFlow wrapper — just unwrap
  text = text.replace(/<\/?DecisionFlow>/g, "");

  // Admonition: extract type and content
  text = text.replace(
    /<Admonition[^>]*\btype="([^"]*)"[^>]*(?:\btitle="([^"]*)")?[^>]*>([\s\S]*?)<\/Admonition>/g,
    (_, type, title, content) => {
      const heading = title || type.charAt(0).toUpperCase() + type.slice(1);
      return `**${heading}:** ${content.trim()}`;
    }
  );

  // Card: extract title and content
  text = text.replace(
    /<Card[^>]*\btitle="([^"]*)"[^>]*>([\s\S]*?)<\/Card>/g,
    (_, title, content) => `**${title}**\n${content.trim()}`
  );

  // HeroBadge, CardGrid, Checklist — wrapper components, just unwrap
  text = text.replace(/<\/?(HeroBadge|CardGrid|Checklist)[^>]*>/g, "");

  // Remaining self-closing custom components — remove
  text = text.replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, "");
  // Remaining paired custom components — extract inner text
  text = text.replace(/<[A-Z][a-zA-Z]*[^>]*>([\s\S]*?)<\/[A-Z][a-zA-Z]*>/g, "$1");

  return text;
}

function stripFrontmatter(text: string): string {
  return text.replace(/^---[\s\S]*?---\n*/, "");
}

function chunkByHeading(
  text: string,
  level: number = 2
): readonly { readonly heading: string; readonly content: string }[] {
  const pattern = new RegExp(`^${"#".repeat(level)}\\s+(.+)$`, "gm");
  const chunks: { heading: string; content: string }[] = [];
  let lastIndex = 0;
  let lastHeading = "";
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (lastHeading) {
      chunks.push({
        heading: lastHeading,
        content: text.slice(lastIndex, match.index).trim(),
      });
    }
    lastHeading = match[1];
    lastIndex = match.index + match[0].length;
  }

  if (lastHeading) {
    chunks.push({
      heading: lastHeading,
      content: text.slice(lastIndex).trim(),
    });
  }

  return chunks;
}

function estimateTokens(text: string): number {
  // Rough estimate: ~4 chars per token for English text
  return Math.ceil(text.length / 4);
}

function sha256(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function getGitCommit(): string {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
}

function writeBundle(name: string, data: unknown): { hash: string; tokens: number } {
  const json = JSON.stringify(data, null, 2);
  const outPath = path.join(outDir, `${name}.json`);
  fs.writeFileSync(outPath, json, "utf-8");
  const hash = sha256(json);
  const tokens = estimateTokens(json);
  console.log(`  ${name}.json → ${tokens} tokens (sha256:${hash.slice(0, 12)})`);
  return { hash, tokens };
}

// ── Policy Bundle ────────────────────────────────────────────────────

function buildPolicyBundle() {
  const raw = readMdx("intake/project-intake.mdx");

  // Extract Q1-Q5 options → path mappings from the MDX structure.
  // The MDX uses ChecklistItem components with labels that map to answers.
  // The "How to find your build path" table defines: first option = Green, second = Yellow, etc.
  // The "I'm not sure" table defines default-upward mappings.

  const pathMappings = {
    audience: {
      internal_staff: "green",
      partners_vendors: "yellow",
      external_customers: "orange",
      students_or_minors: "red",
    },
    data_type: {
      no_real_data: "green",
      internal_business_data: "yellow",
      personal_data: "orange",
      protected_data: "red",
    },
    impact: {
      minor_inconvenience: "green",
      team_slowed: "yellow",
      external_users_affected: "orange",
      legal_safety_financial: "red",
    },
    lifespan: {
      throwaway: "green",
      ongoing_replaceable: "yellow",
      core_to_operations: "orange",
    },
    ai_role: {
      ai_built_logic_defined: "green",
      ai_generates_content: "orange",
      ai_makes_decisions: "red",
    },
  };

  // Extract "I'm not sure" defaults from the MDX table.
  // Q1: "Customers or end users" → external_customers
  // Q2: "Personal data" → personal_data
  // Q3: "External users affected" → external_users_affected
  // Q4: Not listed in "I'm not sure" table → ongoing_replaceable (conservative)
  // Q5: "Generates content" → ai_generates_content
  const unsureDefaults = {
    audience: "external_customers",
    data_type: "personal_data",
    impact: "external_users_affected",
    lifespan: "ongoing_replaceable",
    ai_role: "ai_generates_content",
  };

  return {
    version_hash: "", // filled after serialization
    built_from_commit: getGitCommit(),
    built_at: new Date().toISOString(),
    source_file: "src/content/intake/project-intake.mdx",
    path_mappings: pathMappings,
    unsure_defaults: unsureDefaults,
    path_descriptions: {
      green: "Quick Build — low-risk, self-checked",
      yellow: "Standard Build — peer-reviewed",
      orange: "Reviewed Build — technical review required",
      red: "Protected Build — designated reviewer sign-off required",
    },
    raw_source_hash: sha256(raw),
  };
}

// ── Content Bundle ───────────────────────────────────────────────────

function buildContentBundle() {
  const standardFiles = [
    "standards/branding.mdx",
    "standards/data-workflows.mdx",
    "standards/prompts.mdx",
    "standards/quality.mdx",
    "standards/safeguarding.mdx",
    "standards/security.mdx",
  ];

  const buildGuideFiles = [
    "build-guides/green-quick-build.mdx",
    "build-guides/yellow-standard-build.mdx",
    "build-guides/orange-reviewed-build.mdx",
    "build-guides/red-protected-build.mdx",
  ];

  const checklistFiles = [
    "checklists/green-checklist.mdx",
    "checklists/yellow-checklist.mdx",
    "checklists/orange-checklist.mdx",
    "checklists/red-checklist.mdx",
  ];

  const formFiles = [
    "forms/build-log.mdx",
    "forms/incident-report.mdx",
    "forms/project-brief.mdx",
    "forms/prompt-spec.mdx",
    "forms/review-request.mdx",
  ];

  const guideFiles = [
    "guides/when-to-escalate.mdx",
  ];

  function processFiles(
    files: readonly string[]
  ): readonly {
    readonly slug: string;
    readonly title: string;
    readonly chunks: readonly { readonly heading: string; readonly content: string }[];
    readonly token_count: number;
  }[] {
    return files.map((file) => {
      const raw = stripFrontmatter(readMdx(file));
      const cleaned = extractTextFromComponents(raw);
      const titleMatch = cleaned.match(/^#\s+(.+)$/m);
      const title = titleMatch?.[1] ?? file;
      const slug = file.replace(/\.mdx$/, "").replace(/\//g, "-");
      const chunks = chunkByHeading(cleaned);

      return {
        slug,
        title,
        chunks: chunks.map((c) => ({
          heading: c.heading,
          content: c.content.replace(/\n{3,}/g, "\n\n").trim(),
        })),
        token_count: estimateTokens(cleaned),
      };
    });
  }

  const standards = processFiles(standardFiles);
  const buildGuides = processFiles(buildGuideFiles);
  const checklists = processFiles(checklistFiles);
  const forms = processFiles(formFiles);
  const guides = processFiles(guideFiles);

  // Extract PECR content as a dedicated addressable chunk from security + data-workflows
  const securityRaw = extractTextFromComponents(stripFrontmatter(readMdx("standards/security.mdx")));
  const dataWorkflowsRaw = extractTextFromComponents(stripFrontmatter(readMdx("standards/data-workflows.mdx")));

  const pecrChunks: { heading: string; content: string }[] = [];
  for (const chunk of chunkByHeading(securityRaw)) {
    if (/pecr|consent|marketing|email|cookie/i.test(chunk.heading + " " + chunk.content)) {
      pecrChunks.push(chunk);
    }
  }
  for (const chunk of chunkByHeading(dataWorkflowsRaw)) {
    if (/pecr|consent|marketing|email|cookie/i.test(chunk.heading + " " + chunk.content)) {
      pecrChunks.push(chunk);
    }
  }

  return {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    standards,
    build_guides: buildGuides,
    checklists,
    forms,
    guides,
    pecr: {
      slug: "content-bundle-pecr",
      title: "PECR Compliance (extracted)",
      chunks: pecrChunks,
      token_count: estimateTokens(pecrChunks.map((c) => c.content).join("\n")),
    },
    file_count:
      standardFiles.length + buildGuideFiles.length + checklistFiles.length + formFiles.length + guideFiles.length,
  };
}

// ── Design Bundle ────────────────────────────────────────────────────

function buildDesignBundle() {
  const brandingRaw = readMdx("standards/branding.mdx");

  // Design system files
  const designFiles = ["design-system/colors.mdx", "design-system/typography.mdx", "design-system/components.mdx"];
  const designChunks = designFiles.map((file) => {
    const raw = extractTextFromComponents(stripFrontmatter(readMdx(file)));
    const slug = file.replace(/\.mdx$/, "").replace(/\//g, "-");
    return { slug, content: raw, token_count: estimateTokens(raw) };
  });

  // Token representations for the prompt composer (from design doc section 4.5)
  const tokens = {
    primary: "bg-sp-teal / text-sp-teal",
    primary_dark: "bg-sp-teal-dark",
    secondary: "bg-sp-blue / text-sp-blue",
    text: "text-sp-navy",
    text_secondary: "text-[--color-sp-text-secondary]",
    text_muted: "text-[--color-sp-text-muted]",
    background: "bg-background",
    card: "bg-card",
    border: "border-[--color-sp-border]",
    error: "text-sp-red",
    success: "text-sp-teal-dark",
    heading_font: "font-[family-name:var(--font-heading)]",
    body_font: "font-sans",
  };

  const raw = {
    primary: "#00a5ac",
    primary_dark: "#088d96",
    secondary: "#1549f4",
    text: "#16254C",
    text_secondary: "#5a6581",
    background: "#FFFFFF",
    surface: "#e0e5ea",
    error: "#FF475A",
    success: "#088d96",
    orange_accent: "#F7936F",
    purple_accent: "#7F7EFF",
    heading_font: "Poppins SemiBold 600",
    heading_sizes: ["32px", "24px", "20px"],
    body_font: "Inter Regular 400",
    body_size: "16px",
    small_size: "14px",
    ui_font: "Inter Medium 500, 14px",
  };

  // Extract tone of voice from branding standard
  const brandingCleaned = extractTextFromComponents(stripFrontmatter(brandingRaw));
  const toneChunks = chunkByHeading(brandingCleaned).filter(
    (c) => /tone|voice|ai.generated|disclosure/i.test(c.heading)
  );

  return {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    tokens,
    raw,
    tone_of_voice: toneChunks.map((c) => ({
      heading: c.heading,
      content: c.content.replace(/\n{3,}/g, "\n\n").trim(),
    })),
    design_system: designChunks,
    logo: {
      light: "/springpod-logo.svg",
      dark: "/springpod-logo-dark.svg",
      rules: "Do not stretch, rotate, recolor, or place on busy backgrounds. On dark backgrounds, use the white version.",
    },
  };
}

// ── Tools Bundle ─────────────────────────────────────────────────────

function buildToolsBundle() {
  const raw = readMdx("client-config/approved-tools.mdx");
  const cleaned = extractTextFromComponents(stripFrontmatter(raw));

  // Parse the AI coding tools table
  const aiToolsTable = cleaned.match(
    /\| Tool \| Tier \| Approved for \| Not approved for \| Notes \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const tools: {
    name: string;
    tier: string;
    approved_paths: string[];
    restricted_paths: string[];
    notes: string;
  }[] = [];

  if (aiToolsTable) {
    const rows = aiToolsTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Tool | Tier"));

    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 5) {
        const approvedText = cells[2].toLowerCase();
        const restrictedText = cells[3].toLowerCase();

        const approvedPaths: string[] = [];
        if (approvedText.includes("all")) approvedPaths.push("green", "yellow", "orange", "red");
        else {
          if (approvedText.includes("green")) approvedPaths.push("green");
          if (approvedText.includes("yellow")) approvedPaths.push("yellow");
          if (approvedText.includes("orange")) approvedPaths.push("orange");
          if (approvedText.includes("red")) approvedPaths.push("red");
        }

        const restrictedPaths: string[] = [];
        if (restrictedText.includes("orange")) restrictedPaths.push("orange");
        if (restrictedText.includes("red")) restrictedPaths.push("red");
        if (restrictedText.includes("yellow")) restrictedPaths.push("yellow");

        tools.push({
          name: cells[0],
          tier: cells[1],
          approved_paths: approvedPaths,
          restricted_paths: restrictedPaths,
          notes: cells[4],
        });
      }
    }
  }

  // Parse the other approved services table similarly
  const servicesTable = cleaned.match(
    /\| Service \| Type \| Approved for \| Notes \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const services: {
    name: string;
    type: string;
    approved_for: string;
    notes: string;
  }[] = [];

  if (servicesTable) {
    const rows = servicesTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Service | Type"));
    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 4) {
        services.push({
          name: cells[0],
          type: cells[1],
          approved_for: cells[2],
          notes: cells[3],
        });
      }
    }
  }

  // Parse not-approved tools
  const notApprovedTable = cleaned.match(
    /\| Tool \| Reason not approved \| Date evaluated \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const notApproved: { name: string; reason: string; date: string }[] = [];
  if (notApprovedTable) {
    const rows = notApprovedTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Tool | Reason"));
    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 3) {
        notApproved.push({ name: cells[0], reason: cells[1], date: cells[2] });
      }
    }
  }

  return {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    ai_coding_tools: tools,
    other_services: services,
    not_approved: notApproved,
    request_process:
      "Post in #tools-and-tech Slack channel with: tool name, intended use, build path, and whether it will touch student data. Engineering Lead reviews within 5 business days.",
  };
}

// ── Roles Bundle ─────────────────────────────────────────────────────

function buildRolesBundle() {
  const rolesConfig = readMdx("client-config/roles.mdx");
  const cleanedConfig = extractTextFromComponents(stripFrontmatter(rolesConfig));

  // Parse framework roles table
  const rolesTable = cleanedConfig.match(
    /\| Role \| Person \| Contact \| Responsibilities \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const contacts: {
    role: string;
    person: string;
    contact: string;
    responsibilities: string;
  }[] = [];

  if (rolesTable) {
    const rows = rolesTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Role | Person"));
    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim().replace(/\*\*/g, ""))
        .filter(Boolean);
      if (cells.length >= 4) {
        contacts.push({
          role: cells[0],
          person: cells[1],
          contact: cells[2],
          responsibilities: cells[3],
        });
      }
    }
  }

  // Parse review requirements table
  const reviewTable = cleanedConfig.match(
    /\| Build path \| Reviewer role \| What they check \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const reviewRequirements: {
    build_path: string;
    reviewer_role: string;
    checks: string;
  }[] = [];

  if (reviewTable) {
    const rows = reviewTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Build path | Reviewer"));
    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim().replace(/\*\*/g, ""))
        .filter(Boolean);
      if (cells.length >= 3) {
        reviewRequirements.push({
          build_path: cells[0].toLowerCase().split("(")[0].trim(),
          reviewer_role: cells[1],
          checks: cells[2],
        });
      }
    }
  }

  // Parse response time table
  const responseTable = cleanedConfig.match(
    /\| Role \| Expected response time \|[\s\S]*?(?=\n\n|\n---|\n##)/
  );

  const responseTimes: { role: string; time: string }[] = [];
  if (responseTable) {
    const rows = responseTable[0].split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Role | Expected"));
    for (const row of rows) {
      const cells = row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 2) {
        responseTimes.push({ role: cells[0], time: cells[1] });
      }
    }
  }

  // Parse role-specific guidance from src/content/roles/*.mdx
  const roleFiles = [
    "roles/curriculum-designer.mdx",
    "roles/leadership.mdx",
    "roles/marketing.mdx",
    "roles/ops-partnerships.mdx",
    "roles/product-engineering.mdx",
  ];

  const roleGuidance = roleFiles.map((file) => {
    const raw = extractTextFromComponents(stripFrontmatter(readMdx(file)));
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const slug = path.basename(file, ".mdx");
    return {
      slug,
      title: titleMatch?.[1] ?? slug,
      content: raw.replace(/\n{3,}/g, "\n\n").trim(),
      token_count: estimateTokens(raw),
    };
  });

  return {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    contacts,
    review_requirements: reviewRequirements,
    response_times: responseTimes,
    role_guidance: roleGuidance,
    escalation_path: [
      "1. Check framework docs yourself",
      "2. Building question → Framework contact",
      "3. Security or data concern → Technical reviewer",
      "4. Compliance, legal, or safety → Designated reviewer",
      "5. Something broken in live tool → Emergency contact + Incident Report",
    ],
  };
}

// ── Prompts Bundle ───────────────────────────────────────────────────

function buildPromptsBundle() {
  const raw = readMdx("client-config/prompt-library.mdx");
  const cleaned = extractTextFromComponents(stripFrontmatter(raw));

  // Extract each prompt template (identified by ## or ### headings followed by code blocks)
  const promptPattern = /###?\s+(.+?)(?:\n[\s\S]*?)?```([\s\S]*?)```/g;
  const templates: {
    name: string;
    task_type_match: string | null;
    content: string;
    token_count: number;
  }[] = [];

  // Map template names to task types
  const taskTypeMap: Record<string, string> = {
    "Internal dashboard": "dashboard",
    "Data entry form": "data_entry_form",
    "Branded landing page": "landing_page",
    "Student-facing content page (Red path)": "student_facing_feature",
    "Virtual Work Experience module page": "vwe_module",
    "Employer impact dashboard": "employer_dashboard",
    "AI Interview Coach system prompt": "ai_chatbot",
    "School partnership report": "school_report",
  };

  let match: RegExpExecArray | null;
  while ((match = promptPattern.exec(cleaned)) !== null) {
    const name = match[1].trim();
    const content = match[2].trim();

    // Skip non-prompt headings
    if (name === "How to use these prompts" || name === "How to add to this library" || name === "Related documents") {
      continue;
    }

    templates.push({
      name,
      task_type_match: taskTypeMap[name] ?? null,
      content,
      token_count: estimateTokens(content),
    });
  }

  return {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    templates,
    usage_instructions:
      "Find a template matching the task type, copy it, replace [bracketed] placeholders with specifics.",
  };
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log("Building SpringBoard AI bundles...\n");

  const policyData = buildPolicyBundle();
  const policy = writeBundle("policy-bundle", policyData);

  // Update the version_hash after writing (chicken-and-egg: hash includes the hash field)
  const policyWithHash = { ...policyData, version_hash: `sha256:${policy.hash}` };
  writeBundle("policy-bundle", policyWithHash);

  const content = writeBundle("content-bundle", buildContentBundle());
  const design = writeBundle("design-bundle", buildDesignBundle());
  const tools = writeBundle("tools-bundle", buildToolsBundle());
  const roles = writeBundle("roles-bundle", buildRolesBundle());
  const prompts = writeBundle("prompts-bundle", buildPromptsBundle());

  // Bundle manifest
  const manifest = {
    built_at: new Date().toISOString(),
    built_from_commit: getGitCommit(),
    bundles: {
      policy: { hash: `sha256:${policy.hash}`, tokens: policy.tokens },
      content: { hash: `sha256:${content.hash}`, tokens: content.tokens },
      design: { hash: `sha256:${design.hash}`, tokens: design.tokens },
      tools: { hash: `sha256:${tools.hash}`, tokens: tools.tokens },
      roles: { hash: `sha256:${roles.hash}`, tokens: roles.tokens },
      prompts: { hash: `sha256:${prompts.hash}`, tokens: prompts.tokens },
    },
    total_tokens:
      policy.tokens + content.tokens + design.tokens + tools.tokens + roles.tokens + prompts.tokens,
  };

  writeBundle("bundle-manifest", manifest);

  console.log(`\nDone. Total: ${manifest.total_tokens} tokens across 6 bundles.`);
}

main();
