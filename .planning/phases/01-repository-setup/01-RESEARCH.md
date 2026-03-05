# Phase 1: Repository Setup - Research

**Researched:** 2026-03-05
**Domain:** Git repository management, Python dependency pinning, GitHub CLI
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| REPO-01 | Private GitHub repository created with project code pushed | gh CLI can create private repo from local source with `--source --push --private`; GitHub account `vedantggwp` is authenticated |
| REPO-02 | `.gitignore` excludes `site/` build output and other generated files | `.gitignore` already exists with `site/`, `__pycache__/`, `.DS_Store`; verify completeness and commit it |
| REPO-03 | `requirements.txt` pins MkDocs and Material theme versions for reproducible builds | Installed versions are known: mkdocs==1.6.1, mkdocs-material==9.7.4; direct deps identified |
</phase_requirements>

---

## Summary

This phase is a pure Git/GitHub setup phase — no new code, no new architecture. The existing local repository has a clean history (10 commits on `master`), a `.gitignore` that already excludes `site/`, and a working MkDocs installation. Two things are missing: a GitHub remote and a `requirements.txt`.

The GitHub CLI is authenticated as `vedantggwp`. The `gh repo create` command with `--source=. --push --private` creates the remote from the local directory in a single step, without requiring a manual `git remote add` + `git push` sequence. This is the fastest, least error-prone path.

For `requirements.txt`, the goal is reproducibility: pin the two top-level packages (`mkdocs` and `mkdocs-material`) and their direct non-stdlib dependencies. This is the standard MkDocs Material pattern — the theme's own GitHub Actions workflow does the same. Full transitive pinning via `pip freeze` is overkill for a docs-only project and breaks on different Python versions (many anaconda packages in the current freeze have local file:// paths which would fail on CI).

**Primary recommendation:** Use `gh repo create SP-VibeFrame --private --source=. --remote=origin --push` to create the private repo and push in one command. Create `requirements.txt` with only the direct dependencies pinned to the exact installed versions.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| mkdocs | 1.6.1 | Static site generator for docs | The installed version — pin exactly for reproducibility |
| mkdocs-material | 9.7.4 | Material Design theme | The installed theme — pin exactly for reproducibility |

### Direct Dependencies (pin these too)

The `mkdocs-material` package requires several direct deps that are not bundled. These should be pinned to avoid CI surprises:

| Library | Version | Purpose |
|---------|---------|---------|
| pymdown-extensions | 10.21 | Markdown extensions used in mkdocs.yml |
| mkdocs-material-extensions | 1.3.1 | Material icon and emoji support |
| backrefs | 6.2 | Regex backreferences (Material dependency) |
| paginate | 0.5.7 | Pagination support (Material dependency) |
| mkdocs-get-deps | 0.2.0 | MkDocs dependency resolver |

### What NOT to Pin

Do NOT copy the full `pip freeze` output into `requirements.txt`. The current environment is an Anaconda environment and many packages have `file://` local paths (e.g., `Jinja2 @ file:///private/var/folders/...`) which will fail on any other machine or CI runner. Pin only the packages that MkDocs actually uses.

**Installation (for CI/new environments):**
```bash
pip install -r requirements.txt
```

**requirements.txt content:**
```
mkdocs==1.6.1
mkdocs-material==9.7.4
pymdown-extensions==10.21
mkdocs-material-extensions==1.3.1
backrefs==6.2
paginate==0.5.7
mkdocs-get-deps==0.2.0
```

---

## Architecture Patterns

### Current Repository State

```
SP-VibeFrame/          ← local git repo, branch: master, 10 commits
├── docs/              ← MkDocs content (tracked)
│   ├── index.md
│   ├── standards/
│   ├── build-guides/
│   ├── checklists/
│   ├── forms/
│   ├── guides/
│   ├── client-config/
│   ├── intake/
│   └── verification-log.md, version.md
├── mkdocs.yml         ← MkDocs config (tracked)
├── site/              ← Build output (EXCLUDED by .gitignore)
├── plans/             ← Local planning files (tracked)
├── .gitignore         ← Already exists, already excludes site/
└── .planning/         ← GSD planning system (tracked)
```

### Pattern: Single-Command Remote Creation

`gh repo create` with `--source` avoids the common mistake of creating a bare GitHub repo and then having to deal with conflicting initial commits:

```bash
# Source: gh CLI official docs
# Creates remote, sets origin, pushes all local commits in one step
gh repo create SP-VibeFrame \
  --private \
  --source=. \
  --remote=origin \
  --push \
  --description "Vibe Coding Framework documentation"
```

This is superior to the two-step `gh repo create` + `git push` because it avoids the "remote contains work not in local" merge conflict that occurs when GitHub creates a README automatically.

### Pattern: Minimal Direct-Dependency Pinning

```
# requirements.txt
# Source: MkDocs Material official deployment docs
# Pin direct dependencies only — not transitive — for cross-environment compatibility
mkdocs==1.6.1
mkdocs-material==9.7.4
```

Add direct sub-deps as needed if CI fails on resolution.

