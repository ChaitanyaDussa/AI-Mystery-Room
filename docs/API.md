# REST API

All routes are under `/api/v1`. Responses have the shape `{ "success": true, "data": ... }`; errors return `{ "success": false, "error": { "code", "message" } }`.

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | Process health |
| POST | `/mysteries` | Validate input, generate and persist a case (202 response) |
| GET | `/mysteries/:caseId/status` | Safe generation status |
| GET | `/mysteries/:caseId` | Public case summary, suspects and timeline |
| GET | `/mysteries/:caseId/evidence` | Filter and paginate public evidence |
| GET | `/mysteries/:caseId/evidence/:evidenceId` | One public evidence record |
| POST | `/mysteries/:caseId/investigations` | Create a guest session and HTTP-only cookie |
| POST | `/investigations/:investigationId/evidence/:evidenceId/view` | Record reviewed evidence |
| POST | `/investigations/:investigationId/accusation` | Submit one accusation and score it |
| GET | `/investigations/:investigationId/results` | Reveal solution after completion |

Creation accepts `scenario` (30–5000 characters), `genre`, `difficulty`, and `caseLength`. Evidence filters accept `type`, `suspectId`, `search`, `page`, and `limit` (maximum 50). Investigation routes require the guest session cookie set by the create-investigation route.

Typical errors: `400` invalid request, `401` missing session, `403` inaccessible investigation, `404` missing resource, `409` invalid state or duplicate accusation, `429` rate limit, `502` invalid/provider AI output, and `503` missing AI configuration.
