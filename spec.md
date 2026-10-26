# AI Mystery Room — Master Specification

**Document Type:** Single Source of Truth (SSOT)  
**Development Methodology:** Spec-Driven Development (SDD)  
**Project Name:** AI Mystery Room  
**Version:** 1.0.0  
**Status:** Approved Baseline for Implementation  
**Primary Developer:** Project Owner  
**AI Coding Assistant:** OpenAI Codex  
**Primary AI Provider:** Google Gemini  
**Application Architecture:** MERN Stack (MongoDB, Express.js, React, Node.js)

---

# 1. Project Overview

## 1.1 Purpose

AI Mystery Room is an interactive, AI-powered mystery investigation platform that allows users to create fictional mystery challenges from their own scenarios, stories, or ideas.

The platform uses Google Gemini to transform a user's initial scenario into a complete fictional investigation containing suspects, motives, timelines, clues, evidence, contradictions, and one predetermined culprit.

Users act as investigators. They examine the generated evidence, compare suspect statements, connect clues, and finally identify the culprit.

The application evaluates the user's accusation against the original, hidden investigation solution and provides an explanation of the correct answer.

## 1.2 Core Concept

**User Scenario → AI Investigation → Evidence Room → Investigation → Culprit Selection → Results**

Example:

A user enters:

"During a college technology festival, a prototype disappears from the exhibition room shortly before the final presentation."

The AI generates a fictional case containing:

- Four suspects, each with a motive, background, and alibi.
- A fictional timeline of the disappearance.
- WhatsApp-style conversations between suspects.
- Written witness statements and interview transcripts.
- AI-generated photographs of fictional locations or objects.
- Simulated CCTV footage evidence or a video representation when supported.
- Physical clues, contradictions, and misleading but fair evidence.
- A hidden culprit and an internally consistent explanation.

The user examines the evidence and accuses one suspect.

The system checks the accusation against the original solution and explains why the culprit was responsible.

## 1.3 Product Vision

Build an immersive digital detective experience where every mystery is generated dynamically, every case has a coherent underlying truth, and users solve cases through reasoning rather than random guessing.

The platform should feel like an interactive detective workspace rather than a conventional chatbot.

## 1.4 Core Principles

1. **Consistency:** The culprit, timeline, motives, statements, and clues must agree with the canonical case solution.
2. **Fairness:** The user must have sufficient evidence to reach a reasonable conclusion.
3. **Interactivity:** Users should investigate multiple evidence types before submitting an accusation.
4. **Immersion:** Evidence should resemble realistic investigation artifacts while remaining clearly fictional.
5. **Reliability:** AI generation failures must not create incomplete or contradictory cases.
6. **Privacy:** API keys, hidden solutions, and private investigation data must never be exposed to unauthorized users.
7. **Extensibility:** Future features must fit the existing architecture without requiring a complete rewrite.

---

# 2. Product Scope

## 2.1 MVP — Must Have

The first release must include:

- Landing page.
- Create Mystery page.
- User-provided scenario input.
- Mystery difficulty selection.
- Mystery length selection.
- Gemini-powered investigation generation.
- Suspect profiles.
- Case overview and timeline.
- Evidence Room interface.
- WhatsApp-style fictional message evidence.
- Witness statements and interview transcripts.
- Textual CCTV reports and visual surveillance evidence.
- Generated or otherwise supported fictional evidence images.
- Clue relationships and contradictions.
- Suspect selection and accusation submission.
- Correct/incorrect result evaluation.
- Explanation of the solution after submission.
- Case progress tracking.
- Persistent storage in MongoDB.
- Loading, error, empty, and retry states.
- Responsive design for desktop, tablet, and mobile.
- Secure backend integration with Gemini.
- Input validation and API error handling.

## 2.2 Features to Design for but Not Require in MVP

The architecture should allow future support for:

- User accounts and authentication.
- Saved case collections and investigator profiles.
- Multiple difficulty modes with adjustable scoring.
- Investigation notes and personal theories.
- Hint systems and penalties.
- Timed challenges.
- Leaderboards and achievements.
- Daily mystery challenges.
- Multiplayer investigations.
- User-created public cases.
- AI-generated voice recordings.
- Fully generated CCTV videos.
- Additional AI model providers.
- Case sharing and downloadable reports.

These features must not delay the initial working product.

## 2.3 Out of Scope for MVP

- Real criminal investigations.
- Real police, government, or law-enforcement integrations.
- Real WhatsApp account integrations.
- Access to real CCTV systems.
- Uploading evidence from real criminal investigations for automatic adjudication.
- Real-person impersonation or fabricated evidence presented as authentic.
- Payments or subscription billing.
- Social networking features.

All cases and evidence are fictional and must be labeled accordingly.

---

# 3. User Roles

## 3.1 Guest Investigator

The primary MVP user.

Permissions:

- View the landing page.
- Create a fictional mystery.
- Generate and investigate a case.
- Review suspects, evidence, and timelines.
- Submit a culprit selection.
- View the final result.
- Resume a case using its supported case link or stored browser session.

Guest cases must use a non-guessable identifier. Access to a case must not expose its hidden solution.

## 3.2 Registered Investigator — Future

An authenticated user who can:

- Save cases to an account.
- Resume investigations across devices.
- View past results.
- Maintain investigator statistics.

## 3.3 Administrator — Future

A future administrative role for system monitoring, moderation, and case-generation diagnostics.

Administrative capabilities are not required in the MVP.

---

# 4. Main User Journey

## 4.1 End-to-End Flow

1. The user opens the landing page.
2. The user selects **Create a Mystery**.
3. The user enters a scenario or short story.
4. The user chooses difficulty and investigation length.
5. The frontend validates the form.
6. The backend validates and normalizes the input.
7. The backend requests a structured investigation from Gemini.
8. The backend validates the returned investigation against the case-generation schema and consistency rules.
9. If the investigation is invalid, the backend performs a bounded repair or regeneration attempt.
10. The backend stores the validated case and its protected solution.
11. Evidence-generation tasks run as required.
12. The user enters the Evidence Room when the case is ready.
13. The user examines suspects, evidence, timelines, and contradictions.
14. The user optionally requests an available hint in a future release.
15. The user selects a suspect and submits an accusation.
16. The backend compares the selected suspect ID against the canonical culprit ID.
17. The backend records the result and prevents duplicate scoring.
18. The frontend displays the result, score, and solution explanation.
19. The user can return to the case summary or create another mystery.

