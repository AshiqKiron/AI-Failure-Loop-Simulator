# System Architecture

## High-Level Flow
1. **Telemetry Ingestion:** User clicks "Thumbs Down" or system detects implicit failure (e.g., user rewrites output).
2. **Classification Layer:** A lightweight classifier (or LLM-as-a-judge) categorizes the failure (Hallucination, Tone, Logic, etc.).
3. **Routing Engine:** Applies business rules to map the category to a correction workflow.
4. **Action Execution:**
   - *Prompt:* Auto-generates a new system prompt and tests in shadow mode.
   - *RAG:* Triggers an ingestion pipeline for missing documents.
   - *Retrain:* Packages data into an annotation queue for human labelers.
5. **Deployment:** Validated corrections are pushed to production via CI/CD.

## Data Schema (Failure Event)
```json
{
  "event_id": "uuid",
  "timestamp": "ISO8601",
  "user_id": "uuid",
  "prompt": "string",
  "response": "string",
  "failure_type": "enum",
  "severity": "enum"
}