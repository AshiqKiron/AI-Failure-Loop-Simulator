# Metrics Framework: AI Failure Loop

This document defines the Key Performance Indicators (KPIs) used to measure the efficiency, cost-effectiveness, and velocity of the AI Failure Loop. These metrics are designed to prove the ROI of the intelligent triage engine to stakeholders.

## 1. Primary Business Metrics (North Star)

### 📉 Total Cost of Ownership (TCO) per Fix
*   **Definition:** The average cost incurred to resolve a single reported failure, including compute, human labeling, and engineering time.
*   **Formula:** `(Total Prompt Costs + Total RAG Ingestion Costs + Total Retrain Compute Costs + Human Labeling Hours * Hourly Rate) / Total Failures Resolved`
*   **Target:** < $75 per fix (vs. $500 baseline for full retrain).
*   **Why it Matters:** Directly impacts the P&L. Demonstrates that the product is becoming more efficient as it scales.

### 💰 TCO Savings vs. Baseline
*   **Definition:** The total dollar amount saved by using intelligent routing instead of defaulting to full model retraining for every error.
*   **Formula:** `(Total Failures * $500 Baseline Cost) - Actual Total Cost`
*   **Target:** > 80% savings month-over-month.
*   **Why it Matters:** The primary justification for building the triage engine.

## 2. Operational Efficiency Metrics

### 🚀 Flywheel Velocity
*   **Definition:** The percentage of failures resolved without requiring a full model retrain.
*   **Formula:** `(Prompt Fixes + RAG Updates) / Total Failures Resolved`
*   **Target:** > 85%.
*   **Why it Matters:** High velocity means the system is self-correcting quickly. If this drops, it indicates the base model is fundamentally misaligned or the RAG knowledge base is stale.

### ⏱️ Time-to-Resolution (TTR)
*   **Definition:** The time elapsed from when a user reports a failure to when the fix is deployed to production.
*   **Breakdown by Type:**
    *   *Prompt Fix:* Target < 1 hour.
    *   *RAG Update:* Target < 4 hours.
    *   *Retrain:* Target < 3 days.
*   **Why it Matters:** User trust is correlated with how quickly their feedback results in a visible improvement.

## 3. Quality & Safety Metrics

### 🛡️ Regression Pass Rate
*   **Definition:** The percentage of proposed fixes (Prompts/RAG) that pass the automated "Golden Dataset" evaluation gate without breaking existing functionality.
*   **Target:** > 98%.
*   **Why it Matters:** Ensures that fixing one bug doesn’t create two new ones. Critical for maintaining product stability.

### 🎯 Triage Accuracy
*   **Definition:** The percentage of failures correctly routed to the optimal correction path by the auto-triage engine.
*   **Measurement:** Manual audit of 100 random triage decisions per week.
*   **Target:** > 90%.
*   **Why it Matters:** If the triage engine is wrong, we waste money on expensive retrains for simple problems, or worse, apply a cheap prompt fix to a deep logic error, leaving the user frustrated.

## 4. User Engagement Metrics

### 🗣️ Feedback Participation Rate
*   **Definition:** The percentage of active users who provide explicit feedback (thumbs up/down) on AI outputs.
*   **Target:** > 5% of daily active users.
*   **Why it Matters:** The flywheel only works if we have data. Low participation means we are flying blind.

### 🔄 Repeat Failure Rate
*   **Definition:** The percentage of users who report the same type of error multiple times within a 7-day window.
*   **Target:** < 2%.
*   **Why it Matters:** Indicates that our "fixes" are not actually working or are not being deployed correctly.