## 4.2 Case Lifecycle

Use the following case statuses:

- `draft`
- `generating`
- `processing_evidence`
- `ready`
- `failed`

Use a separate investigation status:

- `in_progress`
- `completed`

A case becomes `ready` only when its required textual content and required MVP evidence have passed validation.

If optional media generation fails, the case may still become ready when the relevant evidence can be represented through a supported fallback.

Never display a case as ready if its core investigation or canonical solution is invalid.

---

# 5. Functional Requirements

## FR-01: Landing Page

The landing page must:

- Explain the AI Mystery Room concept.
- Present a prominent **Create a Mystery** call to action.
- Display a short example of a fictional case.
- Explain the investigation process.
- Communicate that cases are AI-generated fiction.
- Provide a responsive layout.
- Include clear loading and navigation behavior.

Acceptance criteria:

- A user can reach the mystery creation page directly.
- The page works on desktop and mobile.
- No backend secret or API credential appears in the frontend.

## FR-02: Mystery Creation

The creation form must include:

| Field | Requirement |
|---|---|
| Mystery title | Optional; AI may generate one |
| Scenario | Required; 30–5,000 characters |
| Genre | Required; selectable category |
| Difficulty | Easy, Medium, Hard |
| Case length | Short or Standard |
| Evidence style | Default to all available evidence types |
| Submit action | Generate Mystery |

Suggested genres:

- Theft
- Disappearance
- Secret betrayal
- Cyber mystery
- College mystery
- Office mystery
- Locked-room mystery
- General detective mystery

The backend must enforce input limits regardless of frontend validation.

Acceptance criteria:

- Empty or invalid scenarios are rejected.
- Duplicate submission is prevented while generation is in progress.
- The user receives a clear message when generation fails.
- The user can retry without unintentionally creating duplicate cases.

## FR-03: AI Investigation Generation

Gemini must generate a complete fictional investigation from the supplied scenario.

The generation output must contain:

- Case metadata.
- Case synopsis.
- The original scenario.
- Investigation objectives.
- Suspect records.
- Witness records where applicable.
- A chronological event timeline.
- Evidence records.
- Clue and contradiction relationships.
- A canonical culprit.
- The hidden explanation.
- A logical deduction path.
- A final solution narrative.

The backend must require structured JSON output conforming to the application's schema.

Do not rely on free-form prose as the application's internal case data.

Acceptance criteria:

- Every case contains one predetermined culprit.
- Every evidence item has a unique ID.
- All suspect references point to existing suspect IDs.
- The culprit ID refers to a real suspect in the case.
- The timeline and evidence support the canonical solution.
- The case does not require the user to guess information that is absent from the evidence.

## FR-04: Suspect Profiles

Each suspect must contain:

- Unique suspect ID.
- Name.
- Fictional age, where appropriate.
- Role or relationship to the case.
- Short biography.
- Motive.
- Publicly known information.
- Initial statement.
- Alibi.
- Relevant timeline events.
- Evidence connections.
- Suspicious indicators.
- Exculpatory or neutral information.

The suspect interface must not reveal the culprit through a special label, ordering, color, API field, or UI state.

The hidden culprit must not be identifiable from metadata exposed by the client.

## FR-05: Evidence Room

The Evidence Room is the central application interface.

Evidence categories:

1. Messages.
2. Images and photographs.
3. CCTV and surveillance.
4. Witness statements.
5. Interview transcripts.
6. Physical clues.
7. Timeline records.
8. Miscellaneous documents.

The interface must support:

- Browsing all evidence.
- Filtering by category.
- Searching evidence titles and descriptions.
- Opening individual evidence details.
- Viewing related suspects.
- Viewing timestamps where applicable.
- Reading evidence context.
- Returning to the evidence list.
- Identifying contradictions between separate evidence items.

Evidence should be revealed according to the intended case design. Do not reveal the canonical solution before an accusation has been submitted.

## FR-06: Fictional Messaging Evidence

Generate WhatsApp-inspired conversation artifacts without connecting to WhatsApp.

Each message record must include:

- Message ID.
- Conversation ID.
- Fictional sender ID.
- Fictional recipient or group.
- Message text.
- Fictional timestamp.
- Optional attachment reference.
- Evidence context.

The frontend may use a chat-style interface with message bubbles, timestamps, and participant labels.

All message screens must be labeled as fictional evidence. Avoid copying real account identifiers or implying that the messages came from an actual account.

## FR-07: Image Evidence

The application should support visual evidence such as:

- Fictional crime-scene locations.
- Missing objects.
- Objects left at a location.
- Room layouts.
- Fictional surveillance stills.
- Relevant environmental details.

Media generation must be handled by a provider abstraction.

Implementation rules:

- Use a supported image-generation model only when the configured Gemini service or another explicitly configured provider supports image output.
- Do not assume that every Gemini text model can generate images.
- Store generated images in a supported storage service or configured development storage.
- Store image URLs and metadata in MongoDB, not raw image files by default.
- Use placeholders with explanatory labels when image generation is unavailable.
- Never silently replace an image with an unrelated visual.

Image evidence must be consistent with the written evidence and canonical timeline.

## FR-08: CCTV Evidence

MVP CCTV evidence must support:

- Camera identifier.
- Fictional location.
- Recording date and time.
- Observation summary.
- Relevant events.
- Missing or obstructed intervals, when justified.
- Connections to suspects or other evidence.
- A fictional recording/transcript view.

A visual surveillance still may be attached when image generation is available.

Full video generation is an optional enhancement. Do not make the MVP dependent on an unverified Gemini video-generation capability.

When full video generation is unavailable, use a convincing simulated CCTV player interface containing a still image, recording timestamp, observation transcript, and timeline markers. Clearly identify this as simulated evidence.

The interface must not pretend that an actual playable video exists when only a transcript or image is available.

## FR-09: Timeline

