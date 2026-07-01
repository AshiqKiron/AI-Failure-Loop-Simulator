class FeedbackCollector {
    constructor() {
        this.failures = [];
        this.currentIndex = 0;
        this.chatWindow = document.getElementById('chat-window');
        this.genBtn = document.getElementById('gen-response-btn');
        this.queueCount = document.getElementById('queue-count');
        
        this.init();
    }

    async init() {
        const response = await fetch('data/mock-failures.json');
        this.mockData = await response.json();
        
        this.genBtn.addEventListener('click', () => this.generateInteraction());
    }

    generateInteraction() {
        if (this.currentIndex >= this.mockData.length) {
            this.currentIndex = 0; // Loop data
        }

        const data = this.mockData[this.currentIndex];
        this.currentIndex++;

        // Add User Message
        this.addMessage('user', data.user_prompt);

        // Add AI Message (with delay for effect)
        setTimeout(() => {
            const aiMsg = this.addMessage('ai', data.ai_response);
            aiMsg.classList.add('bad-output');
            
            // Add Report Button
            const reportBtn = document.createElement('button');
            reportBtn.className = 'report-btn';
            reportBtn.innerText = '⚠ Report Failure';
            reportBtn.onclick = () => this.reportFailure(data, reportBtn);
            aiMsg.appendChild(reportBtn);
        }, 800);
    }

    addMessage(type, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerText = text;
        this.chatWindow.appendChild(msgDiv);
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
        return msgDiv;
    }

    reportFailure(failureData, button) {
        button.disabled = true;
        button.innerText = '✓ Reported';
        button.style.opacity = '0.5';
        
        this.failures.push(failureData);
        this.updateQueueCount();
        
        // Dispatch custom event for Triage Engine
        window.dispatchEvent(new CustomEvent('failureReported', { detail: failureData }));
    }

    updateQueueCount() {
        this.queueCount.innerText = this.failures.length;
    }
}