# UK & EU Regulatory Reference for Springpod

> Last updated: 2026-03-10
> Scope: Regulations applicable to a UK EdTech company processing data of users aged 13+, using AI in student-facing features, and operating across 4000+ schools.

---

## 1. Data Protection & Privacy

### 1.1 UK General Data Protection Regulation (UK GDPR)

| Field | Detail |
|---|---|
| **Full name** | UK General Data Protection Regulation (retained EU law, as amended by the Data (Use and Access) Act 2025) |
| **Covers** | How organisations collect, process, store, and share personal data of individuals in the UK. The foundational data protection law. |
| **Why it applies to Springpod** | Springpod processes personal data of 1M+ students (including minors), schools, employers, and universities. Processing children's data triggers heightened obligations under Articles 8 and 25. |
| **Key requirements for builders** | 1) Have a lawful basis before collecting any personal data. 2) Collect only what you need (data minimisation). 3) Tell users clearly what data you collect and why (privacy notice). 4) Let users access, correct, or delete their data on request. 5) Children under 13 need parental consent for online services. 6) Keep data secure with appropriate technical measures. 7) Report breaches to the ICO within 72 hours. 8) Conduct Data Protection Impact Assessments for high-risk processing (e.g., AI profiling of minors). |
| **Jurisdiction** | UK |
| **Source** | [UK GDPR on legislation.gov.uk](https://www.legislation.gov.uk/eur/2016/679/contents) / [ICO Guide to UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/) |

---

### 1.2 Data Protection Act 2018 (DPA 2018)

| Field | Detail |
|---|---|
| **Full name** | Data Protection Act 2018 |
| **Covers** | The UK's domestic implementation framework for GDPR. Supplements the UK GDPR with additional provisions on law enforcement processing, intelligence services, and specific exemptions. |
| **Why it applies to Springpod** | DPA 2018 is the statutory basis for the Children's Code (Age Appropriate Design Code) which directly governs how Springpod designs its platform for under-18s. It also sets the age of consent for data processing at 13 in England. |
| **Key requirements for builders** | 1) Follow all UK GDPR requirements (DPA 2018 works alongside it). 2) Be aware of the specific UK exemptions (e.g., research, education). 3) The age of digital consent in the UK is 13. 4) Must comply with the Age Appropriate Design Code (see 1.4). |
| **Jurisdiction** | UK |
| **Source** | [Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents) |

---

### 1.3 Data (Use and Access) Act 2025 (DUA 2025)