### Anti-Patterns to Avoid

- **`pip freeze > requirements.txt`:** Includes Anaconda-specific `file://` URLs and system packages that fail on CI runners (Ubuntu/GitHub Actions uses a clean venv, not Anaconda).
- **`gh repo create` without `--source`:** Creates a bare remote; then `git push` fails because GitHub auto-creates a `README.md` commit that diverges from local history.
- **Committing `site/` directory:** Build output; 10MB+ of generated HTML/CSS/JS that bloats the repo and makes diffs unreadable. Already excluded — verify it stays excluded.
- **Using `--public` flag:** The requirement is private. Using `--private` explicitly prevents accidental exposure.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Creating GitHub remote from local repo | Manual `git remote add` + `git push` | `gh repo create --source --push` | Single atomic operation, no merge conflicts from remote-init README |
| Dependency version discovery | Manual version lookup | `pip show mkdocs mkdocs-material` | Ground truth from installed environment |
| `.gitignore` for MkDocs | Write from scratch | Existing `.gitignore` is correct | `site/` already excluded |

**Key insight:** This phase is entirely operational — creating resources, not writing code. The tools to do it (git, gh CLI) already exist and are authenticated.

---

## Common Pitfalls

### Pitfall 1: Repo name conflict on GitHub

**What goes wrong:** `gh repo create SP-VibeFrame` fails if a repo named `SP-VibeFrame` already exists under `vedantggwp`.
**Why it happens:** GitHub enforces unique repo names per account.
**How to avoid:** Check first with `gh repo list | grep SP-VibeFrame`. If it exists, use `git remote add origin` instead and push.
**Warning signs:** `gh repo create` exits with a non-zero status and "Name already exists on this account."

### Pitfall 2: `site/` accidentally committed before .gitignore is staged

**What goes wrong:** If someone runs `git add .` before ensuring `.gitignore` is staged, `site/` contents get tracked.
**Why it happens:** Git tracks files added before `.gitignore` was in place; once tracked, `.gitignore` no longer excludes them.
**How to avoid:** Stage `.gitignore` first (`git add .gitignore`), then verify `git status` shows `site/` as ignored before staging anything else. The `.gitignore` already exists and is committed (per `git log`), so this risk is low — but verify `site/` does not appear in `git status` output.
**Warning signs:** `git status` shows files inside `site/` as "Changes to be committed."

### Pitfall 3: Anaconda pip freeze paths in requirements.txt break CI

**What goes wrong:** CI runner (`pip install -r requirements.txt`) fails with `ERROR: ... is not a supported wheel on this platform` or `file:// URL requires a local path`.
**Why it happens:** `pip freeze` in an Anaconda env outputs `Package @ file:///private/var/folders/...` paths that are machine-specific.
**How to avoid:** Write `requirements.txt` by hand using only `==` version pins for direct dependencies. Use `pip show mkdocs mkdocs-material` to get versions, not `pip freeze`.
**Warning signs:** `requirements.txt` contains lines with `@ file://` or `@ /Users/`.

### Pitfall 4: master vs main branch naming

**What goes wrong:** GitHub Pages CI workflows (Phase 2) default to `main`; if the repo is on `master`, the workflow trigger `on: push: branches: [main]` never fires.
**Why it happens:** Local repo was initialized before GitHub changed the default to `main`; the local branch is `master`.
**How to avoid:** Decide now whether to rename `master` to `main` before pushing. This is Phase 1 scope — renaming after Phase 2 CI is configured is more disruptive.
**Warning signs:** GitHub Actions workflow shows as configured but never triggers on push.

---

## Code Examples

### Create Private Repo and Push

```bash
# Source: gh CLI docs - https://cli.github.com/manual/gh_repo_create
cd /path/to/SP-VibeFrame
gh repo create SP-VibeFrame \
  --private \
  --source=. \
  --remote=origin \
  --push \
  --description "Vibe Coding Framework - private documentation site"
```

### Verify .gitignore is Working

```bash
# Confirm site/ is ignored (should show nothing or only non-site files)
git status -- site/
# Should output: (empty) or just the directory being mentioned as ignored
git check-ignore -v site/
# Should output: .gitignore:1:site/   site/
```

### Create requirements.txt

```bash
# Write the file directly — do NOT use pip freeze
cat > requirements.txt << 'EOF'
mkdocs==1.6.1
mkdocs-material==9.7.4
pymdown-extensions==10.21
mkdocs-material-extensions==1.3.1
backrefs==6.2
paginate==0.5.7
mkdocs-get-deps==0.2.0
EOF

# Verify it installs cleanly in a venv (optional but recommended validation)
python -m venv /tmp/vcf-test-venv
/tmp/vcf-test-venv/bin/pip install -r requirements.txt --dry-run
```

### Rename master to main (if chosen)

```bash
# Source: git docs
git branch -m master main
# After repo is created on GitHub:
git push origin main
git push origin --delete master  # only if master exists on remote
```

### Verify Repository is Private

