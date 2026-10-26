# Casefile — AI Mystery Room

An immersive detective workspace for generating and solving fictional investigations. The React client talks to an Express REST API; MongoDB stores cases and guest investigations; Google Gemini generates structured case files on the server.

All people, messages, images, surveillance descriptions, and events are fictional. The application does not connect to real messaging accounts, cameras, or law enforcement systems.

## Requirements

- Node.js 20 or newer and npm
- MongoDB 7 or newer, local or hosted
- Google Gemini API key for case generation

## Setup

From the repository root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Copy `.env.example` to `.env` in the repository root (or to `server/.env`), then configure `MONGODB_URI`, `GEMINI_API_KEY`, and `GEMINI_MODEL`. Server-level `server/.env` values override root values. The Gemini key is server-only and must never be added to the client environment. The default model is `gemini-2.5-flash`.

## Run

```bash
npm run dev
```

The Vite client runs on <http://localhost:5173>; the API runs on <http://localhost:5000>. The backend waits for MongoDB before listening. Check API health at `GET http://localhost:5000/api/v1/health`.

For separate processes, use `npm run dev --prefix server` and `npm run dev --prefix client`.

## Build and tests

```bash
npm run build
npm test
```

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NODE_ENV` | `development` | Runtime mode |
| `PORT` | `5000` | API port |
| `MONGODB_URI` | local `ai_mystery_room` database | MongoDB connection |
| `GEMINI_API_KEY` | empty | Server-side Gemini credential |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Gemini text model |
| `CLIENT_URL` | `http://localhost:5173` | CORS allowlist |
| `CASE_GENERATION_TIMEOUT_MS` | `60000` | Generation timeout setting |
| `CASE_GENERATION_MAX_RETRIES` | `2` | Bounded retries setting |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Case creation rate-limit window |
| `RATE_LIMIT_MAX_REQUESTS` | `10` | Case creations per window |

## Architecture and security

- API base path: `/api/v1`; all API payloads use JSON.
- Gemini generation and case validation run on the server.
- Canonical culprit and explanation are stored in a private Mongoose field and only selected after a completed accusation.
- Guest investigations use a random HTTP-only cookie. MongoDB stores only its SHA-256 hash.
- Scoring is deterministic: 100 for a correct accusation, 0 otherwise.
- Evidence content is rendered as text; arbitrary HTML is not rendered.
- Optional media has textual fallbacks; the MVP does not require video/image provider credentials.

## Deployment

Build the frontend with `npm run build --prefix client`. Deploy `client/dist` to a static host and the Express server to a Node host with network access to MongoDB. Set the environment variables in the server host, configure `CLIENT_URL` to the exact frontend origin, and terminate TLS at the host or reverse proxy. The API uses secure cookies in production. Configure the frontend API origin with `VITE_API_URL` at build time if the API is not at `http://localhost:5000/api/v1`; production deployments should set this explicitly. Keep the API and client under a compatible site configuration so the SameSite session cookie is sent.

## Current MVP limits

- Case generation currently runs synchronously in the creation request; image and video generation are not required or implemented as provider integrations.
- Retry limits and timeout are configured, but generation currently makes one provider request and returns a retryable error on invalid output or provider failure.
- Guest session cookie is scoped to the browser's current active investigation; starting another investigation replaces it.
- Automated tests cover generation integrity and deterministic scoring; API and browser end-to-end coverage remain to be expanded.

See [docs/API.md](docs/API.md), [docs/DATA_MODEL.md](docs/DATA_MODEL.md), [docs/AI_GENERATION.md](docs/AI_GENERATION.md), and [docs/TEST_PLAN.md](docs/TEST_PLAN.md).