| Field | Detail |
|---|---|
| **Full name** | Data (Use and Access) Act 2025 |
| **Covers** | Amends the UK GDPR and DPA 2018. Introduces new codes of practice for EdTech, AI, and automated decision-making. Strengthens children's data protections. |
| **Why it applies to Springpod** | Directly introduces a statutory code of practice for EdTech. Requires services to give children a higher level of protection accounting for age and developmental stage (amended Article 25 UK GDPR). Creates a new EdTech-specific code of practice following research showing widespread misuse of children's data. |
| **Key requirements for builders** | 1) Design products with children's higher protection level built in. 2) Have a complaints procedure for data protection matters — acknowledge complaints within 30 days. 3) Watch for the forthcoming EdTech code of practice from the ICO. 4) Review lawful basis for processing, especially for AI training data. 5) New automated decision-making rules are coming (Spring 2026). |
| **Jurisdiction** | UK |
| **Source** | [DUA 2025 on Parliament.uk](https://bills.parliament.uk/bills/3825) / [ICO summary](https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/) |

---

### 1.4 ICO Age Appropriate Design Code (Children's Code)

| Field | Detail |
|---|---|
| **Full name** | Age Appropriate Design: A Code of Practice for Online Services (commonly "Children's Code") |
| **Covers** | 15 standards that online services likely to be accessed by children must follow when processing their data. Enforceable since September 2021. |
| **Why it applies to Springpod** | Springpod is an information society service (ISS) accessed by children aged 13+. The platform processes children's personal data for careers education. EdTech services used in/by schools satisfy the ISS definition and are in scope. |
| **Key requirements for builders** | The 15 standards require: 1) **Best interests of the child** as primary consideration. 2) **Data Protection Impact Assessments** for new features. 3) **Age-appropriate application** — recognise different needs at different ages. 4) **Transparency** — privacy info must be clear for the child's age. 5) **Detrimental use** — don't use children's data in ways detrimental to their wellbeing. 6) **Policies and community standards** — publish and enforce. 7) **Default settings** — must be "high privacy" by default. 8) **Data minimisation** — collect only the minimum needed. 9) **Data sharing** — don't share children's data unless you can demonstrate a compelling reason. 10) **Geolocation** — off by default. 11) **Parental controls** — age-appropriate. 12) **Profiling** — off by default unless compelling reason. 13) **Nudge techniques** — do not nudge children to weaken privacy settings or provide unnecessary data. 14) **Connected toys/devices** — N/A for Springpod. 15) **Online tools** — provide accessible tools for children to exercise their data rights. |
| **Jurisdiction** | UK |
| **Source** | [ICO Children's Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/) / [FAQ on 15 standards](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/faqs-on-the-15-standards-of-the-children-s-code/) |

**Enforcement:** Fines up to 4% of global annual turnover or suspension of UK operations.

---

### 1.5 Privacy and Electronic Communications Regulations 2003 (PECR)

| Field | Detail |
|---|---|
| **Full name** | The Privacy and Electronic Communications (EC Directive) Regulations 2003 |
| **Covers** | Rules for electronic marketing (email, SMS, calls), cookies, and communication security. Sits alongside the UK GDPR. |
| **Why it applies to Springpod** | Springpod sends electronic communications to students, schools, employers, and universities. Any marketing emails, SMS notifications, or use of cookies/tracking on the platform must comply. |
| **Key requirements for builders** | 1) **Cookies:** Get consent before setting non-essential cookies; provide clear info about what each cookie does. 2) **Marketing emails/SMS to individuals:** Must have prior opt-in consent (not pre-ticked boxes). 3) **Soft opt-in exception:** You can email existing customers about similar products without consent, but must offer easy opt-out. 4) **Marketing to corporate subscribers (B2B to schools):** Rules are less strict — no prior consent needed for emails to generic corporate addresses (e.g., info@school.ac.uk), but individual named contacts need consent. 5) **Under-18s:** Extra caution — consent from parents may be needed. 6) **Every marketing message** must identify the sender and provide an opt-out mechanism. |
| **Jurisdiction** | UK |
| **Source** | [ICO Guide to PECR](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/) / [PECR legislation](https://www.legislation.gov.uk/uksi/2003/2426/contents) |

---

### 1.6 ICO Guidance on Children and the UK GDPR

| Field | Detail |
|---|---|
| **Full name** | ICO Guidance: Children and the UK GDPR |
| **Covers** | Detailed practical guidance on all aspects of processing children's personal data under UK GDPR. |
| **Why it applies to Springpod** | Provides the authoritative interpretation of how UK GDPR applies to Springpod's core user base (minors aged 13-17). |
| **Key requirements for builders** | 1) If you rely on consent as your lawful basis, children aged 13+ can consent for themselves in the UK; under 13 requires parental consent. 2) Privacy notices for children must use clear, plain language appropriate to their age. 3) Children have the same data rights as adults (access, erasure, etc.). 4) Right to erasure is especially strong for data collected during childhood. 5) Profiling children for marketing is strongly discouraged. |
| **Jurisdiction** | UK |
| **Source** | [ICO: Children and the UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/) |

---

### 1.7 ICO Direct Marketing Guidance

| Field | Detail |
|---|---|
| **Full name** | ICO Direct Marketing Guidance (December 2022, under review) |
| **Covers** | Comprehensive guidance on lawful direct marketing under UK GDPR and PECR, including specific sections on marketing to children and B2B marketing. |
| **Why it applies to Springpod** | Springpod markets to students (individuals, some under 18), schools (B2B), employers (B2B), and universities (B2B). Each channel has different rules. |
| **Key requirements for builders** | 1) Direct marketing to children carries "significant potential for harm" — exercise extra caution. 2) Children have the right to object to direct marketing. 3) You must stop processing for direct marketing if anyone objects. 4) B2B marketing to schools: can use legitimate interests as lawful basis, but named individuals still need consent for electronic marketing under PECR. 5) Keep auditable records of consent. |
| **Jurisdiction** | UK |
| **Source** | [ICO Direct Marketing Guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/) / [ICO: Marketing to children](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/what-if-we-want-to-target-children-with-marketing/) |

---

## 2. Education-Specific

### 2.1 Gatsby Benchmarks

