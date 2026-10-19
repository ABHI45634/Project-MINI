# MailMuse

> **Your AI Copilot for Internship Applications.**  
> *Designed specifically for B.Tech students and fresh graduates.*

---

## 1. What is MailMuse?

**MailMuse** is an intelligent internship copilot built to solve the real-world workflow challenges faced by engineering students. Rather than acting as a generic chatbot or passive email summarizer, MailMuse actively guides students through the complete end-to-end lifecycle:

$$\text{FIND} \longrightarrow \text{MATCH} \longrightarrow \text{PREPARE} \longrightarrow \text{APPLY} \longrightarrow \text{TRACK} \longrightarrow \text{FOLLOW UP}$$

---

## 2. The Real-World Problem

Engineering students and fresh graduates apply to dozens of internship openings every season, but face critical friction points:
- **Noise & Irrelevance**: Sifting through hundreds of posts with vague eligibility.
- **Mysterious Rejections**: Not knowing whether their skills actually meet employer expectations.
- **Blind Skill Gaps**: Applying without realizing which tools or libraries are missing from their resumes.
- **Generic Applications**: Sending repetitive, copy-pasted cover letters that get ignored by recruiters.
- **Lost Pipeline & Deadlines**: Forgetting online assessment (OA) deadlines or interview slots.
- **Recruiter Radio Silence**: Missing timely opportunities to send polite follow-ups.

---

## 3. The Solution

MailMuse delivers an intelligent, human-in-the-loop assistant that:
1. **Reads & Structures Resumes**: Extracts candidate education, CGPA, projects, and skills without hallucination.
2. **Calculates Explainable Smart Match Scores**: Transparently breaks down why a candidate matches (skills, degree, batch) rather than providing arbitrary AI numbers.
3. **Identifies Skill Gaps**: Pinpoints missing technologies and recommends concrete preparation steps.
4. **Drafts Fact-Grounded Applications**: Generates tailored cover letters and cold outreach messages using *strictly* verified profile achievements.
5. **Enforces Readiness Checks**: Prevents incomplete applications through a 5-point verification checklist.
6. **Guards Deadlines & Follow-ups**: Extracts deadlines from recruiter emails and reminds students when applications go unanswered.

---

## 4. Key & Unique Features

### Unique Feature #1: Smart Match Score
- **Explainable Scoring**: Clearly displays matched skills ($\checkmark$ Python, $\checkmark$ SQL, $\checkmark$ React) and qualification alignment.
- **AI-Assisted Indicator**: Explicitly framed as an intelligent guideline, never a false guarantee of hiring.

### Unique Feature #2: Skill Gap Analyzer
- **Direct Side-by-Side Comparison**: Candidate skills vs. Employer requirements.
- **Actionable Preparation Advice**: e.g., *"Consider reviewing Redis caching & distributed concurrency basics before interviewing."*

### Unique Feature #3: Personalized Application Writer
- **Fact-Strict Generation**: Differentiates Cover Letters, Recruiter Cold Emails, and Short Web-Form Pitches.
- **Anti-Hallucination Guarantee**: Strictly restricted to candidate's verified college, CGPA, and actual projects.

### Unique Feature #4: Application Readiness Check
- Pre-submission readiness verification across 5 pillars:
  - Resume Profile Completeness ($\checkmark$ Ready)
  - Skills Fit Threshold ($\checkmark$ Good Match)
  - Tailored Cover Letter / Pitch ($\checkmark$ Ready)
  - Eligibility & Batch Window ($\checkmark$ Appears eligible)
  - Code Portfolio / GitHub Link ($\checkmark$ Verified)

### Unique Feature #5: 9-Stage Application Tracker
- Comprehensive pipeline:
  `Discovered` $\rightarrow$ `Shortlisted` $\rightarrow$ `Ready to Apply` $\rightarrow$ `Applied` $\rightarrow$ `Assessment` $\rightarrow$ `Interview` $\rightarrow$ `Awaiting Response` $\rightarrow$ `Offer` $\rightarrow$ `Rejected`.
- Interactive Kanban board and tabular views with search and status switches.

### Unique Feature #6: Follow-Up Intelligence
- Scans applications in *Awaiting Response* after 5–14 days.
- Prompts students: *"Would you like to prepare a follow-up for ABC Technologies?"*
- Generates courteous, professional follow-up inquiries.

### Feature #7: Email Intelligence & Recruiter Parser
- Extracts company, role, detected stage, priority (`HIGH`/`MEDIUM`/`LOW`), action item, and interview/assessment dates from recruiter communications.
- One-click synchronization with the Application Tracker and Deadlines Guardian.

### Feature #8: Deadline Guardian
- Tracks Coding Assessments (HackerEarth, HackerRank, etc.), Technical Interviews, Application Deadlines, and Document Submissions.
- Export to `.ics` calendar format with in-app reminder toggles.

### Feature #9: Natural Language AI Command Box
- Conversational command center supporting prompts like:
  - *"Find 10 Python internships"*
  - *"Show my best matches"*
  - *"Which applications need follow-up?"*
  - *"Show upcoming interviews"*
  - *"Show my skill gaps"*

---

## 5. Technology Stack

### Interactive Full-Stack Applet (Port 3000)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend**: Express on Node.js (with Vite middleware integration).
- **AI Inference**: `@google/genai` TypeScript SDK (`gemini-3.8-flash`) with client-side deterministic fallback engine.

