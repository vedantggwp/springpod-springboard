# Phase 2: CI/CD and Live Hosting - Research

**Researched:** 2026-03-05
**Domain:** GitHub Actions, MkDocs deployment, GitHub Pages, branch protection
**Confidence:** HIGH (CI/CD and Pages mechanics) / MEDIUM (HOST-02 constraint — see Critical Finding below)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CICD-01 | GitHub Actions workflow builds MkDocs site on push to main | Official MkDocs Material workflow verified; uses `pip install -r requirements.txt` + `mkdocs gh-deploy` |
| CICD-02 | GitHub Actions workflow deploys built site to GitHub Pages automatically | `mkdocs gh-deploy --force` commits to `gh-pages` branch and pushes; Pages serves from that branch |
| CICD-03 | Build failure prevents deployment (workflow fails visibly) | GitHub Actions exits non-zero on `mkdocs build` / `mkdocs gh-deploy` error; deploy step never runs if build fails |
| HOST-01 | Site accessible at GitHub Pages URL (`vedantggwp.github.io/SP-VibeFrame`) | Enabled by configuring repo Pages settings to serve from `gh-pages` branch; works with GitHub Pro + private repo |
| HOST-02 | Site is private — only repository collaborators can view it | **CRITICAL GAP**: True access-controlled private Pages requires GitHub Enterprise Cloud, NOT GitHub Pro personal accounts. The published site will be publicly accessible even from a private repo. See HOST-02 section below. |
| QUAL-01 | Branch protection on main requires CI to pass before merge | Available for personal repos via GitHub web UI or REST API; must configure after at least one successful workflow run |
</phase_requirements>

---

## Summary

This phase wires up the complete GitHub Actions CI/CD pipeline for MkDocs Material, deploys to GitHub Pages, and adds branch protection. The CI/CD mechanics (CICD-01, CICD-02, CICD-03, HOST-01, QUAL-01) are well-understood and straightforward with a standard workflow file.

**Critical finding on HOST-02:** The requirement "site is private — only repository collaborators can view it" cannot be met natively with GitHub Pages on a personal GitHub Pro account. Access-controlled ("privately published") GitHub Pages is an **Enterprise Cloud-only feature** for organizations. With GitHub Pro + personal account: you can host a Pages site from a private repo, but the published URL is publicly accessible to anyone on the internet. This is confirmed by current GitHub Docs (`docs.github.com/en/enterprise-cloud@latest/pages/...`) and multiple community discussions (2024–2025). The planner must address this gap — either accept the limitation, use a client-side workaround (StatiCrypt), or choose a different hosting path for HOST-02.

The workflow structure is: push to main → GitHub Actions builds MkDocs → `mkdocs gh-deploy --force` pushes to `gh-pages` branch → Pages serves from `gh-pages`. A bad `mkdocs.yml` causes `mkdocs gh-deploy` to exit non-zero, failing the workflow before any deployment occurs (CICD-03 is inherently satisfied by this flow).

**Primary recommendation:** Create `.github/workflows/ci.yml` using the official MkDocs Material workflow pattern, pin to `requirements.txt` for reproducible builds, enable Pages in repo settings via `gh api`, and set branch protection via the GitHub REST API after first successful run. For HOST-02, surface the gap to the user and recommend accepting public visibility or using StatiCrypt as a client-side workaround.

---

## HOST-02: Critical Constraint — Private GitHub Pages

### What the User Expects
The requirement says: "Site is private — only repository collaborators can view it."

### What Is Actually Available on GitHub Pro (Personal)

| Plan | Pages from Private Repo | Access-Controlled (Private) Pages |
|------|------------------------|----------------------------------|
| GitHub Free | No | No |
| GitHub Pro (personal) | **Yes** — Pages works from private repos | **No** — the published site is publicly accessible |
| GitHub Enterprise Cloud (org) | Yes | Yes — "privately published" with collaborator gate |

**Source:** [docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) — confirms the feature requires Enterprise Cloud organization.

### Options for the Planner