```bash
gh repo view vedantggwp/SP-VibeFrame --json visibility --jq '.visibility'
# Should output: PRIVATE
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| `git remote add origin <url>` + `git push` | `gh repo create --source=. --push` | Single step, no divergence risk |
| `pip freeze > requirements.txt` | Manual direct-dep pinning | CI-portable; no Anaconda path pollution |
| Separate `git init` then connect remote | `gh repo create` from existing local | Atomic, avoids README merge conflict |

**Deprecated/outdated:**
- SSH-key-only GitHub auth: The gh CLI uses HTTPS + token auth (keyring), already configured.
- GitHub Desktop / manual web UI repo creation: Not needed when `gh` CLI is available and authenticated.

---

## Open Questions

1. **Branch name: `master` or `main`?**
   - What we know: Local repo is on `master`; GitHub defaults new repos to `main`; Phase 2 CI workflow will target a branch by name.
   - What's unclear: Whether the user has a preference or cares about the name.
   - Recommendation: Rename to `main` during Phase 1 (before push) to align with GitHub default and avoid friction in Phase 2. Document the rename step explicitly in the plan.

2. **Should `plans/` directory be committed to the remote?**
   - What we know: `plans/` exists locally and is tracked (not in `.gitignore`). It may contain sensitive or in-progress planning docs.
   - What's unclear: Whether `plans/` is intended to be private-but-committed or excluded entirely.
   - Recommendation: It's a private repo, so commit it. If sensitive, the planner can add a `.gitignore` entry, but this is out of scope for REPO requirements.

3. **Repo name: `SP-VibeFrame` or something cleaner?**
   - What we know: The local directory is `SP-VibeFrame`; `gh repo create` defaults to the directory name.
   - What's unclear: Whether the user wants the GitHub repo name to match the local directory name.
   - Recommendation: Use `SP-VibeFrame` (the local directory name) unless the user specifies otherwise. The planner should note that the repo name determines the GitHub Pages URL (e.g., `vedantggwp.github.io/SP-VibeFrame`).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — this phase has no application code to unit test |
| Config file | N/A |
| Quick run command | `bash -c 'gh repo view vedantggwp/SP-VibeFrame --json visibility --jq .visibility'` |
| Full suite command | See Phase Requirements → Test Map below |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REPO-01 | Private GitHub repo exists and code is visible | smoke | `gh repo view vedantggwp/SP-VibeFrame --json visibility,name --jq '"\(.name) \(.visibility)"'` | N/A — CLI check |
| REPO-01 | Local commits are pushed (remote not behind) | smoke | `git -C . log origin/main..HEAD --oneline` (empty = synced) | N/A — CLI check |
| REPO-02 | `site/` is excluded from tracked files | smoke | `git -C . ls-files site/ \| wc -l` (must be 0) | N/A — CLI check |
| REPO-02 | `site/` is listed in `.gitignore` | smoke | `grep -x 'site/' .gitignore` (must match) | ✅ `.gitignore` exists |
| REPO-03 | `requirements.txt` exists | smoke | `test -f requirements.txt && echo OK` | ❌ Wave 0 |
| REPO-03 | `requirements.txt` installs without error | smoke | `pip install -r requirements.txt --dry-run 2>&1 \| tail -1` | ❌ Wave 0 |
| REPO-03 | `requirements.txt` contains pinned mkdocs version | smoke | `grep 'mkdocs==1.6.1' requirements.txt` | ❌ Wave 0 |
| REPO-03 | `requirements.txt` contains pinned Material version | smoke | `grep 'mkdocs-material==9.7.4' requirements.txt` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `git ls-files site/ | wc -l` (must return 0); `test -f requirements.txt && echo OK`
- **Per wave merge:** Full suite — all smoke checks in table above
- **Phase gate:** All smoke checks pass before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `requirements.txt` — covers REPO-03 (file must be created as part of this phase)

*(No test framework installation needed — all validation is via shell smoke checks against git, gh CLI, and filesystem state.)*

---

## Sources

### Primary (HIGH confidence)

- `gh repo create --help` — flags and behavior for `--source`, `--push`, `--private`
- `git -C /Users/ved/SP-VibeFrame log --oneline` — confirmed local git state (10 commits, `master` branch, no remote)
- `cat /Users/ved/SP-VibeFrame/.gitignore` — confirmed `site/` already excluded
- `pip show mkdocs mkdocs-material` — confirmed installed versions (mkdocs==1.6.1, mkdocs-material==9.7.4)
- `pip freeze` output — used to identify direct dependency versions; Anaconda path issue confirmed directly
- `gh auth status` — confirmed gh CLI authenticated as `vedantggwp`

### Secondary (MEDIUM confidence)

- MkDocs Material official deployment pattern (verified by pip show dependency list matching Material's documented requirements)
- GitHub default branch naming behavior (standard gh CLI behavior, widely documented)

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — installed versions confirmed directly from environment
- Architecture: HIGH — git state, .gitignore, and gh CLI auth verified directly
- Pitfalls: HIGH — Anaconda pip freeze issue confirmed by direct inspection of `pip freeze` output; branch naming confirmed by `git branch` output

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable tooling — versions won't change until user upgrades)
