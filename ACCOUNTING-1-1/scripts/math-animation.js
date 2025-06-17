document.addEventListener('DOMContentLoaded', function() {
    // Create container for math elements if it doesn't exist
    let container = document.querySelector('.math-animation-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'math-animation-container';
        document.body.appendChild(container);
    }
    
    // Math operators and functions to display
    const mathSymbols = ['+', '-', '*', '/', '=', '%', '$'];
    const mathFunctions = ['SUM', 'AVG', 'MIN', 'MAX'];
    
    // Generate initial math elements
    createMathElements(60);
    
    // Add new elements periodically
    setInterval(() => {
        createMathElements(5);
        
        // Cleanup excess elements to prevent memory issues
        const elements = document.querySelectorAll('.math-element');
        if (elements.length > 100) {
            for (let i = 0; i < 5; i++) {
                if (elements[i] && elements[i].parentNode) {
                    elements[i].parentNode.removeChild(elements[i]);
                }
            }
        }
    }, 3000);
    
    // Function to create math animation elements
    function createMathElements(count) {
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'math-element';
            
            // Randomly decide what type of math to show
            const typeRandom = Math.random();
            
            if (typeRandom < 0.3) {
                // Show a calculation (e.g., "2 + 2 = 4")
                const num1 = Math.floor(Math.random() * 1000);
                const num2 = Math.floor(Math.random() * 100);
                const operator = mathSymbols[Math.floor(Math.random() * 4)]; // Only use +, -, *, /
                let result;
                
                switch(operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': result = (num1 / num2).toFixed(2); break;
                    default: result = num1 + num2;
                }
                
                element.textContent = `${num1} ${operator} ${num2} = ${result}`;
            } 
            else if (typeRandom < 0.6) {
                // Show a formula (e.g., "A = πr²")
                const formulas = [
                    "A = πr²", 
                    "P = 2l + 2w", 
                    "V = πr²h",
                    "E = mc²",
                    "F = ma",
                    "PV = nRT",
                    "ROI = (Gain - Cost)/Cost"
                ];
                element.textContent = formulas[Math.floor(Math.random() * formulas.length)];
            }
            else if (typeRandom < 0.8) {
                // Show a function with numbers (e.g., "SUM(1,2,3)")
                const func = mathFunctions[Math.floor(Math.random() * mathFunctions.length)];
                const count = Math.floor(Math.random() * 5) + 2;
                let numbers = [];
                for (let j = 0; j < count; j++) {
                    numbers.push(Math.floor(Math.random() * 100));
                }
                element.textContent = `${func}(${numbers.join(',')})`;
            }
            else {
                // Show money calculations (e.g., "$100 × 1.07 = $107")
                const amount = Math.floor(Math.random() * 10000) / 100;
                const rate = (Math.floor(Math.random() * 20) + 100) / 100; // 1.00 to 1.20
                const result = (amount * rate).toFixed(2);
                element.textContent = `$${amount} × ${rate} = $${result}`;
            }
            
            // Set random position and animation properties
            const posX = Math.random() * 100 + '%';
            const xShift = (Math.random() * 200 - 100) + 'px'; // Random horizontal shift
            const size = Math.random() * 12 + 14 + 'px'; // Font size between 14px and 26px
            const animationDelay = Math.random() * 15 + 's';
            const animationDuration = (Math.random() * 10 + 15) + 's';
            
            element.style.left = posX;
            element.style.setProperty('--x-shift', xShift);
            element.style.fontSize = size;
            element.style.animationDelay = animationDelay;
            element.style.animationDuration = animationDuration;
            
            // For dark mode compatibility, adjust color - IMPROVED VISIBILITY FOR LIGHT MODE
            if (document.body.getAttribute('data-theme') === 'dark') {
                element.style.color = 'rgba(255, 255, 255, 0.8)'; // Slightly increased opacity for dark mode
            } else {
                // More visible in light mode with higher opacity and darker color
                element.style.color = 'rgba(7, 16, 37, 0.8)';
            }
            
            // Add element to container
            container.appendChild(element);
        }
    }
    
    // Update element colors when theme changes
    document.addEventListener('themeChanged', function(e) {
        updateMathElementColors();
    });
    
    // Also check for theme toggle changes directly
    const themeToggle = document.querySelector('input[type="checkbox"]#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            updateMathElementColors();
        });
    }
    
    // Function to update all math element colors based on theme
    function updateMathElementColors() {
        const mathElements = document.querySelectorAll('.math-element');
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        mathElements.forEach(el => {
            el.style.color = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 30, 100, 0.2)';
        });
    }
    
    // Apply correct colors to existing elements on page load
    updateMathElementColors();
});