**Option A: Accept Public Visibility (simplest)**
- Keep repo private (source code not visible)
- Published site at `vedantggwp.github.io/SP-VibeFrame` is publicly accessible
- "Private" for this peer-review phase means the URL is obscure, not access-controlled
- Risk: anyone with the URL can read the site content

**Option B: StatiCrypt Password Protection (pragmatic workaround)**
- Add `staticrypt` step in GitHub Actions after `mkdocs gh-deploy`
- Encrypts all HTML pages with AES-256, decrypted client-side via JS
- Users must enter a password to view any page
- Not true authentication — brute-forceable, but sufficient for casual peer review
- npm package: `staticrypt` (robinmoisson/staticrypt)
- Adds complexity to the CI pipeline

**Option C: Alternative Hosting with Auth (out of current scope)**
- Cloudflare Pages + Cloudflare Access (free tier, GitHub OAuth login)
- Netlify + Netlify Identity or password protection
- These require different hosting setup, diverge from the locked decision of "GitHub Pages"

**Planner decision point:** The locked decision from STATE.md is "GitHub Pages over Vercel/Netlify" and "private access via GitHub repo permissions." Research shows the GitHub repo permissions approach cannot gate the published Pages site for personal accounts. The planner must either flag this to the user or select Option A or B within GitHub Pages constraints.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| GitHub Actions | N/A (hosted) | CI/CD runner | Already chosen; standard MkDocs deployment platform |
| mkdocs | 1.6.1 | Build tool | Already installed and pinned in requirements.txt |
| mkdocs-material | 9.7.4 | Theme | Already installed and pinned in requirements.txt |
| actions/checkout | v4 | Checkout code in CI | Current latest stable; official GitHub action |
| actions/setup-python | v5 | Set up Python 3.x in CI | Current latest stable; official GitHub action |
| actions/cache | v4 | Cache pip dependencies | Current latest stable; reduces CI build time |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| `mkdocs gh-deploy` | Build + deploy to gh-pages in one command | The deploy step in the workflow |
| `gh api` | Configure GitHub Pages source, branch protection | Setup tasks that lack dedicated `gh` subcommands |
| StatiCrypt (staticrypt npm) | Client-side password protection | Only if HOST-02 workaround is chosen (Option B) |

### What NOT to Use
| Instead of | Don't Use | Reason |
|------------|-----------|--------|
| `pip install mkdocs-material` (bare) | Default MkDocs Material docs example | Use `pip install -r requirements.txt` to respect pinned versions already in the repo |
| `actions/upload-pages-artifact` + `actions/deploy-pages` | Two-job Pages Actions approach | Overkill for MkDocs; `mkdocs gh-deploy` handles both build and push to gh-pages in one step |
| `peaceiris/actions-gh-pages` | Third-party deploy action | Unnecessary; `mkdocs gh-deploy --force` is the official, direct method |

**Installation (CI pip step):**
```bash
pip install -r requirements.txt
```
Use `requirements.txt` — not bare `pip install mkdocs-material` — to get the exact pinned versions.

---

## Architecture Patterns

### Recommended File Structure
```
SP-VibeFrame/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions workflow (CICD-01, CICD-02, CICD-03)
├── docs/                    # MkDocs content (existing)
├── mkdocs.yml               # MkDocs config (existing)
├── requirements.txt         # Pinned deps (existing, from Phase 1)
└── .gitignore               # Excludes site/ (existing)
```

The `gh-pages` branch is created automatically by `mkdocs gh-deploy` on first run. It should NOT be created manually beforehand.

### Pattern 1: Official MkDocs Material GitHub Actions Workflow

**What:** Checkout → setup Python → cache pip → install deps from requirements.txt → mkdocs gh-deploy
**When to use:** This is the only pattern needed. Use it exactly.

```yaml
# Source: https://squidfunk.github.io/mkdocs-material/publishing-your-site/
# Modified to use requirements.txt instead of bare pip install mkdocs-material
name: ci
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: ~/.cache
          restore-keys: |
            mkdocs-material-
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force
```

