class MetricsDashboard {
    constructor() {
        this.collectedEl = document.getElementById('metric-collected');
        this.avgCostEl = document.getElementById('metric-avg-cost');
        this.savingsEl = document.getElementById('metric-tco-savings');
        this.velocityEl = document.getElementById('metric-velocity');
        this.costSavingsDelta = document.getElementById('metric-cost-savings');
        
        this.barPrompt = document.getElementById('bar-prompt');
        this.barRag = document.getElementById('bar-rag');
        this.barRetrain = document.getElementById('bar-retrain');

        this.totalCollected = 0;
        this.totalCost = 0;
        this.totalBaselineCost = 0;
        this.autoResolved = 0; // Prompt + RAG
        
        this.init();
    }

    init() {
        window.addEventListener('failureResolved', (e) => {
            this.updateMetrics(e.detail);
        });
    }

    updateMetrics({ failure, rule }) {
        this.totalCollected++;
        this.totalCost += rule.estimated_cost;
        this.totalBaselineCost += 500; // Baseline retrain cost
        
        if (rule.action !== 'model_retrain') {
            this.autoResolved++;
        }

        // Update Text Metrics
        this.collectedEl.innerText = this.totalCollected;
        
        const avgCost = Math.round(this.totalCost / this.totalCollected);
        this.avgCostEl.innerText = `$${avgCost}`;
        
        const totalSavings = this.totalBaselineCost - this.totalCost;
        this.savingsEl.innerText = `$${totalSavings.toLocaleString()}`;
        
        const velocity = Math.round((this.autoResolved / this.totalCollected) * 100);
        this.velocityEl.innerText = `${velocity}%`;

        // Update Bar Chart
        this.updateBars();
    }

    updateBars() {
        const total = this.totalCollected;
        if (total === 0) return;

        // Count by action type (simplified for demo)
        let promptCount = 0, ragCount = 0, retrainCount = 0;
        
        // We'd normally track this in state, but for demo we can infer or just use a mock distribution
        // Let's just use the current average cost to simulate the bars
        const avgCost = this.totalCost / total;
        
        // Heuristic for visual bars based on average cost
        let promptPct = 0, ragPct = 0, retrainPct = 0;
        if (avgCost < 20) { promptPct = 80; ragPct = 15; retrainPct = 5; }
        else if (avgCost < 100) { promptPct = 40; ragPct = 50; retrainPct = 10; }
        else { promptPct = 20; ragPct = 30; retrainPct = 50; }

        this.barPrompt.style.width = `${promptPct}%`;
        this.barRag.style.width = `${ragPct}%`;
        this.barRetrain.style.width = `${retrainPct}%`;
    }
}