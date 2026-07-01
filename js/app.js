// Main Application Orchestrator
class App {
    constructor() {
        this.collector = new FeedbackCollector();
        this.triage = new TriageEngine();
        this.metrics = new MetricsDashboard();
        
        this.simulateBtn = document.getElementById('auto-simulate-btn');
        this.isSimulating = false;
        this.simulationInterval = null;
        
        this.init();
    }

    init() {
        this.simulateBtn.addEventListener('click', () => this.toggleSimulation());
    }

    toggleSimulation() {
        if (this.isSimulating) {
            clearInterval(this.simulationInterval);
            this.simulateBtn.innerText = '▶ Run Flywheel Simulation';
            this.simulateBtn.style.background = 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))';
            this.isSimulating = false;
        } else {
            this.simulateBtn.innerText = '⏸ Pause Simulation';
            this.simulateBtn.style.background = 'var(--accent-red)';
            this.isSimulating = true;
            
            // Run immediately, then set interval
            this.collector.generateInteraction();
            this.simulationInterval = setInterval(() => {
                this.collector.generateInteraction();
            }, 3000); // Generate a failure every 3 seconds
        }
    }
}

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});