Display a chronological timeline of important events.

Each timeline event must include:

- Event ID.
- Timestamp.
- Event description.
- Associated suspects.
- Related evidence IDs.
- Whether the event is verified, disputed, or uncertain within the fictional investigation.

Users should be able to navigate from timeline events to their related evidence.

The timeline must be derived from the same canonical case data as the suspect statements and evidence.

## FR-10: Culprit Selection

The accusation interface must:

- Display eligible suspects.
- Allow exactly one suspect to be selected.
- Require explicit confirmation before submission.
- Prevent submission without a selection.
- Submit the suspect ID to the backend.
- Display loading and error states.
- Prevent repeated scoring for the same completed investigation.

The backend, not the frontend, determines whether the accusation is correct.

## FR-11: Results

After an accusation, display:

- Selected suspect.
- Correct or incorrect outcome.
- Canonical culprit.
- Final case explanation.
- Key evidence supporting the solution.
- Important contradictions.
- Deduction sequence.
- Final score, if enabled.
- Option to return to the case.
- Option to create a new mystery.

The hidden solution may be returned only after the backend confirms that the investigation has been completed.

## FR-12: Case Persistence

MongoDB must store case data and investigation state.

The application should preserve:

- Case configuration.
- Generation status.
- Suspect records.
- Evidence records.
- Timeline records.
- Protected solution.
- Investigation progress.
- Final accusation.
- Result and score.
- Media references.
- Generation errors suitable for diagnostics.

On refresh, a user should be able to resume a case if the case is still accessible through the supported guest-session mechanism.

## FR-13: Error Handling

The system must handle:

- Gemini timeout.
- Gemini quota or rate limit.
- Invalid model response.
- Missing API credentials.
- MongoDB connection failure.
- Media generation failure.
- Invalid case IDs.
- Invalid suspect IDs.
- Unauthorized access.
- Duplicate accusation requests.
- Network interruption.

User-facing errors must be understandable and must not expose secrets, stack traces, raw provider responses, or the canonical solution.

---

# 6. User Interface and UX Specification

## 6.1 Design Direction

Use a premium detective investigation aesthetic.

Visual characteristics:

- Dark charcoal or midnight background.
- Muted navy panels.
- Warm amber or gold accents.
- Off-white text.
- Subtle red accents for warnings or critical clues.
- Restrained shadows and borders.
- Clear typography and readable evidence layouts.
- Subtle transitions and responsive interactions.

Avoid excessive glow effects, overly bright gradients, and distracting animations.

Provide sufficient contrast and accessible focus states.

A future light theme may be added without changing the application's functional architecture.

## 6.2 Required Pages

### Page 1 — Landing

Components:

- Navigation bar.
- Hero section.
- Project description.
- Create Mystery button.
- How It Works section.
- Example evidence preview.
- Fictional-content notice.
- Footer.

### Page 2 — Create Mystery

Components:

- Scenario textarea.
- Genre selector.
- Difficulty selector.
- Case-length selector.
- Generation button.
- Form validation.
- Generation progress panel.

### Page 3 — Case Overview

Components:

- Case title.
- Case synopsis.
- Case status.
- Investigation objectives.
- Suspect count.
- Evidence count.
- Start or resume investigation button.

Do not expose the hidden culprit or solution in this page.

### Page 4 — Investigation Workspace

Use a desktop layout with:

- **Left sidebar:** case navigation, evidence categories, suspects, timeline.
- **Center workspace:** selected evidence, conversation, image, transcript, or timeline.
- **Right sidebar:** contextual information, linked evidence, related suspects, and investigator notes where supported.

On smaller screens, collapse sidebars into drawers or tabs.

The interface must adapt to narrow screens without requiring horizontal scrolling.

### Page 5 — Suspect Details

Components:

- Suspect identity.
- Biography.
- Motive.
- Statement.
- Alibi.
- Associated evidence.
- Related timeline events.

Only expose information permitted by the case design.

### Page 6 — Accusation

Components:

- Suspect selection cards.
- Selected suspect confirmation.
- Submit accusation button.
- Confirmation dialog.
- Submission loading state.

### Page 7 — Results

Components:

- Outcome heading.
- Selected suspect.
- Correct culprit.
- Solution explanation.
- Key evidence.
- Deduction sequence.
- New mystery button.

## 6.3 Reusable Components

Implement reusable React components for:

- `Navbar`
- `Button`
- `FormField`
- `ScenarioForm`
- `GenerationProgress`
- `CaseHeader`
- `CaseStatusBadge`
- `SuspectCard`
- `SuspectProfile`
- `EvidenceCard`
- `EvidenceList`
- `EvidenceFilters`
- `EvidenceDetail`
- `MessageConversation`
- `ImageEvidenceViewer`
- `CCTVEvidenceViewer`
- `Timeline`
- `TimelineEvent`
- `AccusationPanel`
- `ConfirmationDialog`
- `ResultSummary`
- `ErrorState`
- `EmptyState`
- `LoadingSkeleton`

Components should be modular and maintainable. Do not create a single giant React component for the entire application.

---

# 7. Technology Stack

## 7.1 Frontend

Required:

- React.
- Vite.
- JavaScript (ES modules).
- HTML5.
- CSS3.
- React Router.
- Fetch API or Axios.
- A reusable component-based design system.

Optional:

- Lucide React for icons.
- A lightweight notification library.
- A lightweight animation library if necessary.

Use plain CSS or CSS modules unless a different styling framework is explicitly approved.

Do not introduce TypeScript, Next.js, Redux, or an unrelated frontend framework without changing this specification first.

## 7.2 Backend

Required:

- Node.js.
- Express.js.
- JavaScript with ES modules.
- MongoDB.
- Mongoose.
- Google Gemini API through the official supported Google GenAI SDK.
- dotenv for environment configuration.
- Zod or an equivalent schema validator.
- A standard HTTP request client where required.

The backend owns:

- Validation.
- AI calls.
- Canonical investigation data.
- Case generation.
- Evidence processing.
- Persistence.
- Authorization.
- Accusation evaluation.
- Result generation.

## 7.3 Database

Use MongoDB with Mongoose models.

Initial collections:

- `MysteryCases`
- `Investigations`

The canonical solution must be protected from public API responses.

Do not add a user collection until authentication is implemented.

## 7.4 AI Provider

Use Google Gemini for text-based investigation generation and solution reasoning.

All AI requests must go through the backend.

Do not call Gemini directly from the React frontend.

Keep provider-specific logic isolated in a service module so supported models can be changed through configuration.

---

# 8. Proposed Project Structure

Use the following structure as the initial implementation baseline.

```text
ai-mystery-room/
├── SPEC.md
├── README.md
├── .gitignore
├── .env.example
├── package.json
│
├── client/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── app/
│       │   └── router.jsx
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   ├── case/
│       │   ├── evidence/
│       │   ├── suspect/
│       │   └── investigation/
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── CreateMysteryPage.jsx
│       │   ├── CaseOverviewPage.jsx
│       │   ├── InvestigationPage.jsx
│       │   ├── ResultsPage.jsx
│       │   └── NotFoundPage.jsx
│       ├── hooks/
│       ├── services/
│       │   └── api.js
│       ├── context/
│       ├── utils/
│       └── styles/
│           ├── global.css
│           ├── variables.css
│           └── components/
│
├── server/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── config/
│       │   ├── database.js
│       │   └── env.js
│       ├── routes/
│       │   ├── health.routes.js
│       │   ├── mystery.routes.js
│       │   ├── evidence.routes.js
│       │   └── investigation.routes.js
│       ├── controllers/
│       ├── services/
│       │   ├── gemini.service.js
│       │   ├── mystery-generation.service.js
│       │   ├── evidence-generation.service.js
│       │   ├── consistency-validator.service.js
│       │   ├── investigation.service.js
│       │   └── scoring.service.js
│       ├── models/
│       │   ├── MysteryCase.js
│       │   └── Investigation.js
│       ├── schemas/
│       │   ├── mystery.schema.js
│       │   ├── evidence.schema.js
│       │   └── investigation.schema.js
│       ├── middleware/
│       │   ├── error.middleware.js
│       │   ├── validation.middleware.js
│       │   ├── rate-limit.middleware.js
│       │   └── case-access.middleware.js
│       ├── prompts/
│       │   ├── generate-case.prompt.js
│       │   ├── repair-case.prompt.js
│       │   └── generate-evidence.prompt.js
│       ├── utils/
│       └── tests/
│
└── docs/
    ├── API.md
    ├── DATA_MODEL.md
    ├── AI_GENERATION.md
    └── TEST_PLAN.md
```

Rules:

- Keep routes, controllers, services, models, and schemas separate.
- Keep prompts out of controllers.
- Keep Gemini SDK calls inside the AI service layer.
- Keep business logic out of route definitions.
- Keep client and server dependencies in their respective package files.
- The root package file may provide scripts to run both applications.
- Update documentation whenever the implementation changes.

---

# 9. Architecture

## 9.1 Request Flow

```text
React Frontend
      |
      v
Express REST API
      |
      v
Validation + Case Access
      |
      v
Mystery Generation Service
      |
      +----> Gemini Service
      |          |
      |          v
      |     Structured Case
      |
      v
Consistency Validator
      |
      v
Evidence Processing
      |
      v
MongoDB Persistence
      |
      v
Case Ready
      |
      v
React Evidence Room
      |
      v
Accusation API
      |
      v
Backend Evaluation
      |
      v
Results API
```

## 9.2 Separation of Responsibilities

**React frontend**

Responsible for displaying the interface, collecting user input, managing visible investigation state, and communicating with the API.

**Express backend**

Responsible for enforcing business rules, validating data, protecting solutions, calling AI providers, managing persistence, and evaluating accusations.

**Gemini service**

Responsible for producing structured fictional case content and optional text-based evidence.

**Consistency validator**

Responsible for verifying case structure, references, timeline relationships, evidence coverage, and canonical solution integrity.

**MongoDB**

Responsible for durable storage of cases, evidence, protected solutions, and investigation progress.

The frontend must never decide whether an accusation is correct.

---

# 10. AI Investigation Generation

## 10.1 Generation Strategy

Do not ask Gemini to independently generate unrelated suspects, messages, images, timelines, and solutions in separate calls.

That approach can produce contradictions.

Instead, use a canonical-first generation strategy:

1. Interpret the scenario.
2. Establish the case facts and underlying truth.
3. Select the culprit and define the motive.
4. Establish the chronological timeline.
5. Define the suspects and their alibis.
6. Design the evidence needed to solve the mystery.
7. Define the logical deduction path.
8. Generate the user-visible evidence from these established facts.
9. Validate the complete case.
10. Repair or regenerate invalid content within a bounded retry policy.
11. Save the canonical case and protected solution.
12. Process optional media generation.

All later generation calls must use the same canonical facts.

## 10.2 Canonical Case Object

The internal generation result must follow this logical structure:

```json
{
  "title": "The Missing Prototype",
  "genre": "theft",
  "difficulty": "medium",
  "synopsis": "A prototype disappears before the final presentation.",
  "scenario": "The user's original scenario.",
  "objectives": [
    "Determine who took the prototype.",
    "Establish when it disappeared."
  ],
  "suspects": [
    {
      "id": "suspect_01",
      "name": "Alex Morgan",
      "role": "Exhibition coordinator",
      "motive": "Wants to prevent a rival team from winning.",
      "statement": "I left the room before the presentation.",
      "alibi": "Claims to have been in the workshop."
    }
  ],
  "timeline": [
    {
      "id": "event_01",
      "timestamp": "2026-10-20T14:00:00Z",
      "description": "The prototype is confirmed to be present.",
      "suspectIds": [],
      "evidenceIds": []
    }
  ],
  "evidence": [
    {
      "id": "evidence_01",
      "type": "message",
      "title": "Group Conversation",
      "description": "A fictional conversation among the organizers.",
      "content": {},
      "suspectIds": [],
      "timelineEventIds": [],
      "visibility": "public"
    }
  ],
  "solution": {
    "culpritId": "suspect_01",
    "motive": "Canonical explanation.",
    "method": "How the fictional incident occurred.",
    "deductionSteps": [
      "Compare the stated alibi with the timeline.",
      "Verify the contradiction using independent evidence."
    ],
    "keyEvidenceIds": ["evidence_01"],
    "fullExplanation": "The complete solution."
  }
}
```