| Field | Detail |
|---|---|
| **Full name** | Gatsby Benchmarks of Good Career Guidance |
| **Covers** | Eight benchmarks defining world-class careers guidance in English schools, colleges, and ITPs. Based on international evidence. Used in 4,700+ institutions. |
| **Why it applies to Springpod** | Springpod's virtual work experience and careers education services directly help schools meet multiple Gatsby Benchmarks (especially Benchmarks 5: Encounters with Employers and Employees, 6: Experiences of Workplaces, and 7: Encounters with Further and Higher Education). Springpod's value proposition is tied to schools achieving these benchmarks. |
| **Key requirements for builders** | The 8 benchmarks: 1) A stable careers programme. 2) Learning from career and labour market information. 3) Addressing the needs of each pupil. 4) Linking curriculum learning to careers. 5) Encounters with employers and employees. 6) Experiences of workplaces. 7) Encounters with further and higher education. 8) Personal guidance. **Updated Sept 2025** with new themes: careers at the heart of education, inclusion for every young person, meaningful encounters, parent/carer engagement. Build tools that help schools evidence and track progress against these benchmarks. |
| **Jurisdiction** | England (not statutory UK-wide, but widely adopted) |
| **Source** | [Gatsby Benchmarks](https://www.gatsbybenchmarks.org.uk/) / [Careers & Enterprise Company](https://www.careersandenterprise.co.uk/educators/gatsby-benchmarks/) |

---

### 2.2 DfE Statutory Careers Guidance

| Field | Detail |
|---|---|
| **Full name** | Careers guidance and access for education and training providers (DfE statutory guidance) |
| **Covers** | Legal requirements for schools to provide independent careers guidance and give education/training providers access to pupils (the "Baker Clause" / Provider Access Legislation). |
| **Why it applies to Springpod** | Springpod acts as a provider of careers education experiences. Schools have a legal duty to give providers like Springpod access to pupils in years 8-13. The statutory guidance references Gatsby Benchmarks that Springpod helps schools meet. |
| **Key requirements for builders** | 1) Schools must provide at least 6 encounters with providers of technical education and apprenticeships during years 8-13. 2) Schools must publish a Provider Access Policy. 3) Careers guidance must be impartial (not biased toward any route). 4) From September 2025, updated Gatsby Benchmarks are the expected framework. 5) Tools should help schools demonstrate compliance with the provider access duty. |
| **Jurisdiction** | England |
| **Source** | [DfE Careers Guidance](https://www.gov.uk/government/publications/careers-guidance-provision-for-young-people-in-schools/careers-guidance-and-access-for-education-and-training-providers) |

---

### 2.3 DfE Generative AI Product Safety Expectations

| Field | Detail |
|---|---|
| **Full name** | Generative AI: Product Safety Standards (DfE, January 2025; updated title: "Product Safety Standards") |
| **Covers** | Safety capabilities and features that generative AI products must meet to be considered safe for use in educational settings. Aimed at EdTech developers and suppliers to schools/colleges. |
| **Why it applies to Springpod** | Springpod uses AI in student-facing features (e.g., AI interview coach). Any generative AI feature used by students in an educational context must meet these standards. Referenced by KCSIE 2025 (paragraph 143). |
| **Key requirements for builders** | 1) **Content safety:** Reliably prevent access to harmful/inappropriate content. 2) **Activity logs:** Maintain robust logs for safeguarding review. 3) **Anti-manipulation:** Secure against malicious use or exposure to harm. 4) **Transparency:** Prioritise transparency and child safety in design. 5) **No anthropomorphisation:** Do not imply emotions, consciousness, or personhood in AI. 6) **Cognitive development:** Mitigate potential for cognitive deskilling or developmental harm. 7) **Emotional development:** Mitigate potential for emotional dependence on AI. 8) **IP protection:** Do not use student inputs for model training or commercial purposes without permission. 9) **Filtering & monitoring:** Ensure AI features are filterable and monitorable by schools. |
| **Jurisdiction** | England |
| **Source** | [DfE Generative AI Product Safety Standards](https://www.gov.uk/government/publications/generative-ai-product-safety-standards/generative-ai-product-safety-standards) |

---

### 2.4 Ofsted Education Inspection Framework

| Field | Detail |
|---|---|
| **Full name** | Education Inspection Framework (EIF), updated November 2025 |
| **Covers** | How Ofsted inspects schools, colleges, and ITPs. Includes evaluation of digital technology use, careers provision, and safeguarding. |
| **Why it applies to Springpod** | Schools using Springpod may be asked by Ofsted to evidence how digital technologies support positive outcomes for pupils. Springpod's tools contribute to schools' careers provision, which Ofsted evaluates. |
| **Key requirements for builders** | 1) EdTech must offer "clear added value" — not just replicate what already works. 2) Focus on embedding technology into teaching practice, not just novelty. 3) The 2025 framework uses a "report card" format across curriculum, leadership, inclusion, and personal development. 4) Build tools that help schools evidence impact on pupil outcomes. |
| **Jurisdiction** | England |
| **Source** | [Ofsted Education Inspection Framework](https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025) |

---

## 3. AI & Technology

### 3.1 EU AI Act

