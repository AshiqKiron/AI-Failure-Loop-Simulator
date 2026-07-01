# AI Failure Loop Simulator

An interactive product portfolio project demonstrating how to operationalize the "Data Flywheel" for AI products. This simulator visualizes the end-to-end process of collecting bad AI outputs, intelligently triaging them to the most cost-effective correction method, and tracking the ROI of the continuous improvement loop.

👉 **[Launch Interactive Demo](https://[your-username].github.io/ai-failure-loop-simulator/)**

## 🎯 The Product Problem
Most AI teams treat model deployment as the finish line. In reality, it's the starting line. When models fail in production, teams often default to expensive, slow full-model retraining for every error. This results in massive cloud compute waste and slow time-to-resolution.

## 💡 The Solution: Intelligent Triage
This simulator demonstrates a productized failure loop that routes errors based on their root cause:
1. **Prompt Engineering (Low Cost):** Fixes tone, formatting, and style.
2. **RAG Updates (Med Cost):** Fixes hallucinations and knowledge gaps by updating the vector database.
3. **Model Retraining (High Cost):** Reserved only for deep logic/reasoning failures.

## 📊 Key Metrics Tracked
- **TCO Savings:** Dollars saved by avoiding unnecessary full-model retraining.
- **Flywheel Velocity:** Percentage of errors resolved via cheap/automated methods vs expensive manual retraining.
- **Time-to-Fix:** SLA tracking for different error categories.

## 🛠 Tech Stack
- Vanilla HTML5, CSS3, JavaScript (ES6)
- No build steps, no frameworks, 100% free to host on GitHub Pages.

## 📁 Project Structure
- `index.html`: Main dashboard layout.
- `js/`: Modular JS handling Collection, Triage, and Metrics.
- `data/`: JSON configurations for mock failures and routing rules.
- `docs/`: Product Requirements Document (PRD) and Architecture diagrams.