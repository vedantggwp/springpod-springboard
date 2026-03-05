# External Integrations

**Analysis Date:** 2026-03-04

## Overview

**VCF (Vibe Coding Framework)** is a documentation system that does NOT have runtime integrations. However, it serves as a GUIDE for organizations to make integration decisions when building AI-powered tools using the framework.

This document covers:
1. Tools that VCF recommends and approves
2. Integrations that users of VCF will make (guidance, not implementation)
3. Services recommended in the framework for specific use cases

---

## AI Coding Tools (Framework Recommendations)

VCF provides guidance on which AI tools to use for different project types. See `docs/guides/tool-selection.md` and `docs/client-config/approved-tools.md`.

### No-Code Tools (for Quick Prototypes)
- **Lovable** - UI/form generation, no backend
- **Bolt** - Full-stack web apps from description
- **v0** - React component generation
- **Best for:** Green builds (internal, throwaway, no sensitive data)

### Low-Code Tools (for Internal Tools & MVPs)
- **Replit Agent** - AI-assisted development with code visibility
  - Includes: Hosting, environment variables, basic database options
  - **Assessment in framework:** Works well for Green/Yellow builds; evaluate data residency for Orange/Red
- **Best for:** Green and Yellow builds (internal tools, dashboards, CRUD apps)

### Pro Tools (for Production & Complex Apps)
- **Cursor** - IDE with AI copilot built-in
- **Claude Code** - AI-assisted development with full code control
- **Best for:** Orange and Red builds (customer-facing, personal data, compliance requirements)

### Tier Assignment by Build Path
| Build Path | Recommended Tier | Why |
|-----------|------------------|-----|
| Green (Quick Build) | Any tier | Low risk, any tool acceptable |
| Yellow (Standard Build) | No-Code or Low-Code | Moderate data, no compliance |
| Orange (Reviewed Build) | Low-Code or Pro Tools | Personal data, external users |
| Red (Protected Build) | Pro Tools strongly recommended | Protected data, minors, compliance |

---

## Hosting & Deployment Services

VCF does not mandate specific hosting but provides guidance. Recommended options:

### Static Site Hosting (for No-Code/prototype outputs)
- **Vercel** - Optimized for Next.js and static sites
- **Netlify** - Full CI/CD pipeline, serverless functions
- **GitHub Pages** - Free, git-integrated
- **AWS S3 + CloudFront** - Enterprise-scale static hosting

### Platform Hosting (bundled with tools)
- **Replit** - Integrated hosting with code environment
  - Includes: Domain, HTTPS, environment variable management, basic database
  - Note: Evaluate data residency for compliance-heavy projects

### Backend/API Hosting
- **Vercel Functions** - Serverless Node.js (Vercel)
- **Netlify Functions** - Serverless runtime (Netlify)
- **Railway, Render, Fly.io** - Container-based deployment
- **AWS, Google Cloud, Azure** - Full-scale infrastructure

**Framework Guidance:** Choose based on data sensitivity (see Build Path in intake)

---

## Databases & Data Storage

VCF guidance on data persistence options:

### Embedded/Local Databases (for Green builds)
- **Replit Database** - Built into Replit projects
- **SQLite** - Lightweight, file-based
- **Local storage/IndexedDB** - Browser-based (client-side only)

### Managed Cloud Databases (for Yellow/Orange builds)
- **Supabase** - PostgreSQL + auth + realtime
  - **Framework note:** Evaluate EU compliance requirements
- **Firebase** - Google's realtime database + auth
- **MongoDB Atlas** - Document-based, flexible schema
- **PlanetScale** - MySQL-compatible, serverless

### Enterprise Databases (for Red builds)
- **Postgres (managed)** - AWS RDS, Google Cloud SQL, Azure Database
- **Oracle, SQL Server** - Enterprise options
- **On-premise databases** - For strict data residency requirements