| Field | Detail |
|---|---|
| **Full name** | Regulation (EU) 2024/1689 — the Artificial Intelligence Act |
| **Covers** | Comprehensive EU regulation classifying AI systems by risk level (unacceptable, high, limited, minimal) with corresponding obligations. |
| **Why it applies to Springpod** | **Extraterritorial scope:** If Springpod's AI features are used by anyone in the EU (e.g., EU-based partner universities, students abroad), the AI Act applies regardless of Springpod being a UK company. Educational AI systems are classified as **high-risk** under Annex III. AI interview coaching could be classified as high-risk (AI in employment/education). Emotion recognition in educational settings is **prohibited** unless for medical/safety purposes. |
| **Key requirements for builders** | 1) **High-risk AI (education category):** Must have risk management system, data governance, technical documentation, record-keeping, transparency, human oversight, accuracy/robustness/cybersecurity measures. 2) **Prohibited practices:** No emotion recognition in educational settings; no social scoring; no subliminal manipulation. 3) **Transparency:** Users must be told when they are interacting with AI. 4) **Full compliance deadline:** August 2, 2026 for high-risk systems. 5) **Deployer liability:** Schools deploying third-party EdTech share liability for non-compliant high-risk systems. |
| **Jurisdiction** | EU (extraterritorial — applies to UK companies serving EU markets) |
| **Source** | [EU AI Act](https://artificialintelligenceact.eu/) / [Extraterritorial scope analysis](https://natlawreview.com/article/extraterritorial-scope-eu-ai-act) |

---

### 3.2 UK Pro-Innovation AI Regulatory Framework

| Field | Detail |
|---|---|
| **Full name** | A Pro-Innovation Approach to AI Regulation (DSIT framework) |
| **Covers** | The UK's principles-based, non-statutory approach to AI regulation. Rather than a single AI law, existing regulators (ICO, Ofcom, FCA, etc.) apply five cross-cutting principles to AI within their domains. |
| **Why it applies to Springpod** | Springpod's AI features fall under the jurisdiction of multiple regulators: ICO (data protection in AI), Ofcom (online safety), and DfE (education AI standards). Each will apply the five principles within their domain. |
| **Key requirements for builders** | The five principles: 1) **Safety, security, and robustness.** 2) **Appropriate transparency and explainability.** 3) **Fairness.** 4) **Accountability and governance.** 5) **Contestability and redress.** No single UK AI law yet, but the ICO is developing a statutory code of practice on AI and automated decision-making (expected Spring 2026). |
| **Jurisdiction** | UK |
| **Source** | [DSIT AI Regulation Framework](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach) / [Government response](https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response) |

---

### 3.3 ICO Guidance on AI and Data Protection

| Field | Detail |
|---|---|
| **Full name** | ICO Guidance on AI and Data Protection / ICO AI and Biometrics Strategy (June 2025) |
| **Covers** | How data protection law applies to AI systems. Covers fairness, transparency, accuracy, data minimisation, lawful basis, DPIAs, and automated decision-making. |
| **Why it applies to Springpod** | Springpod's AI interview coach and any other AI-powered features process personal data. The ICO's guidance sets expectations for transparency, bias prevention, and individual rights in AI systems. |
| **Key requirements for builders** | 1) **Transparency:** Tell users when AI is making or influencing decisions about them. 2) **Explainability:** Be able to explain how the AI reached its output in terms the user can understand. 3) **Bias and discrimination:** Test AI systems for bias, especially given the diverse student population. 4) **Rights and redress:** Allow users to contest AI decisions and request human review. 5) **Lawful basis:** Ensure you have a valid lawful basis for using personal data to train or run AI. 6) **DPIAs:** Conduct Data Protection Impact Assessments before deploying AI features. 7) **Agentic AI (Jan 2026 ICO guidance):** If AI acts autonomously, organisations must inform individuals, enable contestation, and ensure meaningful human intervention. |
| **Jurisdiction** | UK |
| **Source** | [ICO AI Guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/) / [ICO AI Strategy](https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/) |

---

## 4. Accessibility

### 4.1 Equality Act 2010

