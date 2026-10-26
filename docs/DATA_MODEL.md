# Data model

## MysteryCase

Mongoose model fields: non-guessable `caseId`, input metadata, synopsis and objectives, validated suspects/witnesses/timeline/public evidence, status, attempt count, safe error code, timestamps, and schema version. `canonicalSolution` is a `Mixed` field with `select: false`; routes that reveal results must explicitly select it after authorizing a completed investigation.

Indexes cover unique case IDs, case status, and creation timestamps. Cases do not expire automatically.

## Investigation

Stores a random investigation ID, case ID, SHA-256 hash of the guest cookie token, progress status, reviewed evidence IDs, final accusation, correctness, score, and completion timestamp. Indexes cover unique investigation ID, case ID, and session hash.

The HTTP-only session cookie is random, scoped to `/api/v1`, SameSite=Lax, and Secure in production. Plaintext tokens are not stored in MongoDB or browser storage.

## Evidence

Each evidence record has a unique ID, enumerated type, title, description, structured JSON content, story timestamp, suspect and timeline references, media metadata, and visibility. Public API routes only return evidence marked public. Content is rendered as text by the client.