**Framework Guidance:**
- Green: Any option works (data is non-sensitive)
- Yellow: Cloud-managed OK (business data, internal)
- Orange: Must evaluate terms of service (personal data)
- Red: Full compliance review required (protected data, minors)

---

## Authentication & Identity

### Auth Providers (framework-recommended options)

**No-Code Auth (for prototypes):**
- Built-in to Lovable, Bolt, v0
- Basic email/password or OAuth

**Low-Code Auth (for internal tools):**
- **Replit's built-in auth** - Simple user management
- **Supabase Auth** - OAuth + email + MFA
- **Firebase Auth** - Managed authentication service

**Pro Auth (for customer-facing apps):**
- **Supabase Auth** - Full OAuth/SAML support
- **Firebase Auth** - Comprehensive provider support
- **Auth0** - Enterprise SSO and security
- **Amazon Cognito** - AWS-native identity service
- **Okta** - Enterprise identity management

**Student/Minor-Specific (for Red builds with student users):**
- Must NOT track behavioral data
- Must provide data deletion options
- COPPA compliance required (if under 13)
- FERPA compliance required (if student records)

---

## AI Services & APIs

VCF guides builders on when to use external AI services:

### Recommended for Production Use
- **OpenAI API** (GPT-4, GPT-3.5)
- **Anthropic Claude API** - Can be approved for content generation
- **Google Gemini API**
- **AWS Bedrock** - Enterprise AI service provider

### Framework Position
- AI services require **approval before use** (see `docs/client-config/approved-tools.md`)
- All AI outputs must be reviewed before serving to users (Orange path and above)
- Production prompts must be documented (see `docs/forms/prompt-spec.md`)

### Environment Configuration
```
OPENAI_API_KEY=sk-...        # Must be env var, never hardcoded
ANTHROPIC_API_KEY=sk-ant-... # Must be env var, never hardcoded
GOOGLE_API_KEY=...           # Must be env var, never hardcoded
```

**Framework Rule:** "Never put API keys in code. Always use environment variables."

---

## Analytics & Monitoring

### NOT Allowed for Red Builds (Student-Facing Tools)
- Google Analytics
- Mixpanel
- Amplitude
- Facebook Pixel
- Any third-party behavioral tracking

**Framework Reasoning:** Student data privacy (FERPA, COPPA compliance)

### Allowed for Green/Yellow Builds (Internal Tools)
- Basic usage metrics
- Error tracking
- Performance monitoring

### Recommended Options
- **Error Tracking (all paths):** Sentry, Rollbar, LogRocket
- **Logs (server-side only):** CloudWatch, LogRocket, Datadog
- **Performance:** Built-in browser DevTools (no third-party tracking)

---

## File Storage & CDN

### Options
- **Replit Files** - Bundled with Replit
- **Vercel Blob** - Connected to Vercel deployment
- **AWS S3** - Scalable object storage
- **Cloudinary** - Image optimization + storage
- **Firebase Storage** - Managed file storage

### Framework Guidance
- Green: Any option
- Yellow: Managed services OK (Vercel, Firebase, Replit)
- Orange/Red: Must evaluate data residency and compliance
  - **No student data on third-party CDNs** (Red builds)
  - **GDPR data locality requirements** (EU-based companies)

---

## Webhooks & Callbacks

VCF provides patterns for connecting tools to external systems (not implementations):

### Incoming Webhooks
- From third-party services → Your tool
- Example: "GitHub notified me when a PR was merged"
- **Security requirement:** Validate webhook signatures

### Outgoing Webhooks
- From your tool → Third-party services
- Example: "My dashboard sends metrics to Slack daily"
- **Security requirement:** Use API keys in environment variables, never hardcode

**Not Implemented in VCF itself** — only documented as patterns in guides.

---

## Communication & Notifications

For tools built using VCF:

### Email Delivery
- **Resend, SendGrid, Mailgun** - Transactional email
- **AWS SES** - Amazon's email service
- **Twilio, Twilio SendGrid** - SMS + email

