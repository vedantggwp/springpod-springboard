# Security Standard

This document defines the security rules for every tool built using VCF. You do not need a technical background to follow these rules.

---

## The one rule

Never put sensitive information in your code. Not passwords, not API keys, not secret tokens, not database URLs. Ever.

<details><summary>WHY</summary>

If sensitive information is in your code, anyone who can see the code can access your accounts, your data, and your users' data. This is the most common security mistake in AI-assisted development — and the easiest to prevent.

</details>

<details><summary>HOW TO CHECK</summary>

1. Open your project in whatever tool you used to build it
2. Use the search function (Ctrl+F on Windows, Cmd+F on Mac)
3. Search for each of these, one at a time: `sk-`, `api_key`, `secret`, `password`, `token`, `DATABASE_URL`
4. Also search for any long random string that looks like a key or password
5. If you find any of these in your code, move them to environment variables (your tool's settings or secrets panel)
6. Not sure how to move them? See [When to Escalate](../guides/when-to-escalate.md)

</details>

---

## Data handling rules

### All build paths

- [ ] **Use HTTPS (the lock icon in the browser) for everything**

    Every page of your tool should show a lock icon in the browser's address bar. If it does not, your data is being sent unprotected.

    <details><summary>WHY</summary>

    Without HTTPS, anyone on the same network (a coffee shop, a school) can read the data your tool sends and receives. This includes passwords, personal information, and anything else your users type.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Open your tool in a browser
    2. Look at the address bar — it should start with `https://` and show a lock icon
    3. If it starts with `http://` (no "s"), your data is not encrypted
    4. Most modern hosting tools (Replit, Vercel, Netlify) provide HTTPS automatically. If yours does not, contact your reviewer.

    </details>

- [ ] **Do not store data you do not need**

    If your tool does not need someone's date of birth, do not ask for it. Every piece of data you collect is data you must protect.

    <details><summary>WHY</summary>

    Data you do not have cannot be stolen. The safest way to protect information is to never collect it in the first place.

    </details>

- [ ] **Do not send data to services you have not approved**

    If your tool sends data to an external API, you need to know where that data goes and who has access to it.

    <details><summary>WHY</summary>

    AI tools sometimes send data to third-party services for processing. If you did not choose and approve that service, you do not know what happens to your data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. List every external service your tool connects to (AI APIs, databases, analytics, etc.)
    2. Check each one against your company's [Approved Tools](../client-config/approved-tools.md) list
    3. If any service is not on the approved list, stop and get approval before shipping

    </details>

---

### Yellow: Standard Build (and above)

- [ ] **All user inputs are validated before processing**

    If a field expects a number, it should reject text. If a field expects an email, it should reject "hello."

    <details><summary>WHY</summary>

    Unvalidated input is the most common way attackers exploit tools. It can also cause your tool to crash or show wrong data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Find every form, text field, or input in your tool
    2. Try typing something unexpected in each one (text in a number field, symbols in a name field, an extremely long string)
    3. The tool should show a clear message explaining what is expected — not crash or accept bad data silently

    </details>

- [ ] **Error messages never show technical details to users**

    Users should see "Something went wrong. Please try again or contact support." Not a stack trace, database name, or file path.

    <details><summary>WHY</summary>

    Technical error messages tell attackers exactly how your tool is built, what database you use, and where to find vulnerabilities. They are a roadmap for exploitation.

    </details>

---

### Orange: Reviewed Build (and above)

- [ ] **Personal data is encrypted at rest and in transit**

    "At rest" means stored in a database. "In transit" means sent between the user's browser and your server. Both need encryption.

    <details><summary>WHY</summary>

    If someone gains access to your database or intercepts network traffic, encrypted data is unreadable without the key. Unencrypted data is immediately exposed.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. **In transit:** Confirmed if you use HTTPS (checked above)
    2. **At rest:** Check your database provider's documentation — most modern services (Supabase, Firebase, AWS RDS) encrypt by default. Confirm this is enabled.
    3. If you are not sure, flag it in your [Review Request](../forms/review-request.md) for your technical reviewer to verify

    </details>

- [ ] **Access controls: users can only see their own data**

    If User A logs in, they must not be able to see User B's information. Not through the interface, not by changing the URL, not through the API.

    <details><summary>WHY</summary>

    This is one of the most common security failures in web applications. It is easy to miss because the tool "works" — it just shows the wrong person's data.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Create two test accounts
    2. Log in as Account A and note the URL when viewing personal data
    3. Log in as Account B and paste Account A's URL — you should NOT see Account A's data
    4. If you can see another account's data, stop and fix this before shipping

    </details>

- [ ] **Data retention: define how long data is kept and when it is deleted**

    Decide before you launch: how long do you keep user data? What happens when that period ends? Document it.

    <details><summary>WHY</summary>

    Keeping data forever increases your risk. Many regulations require you to delete data when you no longer need it.

    </details>

- [ ] **Third-party services: list every external service that receives data**

    Create a written list of every service your tool sends data to, what data it sends, and why.

    <details><summary>WHY</summary>

    You cannot protect data you do not know is leaving your system. This list is required for security reviews and compliance audits.

    </details>

---

### Red: Protected Build

- [ ] **Privacy impact assessment completed**

    A structured review of what personal data you collect, why, how it is stored, who can access it, and when it is deleted. Use a template from your compliance team or see [ROLES.md](../client-config/roles.md) for who can help.

    <details><summary>WHY</summary>

    For tools handling protected data (especially data about minors), a privacy impact assessment may be a legal requirement, not just a best practice.

    </details>

- [ ] **Age-appropriate design (for student-facing tools)**

    If your tool is used by or collects data about anyone under 18:

    - No behavioral tracking or profiling
    - No data sharing with third parties beyond what is strictly necessary
    - Parental or guardian notification if required by policy
    - Default privacy settings set to maximum protection

    <details><summary>WHY</summary>

    Children and young people have special legal protections. In the US, COPPA applies to children under 13. In the EU, GDPR Article 8 sets thresholds at 13-16 depending on the country. Your company policy may set stricter limits.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. List every piece of data your tool collects about users under 18
    2. For each item: is it strictly necessary for the tool to function? If not, remove it
    3. Check if your tool uses any analytics or tracking — disable for minors
    4. Check your company's policy on parental notification
    5. If unsure about any of these, escalate to your [designated reviewer](../client-config/roles.md)

    </details>

- [ ] **GDPR/COPPA compliance verified with designated reviewer**

    Your designated reviewer (not you) confirms that the tool meets applicable privacy regulations for your users and jurisdiction.

    <details><summary>WHY</summary>

    Privacy compliance is a specialist skill. Even well-meaning builders can miss requirements. This is why Red builds require sign-off from a designated reviewer.

    </details>

- [ ] **Incident response plan documented**

    Before you go live, write down: what happens if data is exposed? Who gets notified? What is the first action? Where are the credentials to shut things down? Use the [Incident Report](../forms/incident-report.md) template.

    <details><summary>WHY</summary>

    When something goes wrong, you do not have time to figure out what to do. Having a plan means you respond in minutes, not hours.

    </details>

    <details><summary>HOW TO CHECK</summary>

    1. Open your incident response plan (or create one using the [Incident Report template](../forms/incident-report.md))
    2. Can you answer: who is called first? How do you turn the tool off? Where are the access credentials?
    3. If any of these are blank, fill them in now

    </details>

- [ ] **Data processing agreement with all third-party services**

    If your tool sends personal or protected data to an external service, you need a written agreement with that service about how they handle your data.

    <details><summary>WHY</summary>

    You are responsible for your users' data even after you send it to someone else. A data processing agreement makes the third party legally accountable too.

    </details>

---

## Authentication and access

### Orange: Reviewed Build (and above)

- [ ] **Users must log in to access personal or sensitive features**

    Public pages (marketing, documentation) can be open. Anything showing personal data requires a login.

    <details><summary>WHY</summary>

    Without a login, anyone with the URL can access your users' data.

    </details>

- [ ] **Passwords meet minimum strength requirements**

    Minimum 8 characters (15+ recommended). Block commonly compromised passwords. Do not require special characters — length matters more than complexity.

    <details><summary>WHY</summary>

    Current guidance from NIST (SP 800-63B) recommends longer passwords over complex ones. A passphrase like "correct horse battery staple" is stronger and more memorable than "P@ssw0rd!".

    </details>

- [ ] **Sessions expire after inactivity**

    If someone walks away from their computer, the tool should log them out after a reasonable period (e.g., 30 minutes for standard tools, 15 minutes for sensitive data).

    <details><summary>WHY</summary>

    An unlocked session on an unattended computer is an open door to someone's data.

    </details>

### Red: Protected Build

- [ ] **Multi-factor authentication for admin access**

    Anyone who can change settings, view all users' data, or modify the tool itself must use multi-factor authentication (a second verification step beyond a password).

    <details><summary>WHY</summary>

    Admin accounts are the highest-value target. If an attacker gets one admin password, MFA prevents them from accessing the system.

    </details>

- [ ] **Audit log: who accessed what and when**

    Keep a record of every login, every data access, and every change to settings. This log must not be editable by the people it tracks.

    <details><summary>WHY</summary>

    If something goes wrong, the audit log tells you what happened, when, and who was involved. Without it, you are investigating blind.

    </details>

---

## What to do if you think something is wrong

Stop. Do not try to fix security issues alone.

Read [When to Escalate](../guides/when-to-escalate.md) and contact your [designated reviewer](../client-config/roles.md) immediately. It is always better to ask and be wrong than to stay silent and be right.
