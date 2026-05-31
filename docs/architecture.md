# Architecture

AgenticHire AI follows the folders required by `spec.md`.

- Frontend code lives only in `client/`.
- Backend code lives only in `server/`.
- Shared business rules live in `specs/`.
- Resume uploads go to `server/uploads/`.
- Workflow logs go to `server/logs/`.

The backend reads workflow order, hiring thresholds, retry policy, RAG settings, interview prompt shape, and email templates from JSON specs. Agents exchange JSON-serializable outputs and the workflow persists state before pausing for human approval.