Key difference from official docs: `pip install -r requirements.txt` instead of `pip install mkdocs-material`. This ensures the exact pinned versions from Phase 1 are used.

### Pattern 2: Enable GitHub Pages via API

GitHub Pages cannot be enabled by a first `mkdocs gh-deploy` push alone — the repo settings must be configured to serve from the `gh-pages` branch. There is no dedicated `gh pages` CLI subcommand; use `gh api`.

```bash
# Source: GitHub REST API docs + community discussion #51268
# Configure Pages to deploy from gh-pages branch
gh api -X PUT "repos/vedantggwp/SP-VibeFrame/pages" \
  -f source='{"branch":"gh-pages","path":"/"}' \
  --header "Accept: application/vnd.github+json"
```

Note: This requires the `gh-pages` branch to exist first (i.e., after the first `mkdocs gh-deploy` run). Run the workflow first, then configure Pages.

Alternative: Configure via GitHub web UI: Settings > Pages > Branch: gh-pages / /(root) > Save.

### Pattern 3: Branch Protection via API

The status check name in the branch protection rule must match the **job name** in the workflow file. In the workflow above, the job is named `deploy`. The status check context string will be `deploy`.

```bash
# Source: GitHub REST API docs - PUT /repos/{owner}/{repo}/branches/{branch}/protection
# Run AFTER at least one successful workflow run (status check must exist in GitHub's system)
gh api -X PUT "repos/vedantggwp/SP-VibeFrame/branches/main/protection" \
  --header "Accept: application/vnd.github+json" \
  -f 'required_status_checks={"strict":false,"contexts":["deploy"]}' \
  -f 'enforce_admins=false' \
  -f 'required_pull_request_reviews=null' \
  -f 'restrictions=null'
```

Alternatively, configure via GitHub web UI: Settings > Branches > Add rule > "main" > "Require status checks to pass before merging" > search for "deploy" > Save.

**Timing constraint:** The status check name only appears in the branch protection UI/API search after the workflow has run at least once successfully.

### Anti-Patterns to Avoid

- **Creating `gh-pages` branch manually:** `mkdocs gh-deploy` creates and manages this branch automatically. Manual creation can cause diverge conflicts.
- **Using `permissions: write-all`:** Over-grants permissions; use `contents: write` only.
- **Bare `pip install mkdocs-material` in workflow:** Bypasses the pinned `requirements.txt`, risking version drift from local environment.
- **Setting branch protection before first CI run:** The `deploy` status check won't appear in the search field until it has run at least once. Configure branch protection after first successful deployment.
- **Enabling Pages before `gh-pages` branch exists:** The Pages settings UI and API require the branch to exist. First run the workflow, then enable Pages.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Deploying MkDocs to gh-pages branch | Custom git commands to push `site/` | `mkdocs gh-deploy --force` | Handles branch creation, commit, force-push, and gh-pages branch management atomically |
| Configuring Pages publishing source | GitHub web UI navigation | `gh api PUT /repos/.../pages` | Scriptable, repeatable, auditable |
| Setting branch protection | GitHub web UI | `gh api PUT .../branches/main/protection` | Same — enables documentation in the plan |
| Caching Python packages in CI | Custom cache logic | `actions/cache@v4` with Material's weekly key pattern | Official, well-tested pattern with automatic cache invalidation |

**Key insight:** `mkdocs gh-deploy` does everything in one command — it builds the site, creates/updates the `gh-pages` branch, commits the output, and force-pushes. There is no need to separate the build and deploy steps.

---

## Common Pitfalls

### Pitfall 1: Pages Settings Not Configured Before Checking Live URL

**What goes wrong:** Workflow runs successfully, `gh-pages` branch is created, but visiting `vedantggwp.github.io/SP-VibeFrame` returns 404.
**Why it happens:** The `gh-pages` branch being created does not automatically enable GitHub Pages. Repository must be configured to serve from that branch in Settings > Pages.
**How to avoid:** After the first successful workflow run, configure Pages via `gh api` or web UI. Give it up to 10 minutes to propagate.
**Warning signs:** `gh api repos/vedantggwp/SP-VibeFrame/pages` returns 404 (Pages not enabled).