### Python Streamlit Application (`mailmuse/`)
- **Framework**: Streamlit
- **Language**: Python 3.10+
- **Data & Config**: SQLite / JSON, `python-dotenv`, `pydantic`
- **Testing**: `pytest`

---

## 6. Project Structure

```text
├── index.html                   # HTML entry point with synchronized metadata
├── metadata.json                # AI Studio application metadata
├── package.json                 # Node dependencies and scripts
├── server.ts                    # Full-stack Express server + Gemini proxy routes
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
│
├── src/
│   ├── types.ts                 # Domain models (Internship, UserProfile, etc.)
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Master application orchestrator & state
│   ├── index.css                # Tailwind CSS v4 styling & typography
│   ├── data/
│   │   └── demoData.ts          # Realistic student profile & 12+ verified internships
│   ├── services/
│   │   ├── aiService.ts         # NLP command processor & email/resume parsers
│   │   ├── matchingService.ts   # Explainable Smart Match algorithm
│   │   └── applicationService.ts# Fact-grounded Cover Letter & Follow-up generator
│   └── components/
│       ├── Sidebar.tsx          # 9-section student-friendly navigation
│       ├── HeaderCommandBar.tsx # AI Natural Language command center
│       ├── DashboardView.tsx    # Metrics, workflow pipeline & urgent actions
│       ├── FindInternshipsView.tsx # Search, filters, match chips & listings
│       ├── ResumeView.tsx       # Resume file upload, text extraction & form editor
│       ├── MatchAnalysisView.tsx# Match score breakdown & Skill Gap Analyzer
│       ├── ActionCenterView.tsx # Recruiter Follow-Up & Email Intelligence
│       ├── ApplicationsView.tsx # 9-stage pipeline Kanban & Table view
│       ├── DeadlinesView.tsx    # Deadline Guardian & .ics calendar export
│       ├── AiWriterView.tsx     # Personalized Application Writer & Readiness
│       ├── SettingsView.tsx     # Demo mode controls & JSON backup/restore
│       └── HumanApprovalModal.tsx # Strict human confirmation before applying
│
└── mailmuse/                    # Standalone Python / Streamlit Package
    ├── app.py                   # Streamlit web application
    ├── config.py                # Python configuration & environment loader
    ├── requirements.txt         # Python dependencies
    ├── data/
    │   ├── demo_internships.json# Sample realistic internship database
    │   └── demo_emails.json     # Sample recruiter emails
    ├── services/
    │   ├── ai_service.py        # Python NLP agent logic
    │   ├── internship_service.py# Listing filtering and discovery
    │   ├── matching_service.py  # Python match score implementation
    │   ├── application_service.py# Python cover letter generator
    │   └── followup_service.py  # Python follow-up email drafts
    ├── utils/
    │   ├── resume_parser.py     # Deterministic text parser
    │   ├── email_parser.py      # Recruiter email parser
    │   └── validators.py        # Input sanity checks
    └── tests/
        ├── test_matching.py     # Pytest test cases for matching
        └── test_utils.py        # Pytest test cases for parsers
```

---

## 7. How to Run

### Option A: Interactive Full-Stack React + Node (Port 3000)

```bash
# Install dependencies
npm install

# Run the dev server (Vite + Express backend proxy)
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Option B: Standalone Python Streamlit Application

```bash
# Navigate to the mailmuse directory or root
cd mailmuse

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run the Streamlit application
streamlit run app.py
```

---

## 8. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Gemini API Key (injected automatically in AI Studio)
GEMINI_API_KEY="your_api_key_here"

# Application URL
APP_URL="http://localhost:3000"

# Optional OpenAI API Key for Python Streamlit variant
OPENAI_API_KEY="your_openai_api_key"
```

---

## 9. Demo Mode

MailMuse includes a comprehensive **Demo Mode** enabled by default:
- Preloaded with a realistic B.Tech CSE candidate: **Rohan Sharma** (DTU, Class of 2026, CGPA 8.85, projects in Python/FastAPI, React, and WebSockets).
- 12 verified internship listings across Google, Microsoft, Razorpay, Swiggy, Cred, Linear, Postman, Zerodha, TCS Research, etc.
- 6 active applications across pipeline stages (`Applied`, `Interview`, `Assessment`, `Awaiting Response`, `Shortlisted`, `Ready to Apply`).
- 4 realistic recruiter emails and 5 upcoming deadlines.
- Clearly labeled **DEMO MODE** badge with a 1-click **Reset to Clean Demo State** button.

---

## 10. Human-in-the-Loop Approval Principle

MailMuse strictly obeys the safety constitution:
- **Search, Analyze, Compare, Recommend, Generate, Organize, Track**: Automated and copilot-assisted.
- **Send Emails, Submit Applications, or Schedule External Events**: Always requires explicit student confirmation via the **Human Approval Modal**.

---

## 11. Testing

### Run TypeScript & React Verification
```bash
npm run lint
npm run build
```

### Run Python Pytest Suite
```bash
cd mailmuse
pytest tests/
```

---

## 12. Security & Privacy
- **Zero API Key Exposure**: All inference requests pass through the backend proxy `/api/gemini/*`.
- **Anti-Hallucination**: No candidate skills, past experiences, or metrics are ever fabricated.
- **Portability**: Complete student data can be exported and imported locally as standard JSON.