This is a conceptual example, not a complete production schema. The implementation must define and validate every field, including required fields, enums, limits, and references.

The example culprit is illustrative only; real cases must be generated dynamically.

## 10.3 Required Validation

The consistency validator must check:

- Required fields exist.
- Field types are correct.
- All IDs are unique within their relevant collections.
- The culprit references an existing suspect.
- Evidence references valid suspects and timeline events.
- Timestamps are parseable and chronologically coherent.
- The timeline accounts for the important events.
- Suspect statements do not contradict the canonical facts accidentally.
- Contradictions used as clues are intentional and explainable.
- The canonical solution can be supported by the evidence.
- The solution is not disclosed through public metadata.
- The number of suspects and evidence items meets the selected case-length requirements.

When validation fails, use a bounded repair attempt and then a bounded full regeneration attempt. If the case remains invalid, mark generation as failed and provide a retry option.

Never endlessly retry AI generation.

## 10.4 Difficulty Design

**Easy**

- Three suspects.
- Approximately 6–8 evidence items.
- Direct clues.
- A relatively simple timeline.
- One or two meaningful contradictions.

**Medium**

- Four suspects.
- Approximately 9–12 evidence items.
- Multiple related clues.
- More than one relevant motive.
- A deduction requiring evidence comparison.

**Hard**

- Five suspects.
- Approximately 13–18 evidence items.
- Interconnected clues.
- More complex alibis and timeline reconstruction.
- Several plausible alternative explanations that can be eliminated using evidence.

These are target ranges, not permission to generate contradictory or low-quality evidence.

Case length:

- **Short:** Use the lower end of the applicable evidence range.
- **Standard:** Use the full target range for the selected difficulty.

## 10.5 AI Prompt Requirements

The generation prompt must instruct Gemini to:

- Generate fictional content only.
- Treat the user's scenario as the starting premise.
- Establish the hidden truth before writing evidence.
- Choose exactly one culprit.
- Create distinct suspects and believable motives.
- Build a consistent timeline.
- Ensure each important accusation is supported by evidence.
- Include both incriminating and neutral or exculpatory clues.
- Create intentional, explainable contradictions.
- Avoid revealing the culprit in public-facing content.
- Produce valid structured output.
- Avoid unnecessary graphic violence or sexualized crime content.
- Avoid using real personal information.
- Return no explanatory text outside the required structured format when strict structured output is requested.

Do not trust the model's output merely because it follows the expected JSON shape. Validate it in application code.

## 10.6 Gemini Integration

The Gemini service must:

- Read its API key from server environment variables.
- Use a configurable supported model.
- Request structured output using the supported SDK capabilities.
- Set reasonable generation limits.
- Apply request timeouts.
- Handle quota and provider errors.
- Avoid logging API keys or sensitive prompts.
- Record generation duration and safe diagnostic metadata.
- Support bounded retries.
- Expose a stable internal service interface.

Do not hard-code an obsolete model name or assume that a particular model remains available indefinitely.

The chosen model must be configurable through `GEMINI_MODEL`.

## 10.7 AI Cost and Performance

To control API usage:

- Generate the canonical investigation in as few calls as practical.
- Avoid calling Gemini again for information already generated.
- Generate images only when supported and required.
- Avoid full video generation in the MVP.
- Use bounded retries.
- Set maximum prompt and response sizes.
- Add rate limiting to case creation.
- Store generated cases rather than regenerating them on every page load.
- Avoid using AI to evaluate a culprit when deterministic comparison is sufficient.

The final result must be determined by the canonical culprit ID, not by another free-form AI judgment.

---

# 11. Data Models

## 11.1 MysteryCase

The `MysteryCase` document must contain:

- `caseId`: unique, non-guessable public identifier.
- `title`: string.
- `scenario`: original user input.
- `genre`: enum.
- `difficulty`: enum.
- `caseLength`: enum.
- `synopsis`: string.
- `objectives`: array of strings.
- `suspects`: array of validated suspect objects.
- `witnesses`: array of validated witness objects.
- `timeline`: array of validated timeline events.
- `evidence`: array of validated evidence objects.
- `canonicalSolution`: protected solution object.
- `status`: generation status enum.
- `generationAttempts`: number.
- `generationErrorCode`: optional safe diagnostic code.
- `createdAt`: timestamp.
- `updatedAt`: timestamp.
- `expiresAt`: optional expiration timestamp.
- `version`: schema version.

Use Mongoose schema validation and indexes.

The solution must be separated logically from public case data. Prefer a separate private solution document or a strict server-side projection that prevents accidental exposure.

## 11.2 Investigation

The `Investigation` document must contain:

- `investigationId`: unique identifier.
- `caseId`: reference to the case.
- `sessionTokenHash`: hash of a secure guest-session token.
- `status`: `in_progress` or `completed`.
- `viewedEvidenceIds`: array of evidence IDs.
- `finalAccusation`: optional suspect ID.
- `isCorrect`: optional boolean.
- `score`: optional number.
- `completedAt`: optional timestamp.
- `createdAt`: timestamp.
- `updatedAt`: timestamp.

Do not store plaintext guest-session tokens.

If a guest session is not implemented, the backend must still enforce appropriate case access and must not allow users to modify another investigation using a guessed ID.

## 11.3 Evidence Schema

Every evidence object must contain:

- `id`.
- `type`.
- `title`.
- `description`.
- `content`.
- `createdAtInStory`.
- `suspectIds`.
- `timelineEventIds`.
- `media`.
- `visibility`.

Evidence types:

- `message`
- `image`
- `cctv`
- `witness_statement`
- `interview`
- `physical_clue`
- `document`

Media records must support:

- Media ID.
- Media type.
- Storage reference.
- MIME type.
- Generation status.
- Optional duration for video or audio.
- Optional dimensions for images.

Do not store unrestricted HTML as evidence content. Render text safely and validate URLs before using them.

## 11.4 Indexes and Retention