### Pitfall 2: Status Check Name Not Found in Branch Protection UI

**What goes wrong:** Trying to add `deploy` as a required status check, but it doesn't appear in the search field.
**Why it happens:** GitHub only shows status checks that have run at least once in the past 7 days.
**How to avoid:** Set up branch protection AFTER the first successful workflow run, not before. Trigger a push to main to run the workflow first.
**Warning signs:** Search field shows "No status checks found" or the check name is not listed.

### Pitfall 3: Workflow Trigger Branch Mismatch

**What goes wrong:** Workflow never triggers even though code is pushed.
**Why it happens:** If the workflow file has `branches: [master]` but the repo uses `main` (as renamed in Phase 1), the trigger never fires.
**How to avoid:** The workflow must specify `branches: [main]`. The Phase 1 plan renamed to `main` — confirm with `git branch` before committing the workflow.
**Warning signs:** Push to main completes, but the Actions tab shows no workflow run.

### Pitfall 4: `contents: write` Permission Not Set

**What goes wrong:** `mkdocs gh-deploy` fails with `Permission denied` or `remote: Permission to ... denied to github-actions[bot]`.
**Why it happens:** GitHub Actions default token permissions may be set to read-only at the repo or org level.
**How to avoid:** Explicitly set `permissions: contents: write` in the workflow YAML. Also verify repo settings: Settings > Actions > General > Workflow permissions is set to "Read and write permissions".
**Warning signs:** CI log shows `ERROR - Could not deploy documentation` or `fatal: unable to access`.

### Pitfall 5: HOST-02 Mismatch — Site is Publicly Visible

**What goes wrong:** After successful deployment, site is accessible without authentication.
**Why it happens:** GitHub Pages access-controlled private visibility is an Enterprise Cloud feature — not available on personal GitHub Pro accounts.
**How to avoid:** Plan must explicitly handle this: either document the limitation (site is "obscure not locked"), implement StatiCrypt for lightweight password protection, or escalate to user for decision.
**Warning signs:** Opening the Pages URL in an incognito browser window (not logged into GitHub) shows the site content.

### Pitfall 6: `mkdocs gh-deploy` Requires Git Config in CI

**What goes wrong:** `mkdocs gh-deploy` fails with `Author identity unknown` or git config errors.
**Why it happens:** GitHub Actions runners don't have a global git user configured by default.
**How to avoid:** Include the git config step before the deploy:
```bash
git config user.name github-actions[bot]
git config user.email 41898282+github-actions[bot]@users.noreply.github.com
```
**Warning signs:** CI log shows `*** Please tell me who you are.` or `fatal: empty ident name`.

---

## Code Examples

### Complete GitHub Actions Workflow (ci.yml)

```yaml
# Source: https://squidfunk.github.io/mkdocs-material/publishing-your-site/
# Modified: pip install -r requirements.txt for pinned versions
name: ci
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: ~/.cache
          restore-keys: |
            mkdocs-material-
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force
```

### Enable Pages via GitHub CLI/API

```bash
# Run AFTER first gh-deploy push creates the gh-pages branch
# Source: GitHub REST API docs + gh community discussion #51268
gh api -X PUT "repos/vedantggwp/SP-VibeFrame/pages" \
  -f source='{"branch":"gh-pages","path":"/"}' \
  --header "Accept: application/vnd.github+json"
```

### Set Branch Protection via GitHub CLI/API

```bash
# Run AFTER at least one successful CI run so the "deploy" check is known
# Source: https://docs.github.com/en/rest/branches/branch-protection
gh api -X PUT "repos/vedantggwp/SP-VibeFrame/branches/main/protection" \
  --header "Accept: application/vnd.github+json" \
  -f 'required_status_checks={"strict":false,"contexts":["deploy"]}' \
  -f 'enforce_admins=false' \
  -f 'required_pull_request_reviews=null' \
  -f 'restrictions=null'
```

