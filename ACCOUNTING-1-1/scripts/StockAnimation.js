document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('stock-animation-container');
    const numBars = 100; // Increased number of bars for better coverage
    
    // Create stock bars
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.classList.add('stock-bar');
        
        // Randomly decide if stock goes up or down
        if (Math.random() > 0.5) {
            bar.classList.add('up');
        } else {
            bar.classList.add('down');
        }
        
        // Randomize position, height, and animation properties
        const posX = Math.random() * 100 + '%';
        const finalHeight = Math.random() * 150 + 50 + 'px'; // Taller bars
        const xShift = (Math.random() * 200 - 100) + 'px'; // Random horizontal drift
        const animationDelay = Math.random() * 15 + 's'; // More spread in delay
        const animationDuration = (Math.random() * 8 + 8) + 's'; // Longer durations
        
        bar.style.left = posX;
        bar.style.setProperty('--final-height', finalHeight);
        bar.style.setProperty('--x-shift', xShift);
        bar.style.animationDelay = animationDelay;
        bar.style.animationDuration = animationDuration;
        
        // Create at random starting points along the viewport height
        if (Math.random() > 0.5) {
            // Some bars start mid-screen
            const startY = Math.random() * 100 + '%';
            bar.style.top = startY;
        }
        
        container.appendChild(bar);
    }

    // Add more bars periodically to ensure continuous animation
    setInterval(() => {
        const bar = document.createElement('div');
        bar.classList.add('stock-bar');
        
        if (Math.random() > 0.5) {
            bar.classList.add('up');
        } else {
            bar.classList.add('down');
        }
        
        const posX = Math.random() * 100 + '%';
        const finalHeight = Math.random() * 150 + 50 + 'px';
        const xShift = (Math.random() * 200 - 100) + 'px';
        const animationDuration = (Math.random() * 8 + 8) + 's';
        
        bar.style.left = posX;
        bar.style.setProperty('--final-height', finalHeight);
        bar.style.setProperty('--x-shift', xShift);
        bar.style.animationDuration = animationDuration;
        
        container.appendChild(bar);
        
        // Remove old bars to prevent DOM bloat
        if (container.children.length > numBars + 20) {
            container.removeChild(container.children[0]);
        }
    }, 2000);
});