### Notifications
- **Slack API** - Send alerts to Slack channels
- **Discord webhooks** - Simple bot integration
- **Firebase Cloud Messaging** - Push notifications

### Approval Requirements
- **Green:** Any service
- **Yellow:** Check terms (internal data only)
- **Orange/Red:** Full compliance review (personal data)

---

## Third-Party Services (Framework Approval Process)

### Approval Workflow (in `docs/client-config/approved-tools.md`)

Before using ANY external service:

1. **List it** - What service, what does it do?
2. **Evaluate** - Data privacy, terms of service, data residency
3. **Check approved list** - Is it already approved for your organization?
4. **Request approval** (if not on list):
   - Submit to IT/Security team
   - Include: service name, purpose, data handling, why it's needed
   - Approval criteria: Data residency, GDPR/COPPA/FERPA compliance, privacy policy

### Decision Matrix
| Build Path | Approval Required? | Compliance Check | Use Case Examples |
|-----------|------------------|------------------|-------------------|
| Green | No | Use any approved hosting | Prototype landing page |
| Yellow | Yes (pre-check) | Internal data only | Employee dashboard |
| Orange | Yes (mandatory) | Full review | Customer feature |
| Red | Yes (mandatory) + approval | Compliance audit | Student tool |

---

## Environment Variables & Secrets

### Framework Standard (`docs/standards/security.md`)

**Rule:** Never hardcode secrets. Always use environment variables.

```javascript
// WRONG:
const API_KEY = "sk-abcdef123456"

// CORRECT:
const API_KEY = process.env.OPENAI_API_KEY
```

### Configuration by Tool

**Replit:** Environment variables via .env file or Replit Secrets panel
**Vercel:** Environment variables via dashboard
**Netlify:** Environment variables via dashboard
**GitHub Pages:** Cannot use secrets (static site only)
**Self-hosted:** .env file + process.env or config management system

### Mandatory Env Vars (for typical AI tool builds)
- `OPENAI_API_KEY` (if using OpenAI)
- `ANTHROPIC_API_KEY` (if using Claude)
- `DATABASE_URL` (if using external database)
- `SUPABASE_KEY` (if using Supabase)
- `AUTH_SECRET` (if using authentication)

---

## Integration Patterns (Framework Guidance)

The framework provides tested patterns for common integrations:

### API Integration Pattern
1. Fetch data from external API
2. Transform/validate response
3. Handle errors gracefully (show user-friendly message)
4. Cache if possible (reduce API calls)
5. Rate limit requests (respect service limits)

### Database Integration Pattern
1. Connect using environment variable (not hardcoded URL)
2. Use parameterized queries (prevent SQL injection)
3. Handle connection errors
4. Validate all input before database operations
5. Log errors server-side only (never expose DB names/paths to users)

### Authentication Integration Pattern
1. Redirect to auth provider
2. Receive callback token
3. Validate token signature
4. Create/update user session
5. Clear session on logout

---

## Platform Requirements for Integration

**For Red Builds (Protected/Student Data):**
- [ ] Data residency compliance (EU/US/regional requirements)
- [ ] HTTPS everywhere
- [ ] No third-party analytics on student data
- [ ] Data deletion capability
- [ ] Audit trail for compliance reviews
- [ ] Incident response plan

**For Orange Builds (Personal Data):**
- [ ] Privacy policy for all third-party services
- [ ] Opt-out options where possible
- [ ] Data retention limits
- [ ] No behavioral profiling

**For Yellow Builds (Internal/Business Data):**
- [ ] Clear terms of service
- [ ] Data encryption in transit (HTTPS)
- [ ] Basic backup/recovery

---

## Related Framework Documents

- `docs/standards/security.md` - Security requirements for all integrations
- `docs/client-config/approved-tools.md` - Tool approval process
- `docs/guides/tool-selection.md` - Decision flowchart
- `docs/forms/project-brief.md` - Data classification (affects integrations)

---

*Integration audit: 2026-03-04*