### Verify Live Site and Privacy

```bash
# Check Pages is enabled and get URL
gh api repos/vedantggwp/SP-VibeFrame/pages --jq '{status: .status, url: .html_url}'

# Verify site returns 200 (accessible)
curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/

# Test access from unauthenticated context — if this returns 200, site is PUBLIC
# (not 401/403, confirming HOST-02 gap for personal GitHub Pro)
curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/ --cookie ""

# Check workflow ran successfully
gh run list --workflow ci.yml --limit 3

# Verify branch protection is set
gh api repos/vedantggwp/SP-VibeFrame/branches/main/protection \
  --jq '.required_status_checks.contexts'
```

### Verify Build Failure Blocks Deployment (CICD-03)

```bash
# Temporarily break mkdocs.yml, push, watch CI fail
# The deploy step won't execute if mkdocs gh-deploy exits non-zero
# Restore the file after confirming the failure
gh run list --workflow ci.yml --limit 1 --json status,conclusion
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| Manual `mkdocs build && git push origin gh-pages` | `mkdocs gh-deploy --force` in GitHub Actions | Fully automated on every push to main |
| `pip install mkdocs-material` in workflow | `pip install -r requirements.txt` | Pinned versions; reproducible CI environment |
| `actions/checkout@v2` | `actions/checkout@v4` | Performance, security fixes; v2 deprecated |
| `actions/setup-python@v4` | `actions/setup-python@v5` | Current stable |
| Branch protection rules (legacy) | Both branch protection rules and Rulesets available | Rulesets are newer but branch protection rules work fine for this use case |

**Deprecated/outdated:**
- `mhausenblas/mkdocs-deploy-gh-pages` action: Replaced by the simpler `mkdocs gh-deploy` direct approach.
- `peaceiris/actions-gh-pages`: Works but adds a third-party dependency without benefit for MkDocs (which has `gh-deploy` built in).
- `actions/cache@v3`: Use v4.

---

## Open Questions

1. **HOST-02: How should the planner handle the private access gap?**
   - What we know: True private Pages requires Enterprise Cloud. GitHub Pro personal accounts cannot access-control the published site.
   - What's unclear: Does the user care about "truly private" or is "obscure URL + private source repo" sufficient for peer review?
   - Recommendation: Planner should select Option A (accept public URL, document the limitation) as the simplest path aligned with the "peer review" use case. The URL is not indexed or promoted; collaborators share it directly. If the user wants real access control, escalate to discuss alternatives before implementing.

2. **Repo settings: Workflow permissions default**
   - What we know: `contents: write` is set in the workflow YAML. However, some repos have read-only workflow permissions set at the repo level.
   - What's unclear: The default setting for this specific repo (just created).
   - Recommendation: Include a verification step to confirm `gh api repos/vedantggwp/SP-VibeFrame/actions/permissions` shows write permissions, or add a task to explicitly set it if needed.

3. **`site_url` in mkdocs.yml**
   - What we know: `mkdocs.yml` currently has `site_url: ""`. The correct Pages URL is `https://vedantggwp.github.io/SP-VibeFrame/`.
   - What's unclear: Whether `mkdocs gh-deploy` requires a correct `site_url` to build relative links properly.
   - Recommendation: Set `site_url: https://vedantggwp.github.io/SP-VibeFrame/` before deployment to ensure internal links (canonical URLs, navigation) resolve correctly.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no application code; all validation is smoke checks via shell/API/HTTP |