Create indexes for:

- Unique case ID.
- Case status.
- Case creation date.
- Investigation ID.
- Investigation case reference.
- Investigation session hash where applicable.
- Case expiration where TTL retention is enabled.

If TTL expiration is used, document that expired cases and related investigations may be deleted automatically.

Never expire cases while they are actively being generated.

---

# 12. REST API Specification

Base path: `/api/v1`

All responses must use JSON.

## 12.1 Health

### GET `/health`

Purpose: Verify that the backend is running.

Success:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

This endpoint must not return environment variables, API keys, or detailed infrastructure secrets.

## 12.2 Create Mystery

### POST `/mysteries`

Request:

```json
{
  "scenario": "A prototype disappears during a college festival.",
  "genre": "theft",
  "difficulty": "medium",
  "caseLength": "short"
}
```

Success: `202 Accepted`

```json
{
  "success": true,
  "data": {
    "caseId": "non-guessable-case-id",
    "status": "generating"
  }
}
```

The backend must validate the request and initiate bounded case generation.

The API may complete generation synchronously for a simple implementation, but the external response contract must remain stable. Prefer asynchronous processing if media generation makes generation time unpredictable.

## 12.3 Get Mystery Status

### GET `/mysteries/:caseId/status`

Returns:

- Case ID.
- Generation status.
- Progress stage.
- Safe error information if generation failed.

It must not return suspects' hidden fields or the canonical solution.

## 12.4 Get Mystery Details

### GET `/mysteries/:caseId`

Returns:

- Public case metadata.
- Synopsis.
- Objectives.
- Suspects with permitted fields.
- Timeline.
- Public evidence summaries.
- Case status.

Never return:

- Canonical culprit ID.
- Full solution.
- Hidden deduction notes.
- Internal AI prompts.
- Provider API keys.

## 12.5 Get Evidence

### GET `/mysteries/:caseId/evidence`

Optional query parameters:

- `type`
- `suspectId`
- `search`
- `page`
- `limit`

Return paginated public evidence.

Validate all query parameters and apply maximum page-size limits.

## 12.6 Get Evidence Details

### GET `/mysteries/:caseId/evidence/:evidenceId`

Returns the selected evidence item and its permitted relationships.

Verify that the evidence belongs to the requested case.

## 12.7 Create Investigation

### POST `/mysteries/:caseId/investigations`

Creates an investigation session for the requested case.

Return the investigation ID and a secure session mechanism.

For guest sessions, use an appropriately scoped, unpredictable token. Prefer an HTTP-only, Secure, SameSite cookie where deployment and cross-origin configuration allow it.

## 12.8 Record Evidence Review

### POST `/investigations/:investigationId/evidence/:evidenceId/view`

Records that the evidence was reviewed.

This endpoint is optional for basic MVP scoring but should be designed for future investigation progress and scoring.

## 12.9 Submit Accusation

### POST `/investigations/:investigationId/accusation`

Request:

```json
{
  "suspectId": "suspect_01"
}
```

Success:

```json
{
  "success": true,
  "data": {
    "investigationId": "investigation-id",
    "status": "completed",
    "isCorrect": false,
    "score": 0
  }
}
```

The sample score is illustrative.

Backend rules:

1. Verify investigation access.
2. Verify the case is ready.
3. Verify the investigation is not already completed.
4. Verify the suspect exists in that case.
5. Compare the submitted suspect ID with the canonical culprit ID.
6. Compute the score deterministically.
7. Persist the result atomically or use an equivalent concurrency-safe operation.
8. Return the permitted outcome.
9. Prevent duplicate submissions from awarding duplicate results.

Do not accept `isCorrect`, `score`, or `culpritId` from the client.

## 12.10 Get Results

### GET `/investigations/:investigationId/results`

Only a completed investigation may receive the full solution.

Return:

- Final accusation.
- Correctness.
- Canonical culprit.
- Explanation.
- Key evidence.
- Deduction steps.
- Final score.

The server must verify investigation access before revealing the solution.

## 12.11 API Error Format

Use a consistent structure:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_SCENARIO",
    "message": "Please provide a valid mystery scenario."
  }
}
```

Use appropriate HTTP status codes:

- `400` — Invalid request.
- `401` — Authentication or session required.
- `403` — Access denied.
- `404` — Case, evidence, or investigation not found.
- `409` — Conflicting state or duplicate completion.
- `413` — Request too large.
- `429` — Rate limit exceeded.
- `500` — Unexpected server error.
- `502` or `503` — Upstream AI or service failure.

Do not return stack traces in production.

---

# 13. Security and Privacy

Security requirements are mandatory, not optional enhancements.

## 13.1 API Key Protection

- Store `GEMINI_API_KEY` in server environment variables.
- Never prefix secrets with `VITE_`.
- Never commit `.env` files.
- Maintain a `.env.example` containing placeholders only.
- Never return environment values through API endpoints.
- Never print API keys in logs.
- Never expose the canonical solution through client-visible JavaScript.

## 13.2 Input Security

- Validate scenario length and type.
- Validate all request bodies and query parameters.
- Reject invalid identifiers.
- Escape or safely render user-provided text.
- Avoid executing model-generated code or HTML.
- Do not use `eval` or execute generated scripts.
- Limit request size.
- Rate-limit expensive AI endpoints.
- Protect against NoSQL injection using strict schemas and sanitized queries.

## 13.3 AI Prompt Injection

Treat the user-provided scenario as untrusted content.

The scenario may describe fictional instructions or include text attempting to manipulate the AI.

The generation service must:

- Treat scenario content as data, not privileged instructions.
- Preserve the system's case-generation constraints.
- Reject requests that violate content rules.
- Validate generated content before persistence.
- Never allow user input to override backend security policies.

## 13.4 Access Control

- Use unpredictable case and session identifiers.
- Verify session access for protected investigation operations.
- Do not rely on obscurity alone for access control.
- Apply strict CORS configuration.
- Use HTTPS in production.
- Avoid exposing other users' case data.
- Use secure cookie settings where cookies are used.

## 13.5 Fictional Evidence Notice

Display a visible notice in the application and investigation workspace:

"All cases, people, messages, images, and surveillance records in this experience are fictional or simulated AI-generated content."

Do not present generated artifacts as verified real-world evidence.

---

# 14. Environment Configuration

Create `.env.example` with:

```dotenv
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/ai_mystery_room

