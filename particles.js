document.addEventListener('DOMContentLoaded', function() {
    console.log('Particles script loaded');
    
    // Create particles container if it doesn't exist
    let container = document.querySelector('.particles-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'particles-container';
        document.body.appendChild(container);
        console.log('Particles container created');
    }
    
    // Configuration - consistent for both pages
    const config = {
        particleCount: 50,
        minSize: 3,
        maxSize: 7,
        minDuration: 15,
        maxDuration: 30,
        minOpacity: 0.15,
        maxOpacity: 0.4
    };
    
    // Create initial batch of particles
    for (let i = 0; i < config.particleCount; i++) {
        createParticle(container, config);
    }
    
    // Create more particles periodically
    setInterval(() => {
        if (container.children.length < config.particleCount) {
            createParticle(container, config);
        }
    }, 2000);
    
    console.log(`Created ${config.particleCount} initial particles`);
});

function createParticle(container, config) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Random travel distance
    const travelX = Math.random() * 200 - 100; // -100px to +100px
    const travelY = Math.random() * -200 - 50; // -50px to -250px (upward drift)
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--opacity', opacity);
    particle.style.setProperty('--travel-x', `${travelX}px`);
    particle.style.setProperty('--travel-y', `${travelY}px`);
    
    // Add to container
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode === container) {
            container.removeChild(particle);
        }
    }, duration * 1000);
    
    return particle;
}