| Config file | N/A |
| Quick run command | `gh run list --workflow ci.yml --limit 1 --json status,conclusion --jq '.[0]'` |
| Full suite command | See Phase Requirements → Test Map below |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CICD-01 | Push to main triggers workflow run | smoke | `gh run list --workflow ci.yml --limit 1 --json event,status --jq '.[0]'` (event=push) | ❌ Wave 0 — workflow file must be created |
| CICD-02 | Workflow deploys site (gh-pages branch exists, has commits) | smoke | `git ls-remote origin gh-pages` (must return a ref) | ❌ Wave 0 — created by first workflow run |
| CICD-03 | Broken build fails workflow without updating site | smoke | Manual test: break mkdocs.yml, push, verify `gh run list` shows failure; restore | Manual-only — requires intentional breakage |
| HOST-01 | Site reachable at Pages URL | smoke | `curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/` (must be 200) | ❌ Wave 0 — enabled after first deploy |
| HOST-02 | Unauthenticated session denied access | smoke | `curl -s -o /dev/null -w "%{http_code}" https://vedantggwp.github.io/SP-VibeFrame/ --cookie ""` (must NOT be 200 if private) | Manual-only — see HOST-02 gap; likely returns 200 |
| QUAL-01 | Branch protection requires CI to pass | smoke | `gh api repos/vedantggwp/SP-VibeFrame/branches/main/protection --jq '.required_status_checks.contexts'` (must contain "deploy") | ❌ Wave 0 — configured after first CI run |

### Sampling Rate
- **Per task commit:** `gh run list --workflow ci.yml --limit 1 --json conclusion --jq '.[0].conclusion'` (must be "success")
- **Per wave merge:** Full suite — all smoke checks above
- **Phase gate:** All smoke checks pass before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `.github/workflows/ci.yml` — covers CICD-01, CICD-02, CICD-03 (must be created as the primary task)
- [ ] GitHub Pages settings configured — covers HOST-01 (configured via `gh api` after first deploy)
- [ ] Branch protection rule — covers QUAL-01 (configured via `gh api` after first CI run)

*(No test framework installation needed — all validation is shell smoke checks against GitHub API, git refs, and HTTP endpoints.)*

---

## Sources

### Primary (HIGH confidence)
- [MkDocs Material Publishing Your Site](https://squidfunk.github.io/mkdocs-material/publishing-your-site/) — complete workflow YAML, permissions, caching pattern
- [GitHub Docs: Changing GitHub Pages visibility](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) — confirms private Pages requires Enterprise Cloud
- [GitHub REST API: Branch Protection](https://docs.github.com/en/rest/branches/branch-protection) — PUT endpoint, required_status_checks structure
- [GitHub REST API: Configuring Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — branch-based publishing setup
- [GitHub Docs: About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — available for personal repos

### Secondary (MEDIUM confidence)
- [GitHub Community Discussion #51268: Enable Pages via gh CLI](https://github.com/orgs/community/discussions/51268) — confirms `gh api -X PUT /repos/.../pages` approach
- [GitHub Community Discussion #44555: Private Pages for individuals](https://github.com/orgs/community/discussions/44555) — confirms personal accounts cannot use private Pages
- [GitHub Community Discussion #149437: Pages from private repo issues](https://github.com/orgs/community/discussions/149437) — confirms Pages works from private repos on Pro (but site is public)
- [GitHub Changelog: Access control for GitHub Pages](https://github.blog/changelog/2021-01-21-access-control-for-github-pages/) — original feature announcement, confirms org-only scope
- Verified against multiple independent community sources (2024–2025) for HOST-02 gap

### Tertiary (LOW confidence)
- StatiCrypt workaround (robinmoisson/staticrypt) — documented as option, not verified for MkDocs integration specifically

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — official MkDocs Material workflow verified directly from docs; action versions confirmed current
- Architecture (CI/CD flow): HIGH — `mkdocs gh-deploy` behavior well-documented and standard across MkDocs ecosystem
- HOST-02 gap: HIGH — confirmed by multiple official sources and community discussions; the limitation is real and current as of 2025
- Branch protection API: MEDIUM — endpoint structure verified from docs; the exact `contexts` array name (`deploy`) depends on the job name in the final workflow, which is implementation-specific
- Pages API enable step: MEDIUM — verified from community discussion; official CLI command not in main gh CLI docs but widely used pattern

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (GitHub Actions action versions and Pages access control policy are stable; check for action version updates if extending beyond 30 days)
