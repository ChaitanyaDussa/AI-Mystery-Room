# Test plan

Critical coverage should include:

- Zod input bounds and enum validation.
- Generated case shape, unique identifiers, reference integrity, and evidence counts.
- Public case serialization never includes the canonical solution.
- Guest cookie hashing, unauthorized investigation denial, and results denial before completion.
- Correct and incorrect accusation scoring, invalid suspect IDs, and duplicate submission concurrency.
- API provider success, timeout, malformed JSON, and missing key behavior with a mocked Gemini provider.
- Frontend create form boundaries, evidence filters, suspect selection, accusation confirmation, and result rendering.
- End-to-end case creation through refresh and result recovery using a deterministic mocked AI provider.

Run `npm test` for server and client test scripts. Add deterministic fixtures before depending on CI or live model access; never require live Gemini credentials in unit tests.