| Field | Detail |
|---|---|
| **Full name** | Equality Act 2010 |
| **Covers** | Prohibits discrimination based on protected characteristics (disability, age, race, etc.). Requires service providers to make "reasonable adjustments" so disabled people are not disadvantaged. |
| **Why it applies to Springpod** | Springpod provides a service to students, some of whom will have disabilities. The platform must be accessible to users with visual, auditory, motor, and cognitive disabilities. Failure to provide an accessible platform could constitute disability discrimination. |
| **Key requirements for builders** | 1) Make "reasonable adjustments" to ensure disabled users can access the service. 2) WCAG 2.2 Level AA is the recognised technical benchmark for demonstrating reasonable adjustments. 3) Consider accessibility from the start of design (not as an afterthought). 4) Test with assistive technologies (screen readers, keyboard navigation, etc.). 5) Provide alternative formats for content where needed. 6) Age is also a protected characteristic — do not discriminate based on age in service provision. |
| **Jurisdiction** | UK (England, Scotland, Wales) |
| **Source** | [Equality Act 2010](https://www.legislation.gov.uk/ukpga/2010/15/contents) / [GOV.UK accessibility requirements](https://www.gov.uk/guidance/meet-the-requirements-of-equality-and-accessibility-regulations) |

---

### 4.2 Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018

| Field | Detail |
|---|---|
| **Full name** | The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 |
| **Covers** | Requires public sector websites and apps to meet WCAG 2.2 Level AA and publish an accessibility statement. |
| **Why it applies to Springpod** | **Does not directly apply** to Springpod as a private company. However: 1) If Springpod receives public funding, it may fall within scope. 2) Schools (public sector bodies) using Springpod may require the platform to meet these standards as part of procurement. 3) The Equality Act 2010 still applies regardless. |
| **Key requirements for builders** | 1) Meet WCAG 2.2 Level AA as best practice even though not legally required for private companies. 2) Publish an accessibility statement. 3) Schools may contractually require compliance as a condition of procurement. 4) Treat this as a competitive advantage and risk mitigation measure. |
| **Jurisdiction** | UK |
| **Source** | [Accessibility Regulations 2018](https://www.legislation.gov.uk/uksi/2018/952/contents) / [GOV.UK guidance](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps) |

---

### 4.3 Web Content Accessibility Guidelines (WCAG) 2.2

| Field | Detail |
|---|---|
| **Full name** | Web Content Accessibility Guidelines (WCAG) 2.2, Level AA |
| **Covers** | International standard (W3C) for making web content accessible. Four principles: Perceivable, Operable, Understandable, Robust. |
| **Why it applies to Springpod** | WCAG 2.2 AA is the recognised technical standard referenced by both the Equality Act 2010 and the Accessibility Regulations 2018. It is the de facto benchmark for UK digital accessibility compliance. |
| **Key requirements for builders** | 1) All images need alt text. 2) Sufficient colour contrast (4.5:1 for normal text). 3) All functionality accessible via keyboard. 4) Forms have proper labels. 5) Content is readable by screen readers. 6) Focus indicators are visible. 7) No content that flashes more than 3 times per second. 8) Error messages are clear and helpful. 9) Pages have proper heading hierarchy. 10) New in 2.2: minimum target size for interactive elements (24x24 CSS pixels), focus appearance criteria. |
| **Jurisdiction** | International standard (referenced by UK law) |
| **Source** | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |

---

## 5. Security Standards

### 5.1 NCSC Cyber Essentials