GEMINI_API_KEY=
GEMINI_MODEL=

CLIENT_URL=http://localhost:5173

CASE_GENERATION_TIMEOUT_MS=60000
CASE_GENERATION_MAX_RETRIES=2

RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
```

These values are defaults to review, not universal production settings.

Implementation rules:

- Validate required environment variables during server startup.
- Fail fast with a safe, descriptive message if required configuration is missing.
- Do not hard-code API credentials.
- Do not expose server configuration to the frontend.
- Do not assume all AI models support the same structured-output or media-generation features.

If cloud media storage is configured later, add the required provider-specific environment variables without exposing them to the client.

---

# 15. Frontend State Management

Use React component state and Context where appropriate for MVP.

The frontend must track:

- Current case.
- Current investigation.
- Generation status.
- Selected evidence.
- Evidence filters.
- Selected suspect.
- Submission status.
- Results.
- Error messages.

Rules:

- Keep state close to the component that needs it.
- Use Context only for genuinely shared application state.
- Do not introduce a global state library unless complexity justifies it.
- Fetch authoritative case data from the backend.
- Do not store the canonical solution in local storage or session storage.
- Do not assume client-side state is secure.
- Re-fetch results after page refresh when the session is valid.
- Handle API timeouts and unavailable servers gracefully.

Use loading skeletons instead of freezing the interface during long-running requests.

---

# 16. Scoring Rules

For MVP, use deterministic scoring.

Default rule:

- Correct accusation: 100 points.
- Incorrect accusation: 0 points.

A future enhanced scoring system may incorporate evidence review, number of hints used, and elapsed time.

If such a system is implemented, the formula must be documented in code and tests.

Scoring must:

- Be calculated by the backend.
- Be persisted once per completed investigation.
- Never trust client-provided scores.
- Avoid duplicate completion rewards.
- Use a clearly documented maximum score.

Do not make AI-generated subjective evaluations the source of truth for scoring.

---

# 17. Testing Requirements

## 17.1 Unit Tests

Test:

- Request validation.
- Case schema validation.
- Suspect ID uniqueness.
- Evidence reference integrity.
- Culprit reference integrity.
- Timeline ordering.
- Consistency validation.
- Scoring.
- Result generation.
- API error mapping.
- Authorization helpers.

## 17.2 Integration Tests

Test:

- Health endpoint.
- Case creation.
- AI service success.
- AI service timeout.
- Invalid AI output.
- Case persistence.
- Evidence retrieval.
- Investigation creation.
- Invalid suspect accusation.
- Correct accusation.
- Incorrect accusation.
- Duplicate accusation.
- Unauthorized result access.
- Solution disclosure prevention.

Use a mocked Gemini service for deterministic automated tests. Live Gemini calls should be limited to separate integration checks that require configured credentials.

## 17.3 Frontend Tests

Test:

- Scenario form validation.
- Difficulty selection.
- Generation loading state.
- Failed generation and retry.
- Evidence filtering.
- Evidence detail rendering.
- Suspect selection.
- Confirmation dialog.
- Accusation submission.
- Results display.
- Responsive navigation.

## 17.4 End-to-End Tests

At least one complete test must:

1. Open the landing page.
2. Create a mystery.
3. Wait for case readiness.
4. Open the Evidence Room.
5. View evidence.
6. Select a suspect.
7. Submit an accusation.
8. View the result.
9. Refresh the page and verify the completed state is recoverable.

Use seeded fixtures or a deterministic mock AI provider in CI so tests do not depend on live AI availability.

## 17.5 Quality Requirements

The application must:

- Build without errors.
- Start frontend and backend using documented commands.
- Pass automated tests.
- Have no critical secrets in the repository.
- Handle API failures without crashing.
- Avoid broken evidence links.
- Avoid accidental canonical solution exposure.
- Support the agreed desktop and mobile layouts.

---

# 18. Implementation Phases

Codex must implement the application in the following order.

## Phase 1 — Foundation

- Inspect the repository.
- Read `SPEC.md` completely.
- Create the React/Vite frontend.
- Create the Express backend.
- Configure MongoDB and Mongoose.
- Configure environment validation.
- Implement the health endpoint.
- Establish reusable error handling.
- Create the agreed folder structure.

**Completion gate:** Frontend and backend start successfully, and the health endpoint works.

## Phase 2 — Core Case Engine

- Define the case schemas.
- Define evidence schemas.
- Implement the Gemini service.
- Implement canonical case generation.
- Implement structured-output validation.
- Implement consistency validation.
- Implement bounded retries.
- Persist generated cases.

**Completion gate:** A valid case can be generated, validated, saved, and retrieved without exposing its solution.

## Phase 3 — Investigation API

- Implement public case retrieval.
- Implement evidence filtering and detail retrieval.
- Implement guest investigation sessions.
- Implement access control.
- Implement accusation submission.
- Implement deterministic scoring.
- Implement protected results retrieval.

**Completion gate:** A complete investigation works through API requests, including authorization and solution protection.

## Phase 4 — User Interface

- Implement landing page.
- Implement mystery creation form.
- Implement generation progress.
- Implement case overview.
- Implement the Evidence Room.
- Implement suspect profiles.
- Implement messages and document evidence.
- Implement image and CCTV fallback viewers.
- Implement timeline navigation.
- Implement accusation and results screens.

**Completion gate:** A user can complete the mystery experience through the UI without manually calling APIs.

## Phase 5 — Evidence Media

- Implement media metadata and storage abstraction.
- Add supported image generation where configured.
- Add simulated CCTV evidence.
- Add optional video-provider integration only if available.
- Validate evidence-to-image consistency.
- Implement media failure fallbacks.

**Completion gate:** Optional media failures do not invalidate otherwise complete cases.

## Phase 6 — Testing and Hardening

- Add unit and integration tests.
- Add end-to-end tests.
- Test authorization and solution privacy.
- Test mobile responsiveness.
- Test rate limits and provider failures.
- Fix build and runtime issues.
- Document configuration and troubleshooting.

**Completion gate:** The core acceptance criteria pass and the app can be deployed using documented instructions.

---

# 19. Definition of Done

The MVP is complete only when all of the following are true:

- [ ] The frontend and backend run successfully.
- [ ] MongoDB stores generated mysteries.
- [ ] Gemini generates structured fictional investigations.
- [ ] Every valid case has exactly one canonical culprit.
- [ ] Suspects, evidence, and timelines are internally consistent.
- [ ] The consistency validator rejects invalid cases.
- [ ] The user can create and enter a mystery.
- [ ] The user can inspect suspects and evidence.
- [ ] Message evidence renders correctly.
- [ ] Image evidence works when configured or displays an honest fallback.
- [ ] CCTV evidence renders as a transcript or supported visual simulation.
- [ ] The user can select and submit one culprit.
- [ ] The backend evaluates the accusation correctly.
- [ ] The final explanation is available after completion.
- [ ] Canonical solution data is never exposed prematurely.
- [ ] Duplicate submissions cannot corrupt results.
- [ ] Loading, error, empty, and retry states work.
- [ ] The interface is responsive.
- [ ] Environment variables are secure.
- [ ] Automated tests cover critical flows.
- [ ] `README.md` contains setup, run, test, and deployment instructions.
- [ ] All known limitations are documented.

---

# 20. Codex Development Rules

These rules govern all AI-assisted implementation.

## 20.1 Source of Truth

`SPEC.md` is the authoritative source for intended behavior, architecture, security, data models, and acceptance criteria.

Before implementing any feature, Codex must identify the relevant specification sections.

Do not silently change the product requirements.

## 20.2 Specification Changes

If implementation reveals a conflict, missing requirement, unsupported capability, or significant architectural issue:

1. Stop before making a consequential assumption.
2. Identify the conflicting specification sections.
3. Propose the smallest reasonable correction.
4. Update `SPEC.md` after the decision is approved.
5. Update affected schemas, API documentation, tests, and implementation.
6. Ensure all related documentation remains consistent.

Do not maintain undocumented competing sources of truth.

## 20.3 Implementation Rules

- Use JavaScript and the MERN stack.
- Follow the agreed directory structure.
- Keep code modular.
- Use async/await and centralized error handling.
- Validate all untrusted inputs.
- Use reusable React components.
- Keep Gemini prompts in dedicated prompt files.
- Keep AI integration in dedicated services.
- Never expose secrets or canonical solutions.
- Avoid unnecessary dependencies.
- Avoid placeholder implementations for core business logic.
- Never claim that a feature works without implementing and testing it.
- Do not generate unrelated features outside the agreed scope.

## 20.4 Working Method

For each implementation phase:

1. Read the applicable requirements.
2. Inspect the existing repository before modifying files.
3. Identify the files to create or change.
4. Implement the smallest complete vertical slice.
5. Run relevant tests.
6. Fix failures before moving forward.
7. Update documentation.
8. Report completed work, test results, and remaining limitations.

Do not generate the entire application as one enormous unverified code dump.

Prefer small, working, testable increments.

## 20.5 Completion Report

At the end of each phase, provide:

- Features implemented.
- Files created or modified.
- Commands executed.
- Tests passed and failed.
- Configuration required.
- Known issues.
- Features deferred to later phases.
- Any specification changes requiring approval.

Never mark a phase complete while its completion gate remains unmet.

---

# 21. Initial Setup and Execution

Expected development commands:

**Install dependencies**

```bash
npm install
npm install --prefix client
npm install --prefix server
```

**Start development servers**

```bash
npm run dev
```

The root `package.json` must define the development script, for example by using a suitable process manager to start the frontend and backend together.

The backend should listen on the configured port, defaulting to `5000`. The Vite frontend should use port `5173` in development.

**Run tests**

```bash
npm test
```

Configure root scripts to execute the actual frontend and backend test suites.

**Production build**

```bash
npm run build
```

Configure the build script to build the frontend and verify backend production readiness.

The README must document MongoDB setup, Gemini API key configuration, supported model selection, test commands, and deployment steps.

---

# 22. Final Product Acceptance Scenario

The following scenario represents the minimum end-to-end acceptance test.

A user enters:

"During a college technology festival, a prototype disappears from the exhibition room shortly before the final presentation."

The application generates a fictional case with:

- A case title and synopsis.
- Four suspects for medium difficulty.
- Distinct motives and alibis.
- A consistent chronological timeline.
- Fictional messages.
- Witness statements.
- Visual or textual surveillance evidence.
- At least nine coherent evidence items.
- A predetermined culprit.
- A hidden canonical explanation.

The user enters the Evidence Room and compares the statements, timestamps, and clues.

The user selects one suspect and submits the accusation.

The backend compares the suspect ID with the stored canonical culprit ID and returns the result.

The application reveals the complete solution only after the investigation is completed.

The result explains the culprit's motive, the sequence of events, the decisive evidence, and the contradictions that establish the answer.

The case remains recoverable through its authorized session, and the user can start a new mystery.

**The acceptance test passes only when the full journey works, the case is logically consistent, and the hidden solution remains protected.**

---

# 23. Authoritative Decision Summary

The following decisions define the implementation baseline:

| Area | Confirmed Decision |
|---|---|
| Product | AI Mystery Room |
| Core experience | Generate and solve fictional mysteries |
| Development method | Spec-Driven Development |
| Source of truth | `SPEC.md` |
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Language | JavaScript |
| AI provider | Google Gemini |
| Communication | REST API |
| Case generation | Canonical-first structured generation |
| Validation | Backend schema and consistency checks |
| Solution evaluation | Deterministic backend comparison |
| Evidence | Text, messages, images, CCTV simulation, documents |
| Image generation | Supported provider integration with fallback |
| Full video generation | Optional, not an MVP dependency |
| Authentication | Guest investigation first |
| Security | Backend-only secrets and protected solutions |
| Initial release | Complete, responsive single-player MVP |

Any change to these decisions must be reflected in `SPEC.md` and the relevant implementation documentation before the affected feature is developed.

**End of Master Specification.**
