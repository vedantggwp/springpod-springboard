# Incident Report

Fill this out when something goes wrong with a live tool. The sooner you document what happened, the faster it gets resolved.

If you are unsure whether something counts as an incident, see [When to Escalate](../guides/when-to-escalate.md).

---

**Tool name:** ___

**Reported by:** ___

**Date and time discovered:** ___

---

## Severity

Check one:

- [ ] **Low** — cosmetic issue, no data affected, users can work around it
- [ ] **Medium** — functionality broken, workaround exists, no data at risk
- [ ] **High** — users affected, no workaround, but no data exposed
- [ ] **Critical** — data exposed, safety risk, legal concern, or tool serving minors is compromised

<details><summary>How to choose a severity</summary>

Ask yourself:
1. Is anyone's personal data exposed or at risk? → **Critical**
2. Are minors affected? → **Critical**
3. Could this cause legal or compliance problems? → **Critical**
4. Are users blocked with no workaround? → **High**
5. Can users work around it? → **Medium**
6. Is it just a visual or cosmetic issue? → **Low**

When in doubt, choose a higher severity. It is easier to downgrade than to explain why you underreported.

</details>

---

## What happened?

Describe what went wrong in plain language. Include what users saw, when it started, and how it was discovered.

---

## Who is affected?

- **User type:** ___ (internal staff / external users / students / parents)
- **Approximate number affected:** ___
- **Are minors affected?** Yes / No / Unknown

---

## What did you do immediately?

List the steps you took as soon as you discovered the issue. If you turned the tool off, say so.

1. ___
2. ___
3. ___

---

## Root cause (if known)

What caused this? Check any that apply:

- [ ] AI-generated code issue
- [ ] Configuration or deployment error
- [ ] External service outage (API, database, hosting)
- [ ] User input the tool did not handle
- [ ] Security vulnerability
- [ ] Unknown — needs investigation

**Details:** ___

---

## What needs to happen next?

| Action | Who | By when |
|--------|-----|---------|
| ___ | ___ | ___ |
| ___ | ___ | ___ |
| ___ | ___ | ___ |

---

## Notifications

Who has been told about this incident?

| Person / Team | How notified | When |
|---------------|-------------|------|
| ___ | ___ | ___ |
| ___ | ___ | ___ |

---

## Lessons learned (fill in after resolution)

**Date resolved:** ___

**What would prevent this from happening again?**

- ___
- ___

**Changes made as a result:**

- ___
- ___

---

## Related documents

- [When to Escalate](../guides/when-to-escalate.md)
- [Security Standard](../standards/security.md)
- [Roles and Contacts](../client-config/roles.md)
