class TriageEngine {
    constructor() {
        this.triageQueue = document.getElementById('triage-queue');
        this.workflow = null;
        this.processedItems = [];
        
        this.init();
    }

    async init() {
        const response = await fetch('data/correction-workflow.json');
        this.workflow = await response.json();

        window.addEventListener('failureReported', (e) => {
            this.processFailure(e.detail);
        });
    }

    processFailure(failure) {
        // Find routing rule
        const rule = this.workflow.routing_rules.find(r => r.failure_type === failure.failure_type);
        
        if (!rule) return;

        // Create UI Element
        const itemDiv = document.createElement('div');
        itemDiv.className = 'triage-item';
        
        let actionClass = 'action-prompt';
        if (rule.action === 'rag_update') actionClass = 'action-rag';
        if (rule.action === 'model_retrain') actionClass = 'action-retrain';

        itemDiv.innerHTML = `
            <div class="triage-header">
                <span>ID: ${failure.id}</span>
                <span class="triage-action ${actionClass}">${rule.action.replace('_', ' ').toUpperCase()}</span>
            </div>
            <div><strong>Error:</strong> ${failure.failure_type.replace('_', ' ')}</div>
            <div style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.8rem;">
                ${rule.description}
            </div>
            <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--accent-yellow);">
                Est. Cost: $${rule.estimated_cost} | Time: ${rule.time_to_fix_hours}h
            </div>
        `;

        // Remove empty state if present
        const emptyState = this.triageQueue.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        this.triageQueue.prepend(itemDiv);
        this.processedItems.push({ failure, rule });

        // Simulate processing time
        setTimeout(() => {
            itemDiv.classList.add('resolved');
            window.dispatchEvent(new CustomEvent('failureResolved', { 
                detail: { failure, rule } 
            }));
        }, 2000);
    }
}