| Field | Detail |
|---|---|
| **Full name** | Cyber Essentials (and Cyber Essentials Plus) — NCSC-backed certification scheme |
| **Covers** | A UK government-backed framework of five technical security controls designed to protect against 80% of the most common cyber attacks. |
| **Why it applies to Springpod** | Schools and government bodies increasingly require Cyber Essentials certification from their suppliers. Processing data of 1M+ minors makes robust security essential. Cyber Essentials is often a procurement requirement for EdTech selling to schools. |
| **Key requirements for builders** | The five controls: 1) **Firewalls** — secure your internet connection. 2) **Secure configuration** — choose secure settings for devices and software. 3) **Access control** — control who has access to data and services. 4) **Malware protection** — protect against viruses and other malware. 5) **Security update management** — keep devices and software up to date. **Cyber Essentials Plus** adds independent vulnerability testing. Updated requirements published April 2025 (v3.2). |
| **Jurisdiction** | UK |
| **Source** | [NCSC Cyber Essentials](https://www.ncsc.gov.uk/cyberessentials/overview) / [Requirements v3.2 (PDF)](https://www.ncsc.gov.uk/files/cyber-essentials-requirements-for-it-infrastructure-v3-2.pdf) |

---

### 5.2 NCSC Password Guidance

| Field | Detail |
|---|---|
| **Full name** | NCSC Password Administration for System Owners |
| **Covers** | UK-specific guidance on password policies, replacing traditional complexity-based approaches. This is the UK equivalent of NIST SP 800-63B but with notably different recommendations. |
| **Why it applies to Springpod** | Springpod authenticates 1M+ users including minors. Password policy directly affects security posture and user experience. |

#### NCSC vs NIST: Key Differences

| Area | NCSC Recommendation | NIST SP 800-63B |
|---|---|---|
| **Password creation** | Use **"three random words"** method (e.g., "coffeetreeswim") | Minimum 8 characters, check against breach lists |
| **Complexity rules** | **Against** mandatory complexity (uppercase, symbols, etc.) — they encourage poor choices | Similar — discourages composition rules |
| **Password rotation** | **Do not** force regular password changes — only change when compromise is known/suspected | Similar — no periodic rotation |
| **Account lockout** | Lock accounts after **10 failed attempts** | Not specified numerically |
| **Multi-factor auth** | **Strongly recommended** as the most effective additional protection | Required at higher assurance levels |
| **Password managers** | **Recommended** — help users maintain unique passwords per service | Not explicitly addressed the same way |
| **Machine-generated passwords** | Recommended where possible | Recommended |
| **Deny lists** | Block common/breached passwords | Check against breach corpuses |

#### NCSC Key Recommendations Summary

1. **Three random words** for user-created passwords — strong enough and memorable.
2. **No forced complexity** (no mandatory uppercase/symbols) — this encourages predictable substitutions.
3. **No forced rotation** — change passwords only on suspected compromise.
4. **Account lockout** after 10 failed attempts.
5. **Throttle login attempts** to slow down brute force.
6. **Use MFA** wherever possible.
7. **Allow password managers** and encourage their use.
8. **Machine-generated passwords** for system/admin accounts.
9. **Monitor for breached passwords** using deny lists.
10. **Reduce reliance on passwords overall** — use technical defences and organisational processes.

| **Jurisdiction** | UK |
| **Source** | [NCSC Password Guidance (main collection)](https://www.ncsc.gov.uk/collection/passwords) / [Updating Your Approach](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach) / [Three Random Words](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words) |

---

### 5.3 ISO/IEC 27001

| Field | Detail |
|---|---|
| **Full name** | ISO/IEC 27001:2022 — Information Security Management Systems |
| **Covers** | International standard for establishing, implementing, maintaining, and continually improving an information security management system (ISMS). |
| **Why it applies to Springpod** | While not legally required, ISO 27001 certification is frequently requested by enterprise clients (universities, large employers, multi-academy trusts). It demonstrates mature security governance. It goes beyond Cyber Essentials by requiring risk assessment, policies, and continuous improvement. |
| **Key requirements for builders** | 1) Not a legal requirement but a strong market differentiator. 2) Requires formal risk assessment and treatment. 3) Covers people, processes, and technology. 4) Must be certified by a UKAS-accredited body. 5) Cyber Essentials covers a subset of ISO 27001 controls — they are complementary, not alternatives. |
| **Jurisdiction** | International |
| **Source** | [ISO 27001](https://www.iso.org/standard/27001) / [NCSC comparison](https://www.ncsc.gov.uk/blog-post/cyber-essentials-are-there-any-alternative-standards) |

---

## 6. Safeguarding

### 6.1 Keeping Children Safe in Education (KCSIE)

| Field | Detail |
|---|---|
| **Full name** | Keeping Children Safe in Education 2025 (KCSIE) — DfE statutory guidance |
| **Covers** | Statutory guidance that schools and colleges in England must follow for safeguarding and promoting the welfare of children. Updated annually. |
| **Why it applies to Springpod** | KCSIE 2025 explicitly references DfE's Generative AI Product Safety Expectations (paragraph 143). Schools must ensure EdTech used is appropriately filtered, monitored, and integrated into safeguarding systems. Springpod's tools must be compatible with schools' KCSIE obligations. |
| **Key requirements for builders** | 1) AI products must comply with DfE Generative AI Product Safety Expectations. 2) Platform must support schools' **filtering and monitoring** requirements. 3) Activity logs must be available for safeguarding review. 4) Address misinformation/disinformation as recognised harms (new in 2025). 5) Support schools' cybersecurity requirements: MFA for admin accounts, secure configurations, regular patching. 6) Design AI features so schools can assess them against filtering & monitoring standards. |
| **Jurisdiction** | England |
| **Source** | [KCSIE 2025](https://www.gov.uk/government/publications/keeping-children-safe-in-education--2) |

---

### 6.2 Working Together to Safeguard Children 2023

| Field | Detail |
|---|---|
| **Full name** | Working Together to Safeguard Children 2023 — HM Government statutory guidance |
| **Covers** | Multi-agency guidance on how organisations must work together to safeguard and promote the welfare of children under 18 in England. |
| **Why it applies to Springpod** | Under Section 11 of the Children Act 2004, organisations working with children must ensure their functions have regard to the need to safeguard and promote children's welfare. Springpod, as a service provider to children through schools, falls within this scope. |
| **Key requirements for builders** | 1) Have clear safeguarding policies and procedures. 2) Ensure staff/contractors who interact with children are appropriately vetted. 3) Have a designated safeguarding lead or contact. 4) Know the reporting pathways for concerns about a child. 5) Design systems that support — not hinder — multi-agency information sharing when a child is at risk. 6) Build with a "child-centred approach" as the core principle. |
| **Jurisdiction** | England |
| **Source** | [Working Together 2023](https://www.gov.uk/government/publications/working-together-to-safeguard-children--2) |

---

### 6.3 Online Safety Act 2023

| Field | Detail |
|---|---|
| **Full name** | Online Safety Act 2023 |
| **Covers** | Comprehensive UK law placing duties on online platforms to protect users (especially children) from illegal content and content harmful to children. Regulated by Ofcom. |
| **Why it applies to Springpod** | If Springpod has any user-generated content features (forums, chat, AI-generated responses visible to others), it may be in scope as a "user-to-user service." Even without UGC, search functionality could bring it in scope. The Act's children's safety duties apply to any service "likely to be accessed by children." |
| **Key requirements for builders** | 1) **Children's Risk Assessment:** Must complete a risk assessment for content harmful to children (first assessments were due July 2025). 2) **Age assurance:** Must use "highly effective" age assurance to prevent children accessing harmful content. 3) **Safety duties:** Use proportionate measures to protect children from harmful content. 4) **Illegal content duty:** Prevent and remove illegal content (e.g., CSAM, terrorism). 5) **Transparency reporting:** May need to produce transparency reports for Ofcom. 6) **Enforcement:** Ofcom can fine up to 10% of global revenue or GBP 18 million (whichever is greater). |
| **Jurisdiction** | UK |
| **Source** | [Online Safety Act 2023](https://www.legislation.gov.uk/ukpga/2023/50) / [Ofcom Children's Codes](https://www.whitecase.com/insight-alert/uk-online-safety-act-protection-children-codes-come-force) / [GOV.UK explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer) |

---

## 7. Marketing & Communications

### 7.1 PECR (Marketing-Specific Rules)

See Section 1.5 above for full PECR details. Key marketing-specific points:

- **Email/SMS to individual students:** Requires prior opt-in consent.
- **Email to schools (generic addresses):** Consent not required but must identify sender and offer opt-out.
- **Email to named teachers/contacts at schools:** Requires consent unless soft opt-in applies.
- **Cookies for marketing/analytics:** Requires informed consent before setting.

---

### 7.2 ASA/CAP Advertising Codes

| Field | Detail |
|---|---|
| **Full name** | UK Code of Non-broadcast Advertising and Direct & Promotional Marketing (CAP Code) / UK Code of Broadcast Advertising (BCAP Code) — administered by the Advertising Standards Authority (ASA) |
| **Covers** | Rules for advertising content, targeting, and marketing to children. For CAP Code purposes, a "child" is under 16. |
| **Why it applies to Springpod** | Springpod advertises to students under 18 and to schools. Any advertising (including online ads, social media, email marketing) must comply with the CAP Code's special protections for under-16s and under-18s. |
| **Key requirements for builders** | 1) **No exploitation:** Ads must not exploit children's credulity, loyalty, vulnerability, or lack of experience. 2) **No pressure:** Must not pressure children to buy or pester parents. 3) **Targeting controls:** Do not target under-16s where protected content is involved. Use the **25% rule** — if more than 25% of the audience is in the protected age group, treat it as child-directed. 4) **Ad labelling:** Enhanced disclosure and labelling required for immersive/integrated marketing directed at under-12s. 5) **Truthful claims:** All claims in ads must be substantiated. 6) **Updated April 2025:** CAP Code amended to align with the Digital Markets, Competition and Consumers Act 2024. |
| **Jurisdiction** | UK |
| **Source** | [ASA/CAP: Children General](https://www.asa.org.uk/advice-online/children-general.html) / [ASA/CAP: Children Targeting](https://www.asa.org.uk/advice-online/children-targeting.html) |

---

## Quick Reference: Applicability Matrix

| Regulation | Legally Binding? | Directly Applies to Springpod? | Penalty for Non-Compliance |
|---|---|---|---|
| UK GDPR | Yes | Yes | Up to 4% global turnover or GBP 17.5M |
| DPA 2018 | Yes | Yes | Same as UK GDPR |
| DUA 2025 | Yes | Yes | Amends UK GDPR penalties |
| Children's Code | Yes (statutory code) | Yes | Up to 4% global turnover |
| PECR | Yes | Yes | Up to GBP 500K |
| Gatsby Benchmarks | No (guidance, but schools are expected to follow) | Indirectly (schools are Springpod's customers) | N/A (reputational) |
| DfE Careers Guidance | Yes (statutory for schools) | Indirectly | N/A for Springpod directly |
| DfE AI Safety Standards | No (guidance/expectations) | Yes (as EdTech supplier) | Reputational; schools may stop purchasing |
| Ofsted EIF | Yes (for schools) | Indirectly | N/A for Springpod directly |
| EU AI Act | Yes (EU law, extraterritorial) | Yes, if serving EU users | Up to EUR 35M or 7% global turnover |
| UK AI Framework | No (principles-based, non-statutory) | Yes (via sectoral regulators) | Via existing regulators (ICO, Ofcom) |
| ICO AI Guidance | Guidance (statutory code forthcoming) | Yes | Via UK GDPR penalties |
| Equality Act 2010 | Yes | Yes | Unlimited compensation in court |
| PSBAR 2018 | Yes (for public sector) | No (unless publicly funded) | Enforcement by EHRC |
| WCAG 2.2 | No (technical standard) | Best practice benchmark | Referenced by Equality Act claims |
| Cyber Essentials | No (voluntary certification) | Recommended (procurement requirement) | N/A (loss of contracts) |
| ISO 27001 | No (voluntary standard) | Recommended | N/A (loss of contracts) |
| NCSC Password Guidance | No (guidance) | Best practice | N/A |
| KCSIE 2025 | Yes (statutory for schools) | Indirectly (as EdTech supplier) | Schools may stop purchasing |
| Working Together 2023 | Yes (statutory) | Yes (Section 11 duty) | Regulatory action |
| Online Safety Act 2023 | Yes | Likely (if UGC/search features) | Up to 10% global revenue or GBP 18M |
| ASA/CAP Codes | Yes (self-regulatory with statutory backing) | Yes | ASA sanctions, referral to Ofcom/CMA |

---

## Upcoming Regulatory Changes to Watch

| Expected Date | Change | Impact |
|---|---|---|
| Spring 2026 | ICO statutory code of practice on AI and automated decision-making | Will set binding rules for Springpod's AI features |
| Spring 2026 | ICO EdTech code of practice (under DUA 2025) | Will set binding rules for EdTech data processing |
| August 2026 | EU AI Act high-risk system requirements enforced | Springpod must comply if any EU users exist |
| February 2026 | Ofcom super-complaints regime guidance | New mechanism for Online Safety Act enforcement |
| Ongoing | NCSC Cyber Essentials v3.2 | Updated technical requirements (published April 2025) |

---

## Sources

### Data Protection & Privacy
- [ICO Children's Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)
- [ICO: Children and the UK GDPR](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/)
- [ICO Guide to PECR](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/)
- [ICO Direct Marketing Guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/)
- [ICO: Marketing to children](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/what-if-we-want-to-target-children-with-marketing/)
- [DUA 2025 on Parliament.uk](https://bills.parliament.uk/bills/3825)
- [ICO DUA 2025 summary](https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/)
- [DUA 2025: EdTech impact analysis (Handley Gill)](https://www.handleygill.co.uk/handley-gill-blog/the-data-use-and-access-act-2025-childrens-personal-data-education-schools-colleges-edtech)
- [9ine: DUA impact on schools and EdTech](https://www.9ine.com/newsblog/the-uk-data-use-and-access-act-what-does-it-mean-for-schools-and-edtech-vendors)

### Education
- [Gatsby Benchmarks](https://www.gatsbybenchmarks.org.uk/)
- [Careers & Enterprise Company: Gatsby Benchmarks](https://www.careersandenterprise.co.uk/educators/gatsby-benchmarks/)
- [DfE Careers Guidance](https://www.gov.uk/government/publications/careers-guidance-provision-for-young-people-in-schools/careers-guidance-and-access-for-education-and-training-providers)
- [DfE Generative AI Product Safety Standards](https://www.gov.uk/government/publications/generative-ai-product-safety-standards/generative-ai-product-safety-standards)
- [Ofsted Education Inspection Framework 2025](https://www.gov.uk/government/publications/education-inspection-framework/education-inspection-framework-for-use-from-november-2025)

### AI & Technology
- [EU AI Act](https://artificialintelligenceact.eu/)
- [EU AI Act extraterritorial scope](https://natlawreview.com/article/extraterritorial-scope-eu-ai-act)
- [EU AI Act impact on UK EdTech (LSMT)](https://lsmt.org.uk/blog/the-eu-ai-act-and-its-impact-on-online-education-implications-for-britain)
- [DSIT AI Framework](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach)
- [ICO AI Guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/)
- [ICO AI and Biometrics Strategy](https://ico.org.uk/about-the-ico/our-information/our-strategies-and-plans/artificial-intelligence-and-biometrics-strategy/)

### Accessibility
- [Equality Act 2010](https://www.legislation.gov.uk/ukpga/2010/15/contents)
- [GOV.UK accessibility requirements](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [UK accessibility regulatory approach (Taylor Wessing)](https://www.taylorwessing.com/en/interface/2025/accessibility/the-uks-regulatory-approach-to-accessibility)

### Security
- [NCSC Cyber Essentials](https://www.ncsc.gov.uk/cyberessentials/overview)
- [NCSC Password Guidance](https://www.ncsc.gov.uk/collection/passwords)
- [NCSC: Updating Your Password Approach](https://www.ncsc.gov.uk/collection/passwords/updating-your-approach)
- [NCSC: Three Random Words](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/three-random-words)

### Safeguarding
- [KCSIE 2025](https://www.gov.uk/government/publications/keeping-children-safe-in-education--2)
- [Working Together 2023](https://www.gov.uk/government/publications/working-together-to-safeguard-children--2)
- [Online Safety Act 2023](https://www.legislation.gov.uk/ukpga/2023/50)
- [Ofcom Children's Protection Codes](https://www.whitecase.com/insight-alert/uk-online-safety-act-protection-children-codes-come-force)

### Marketing
- [ASA/CAP: Children General](https://www.asa.org.uk/advice-online/children-general.html)
- [ASA/CAP: Children Targeting](https://www.asa.org.uk/advice-online/children-targeting.html)
