# AI generation

Case creation validates input using Zod, stores an initial generation record, requests JSON from the configured Google Gemini model, validates the structured output and its cross-references, then persists public case content separately from its canonical solution field.

The prompt asks for one culprit, coherent timestamps, clue coverage, and evidence coverage for the selected length. The consistency validator checks required fields, ID uniqueness, culprit membership, suspect/timeline/evidence references, key evidence references, and minimum public evidence count. Invalid output fails safely and can be retried by the user.

The provider is isolated in `server/src/services/gemini.service.js`. `GEMINI_API_KEY` and `GEMINI_MODEL` are server settings. The MVP represents surveillance and visual evidence with structured textual records; external image/video generation is optional and not configured.

Current limitation: the configured timeout and retry settings are not yet used to perform bounded provider retries. Creation is synchronous. The API returns a safe error when generation cannot complete, and the UI permits a new attempt.
