/**
 * Debug utility for Statistics Dashboard
 * This helps identify issues with APIs and data loading
 */

// Create once DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create debug panel
    createDebugPanel();
    
    // Start logging network requests
    monitorNetworkRequests();
    
    // Check script loading
    checkScriptLoading();
});

// Create debug panel
function createDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'stats-debug-panel';
    debugPanel.style.position = 'fixed';
    debugPanel.style.bottom = '10px';
    debugPanel.style.left = '10px';
    debugPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
    debugPanel.style.color = '#fff';
    debugPanel.style.padding = '10px';
    debugPanel.style.borderRadius = '5px';
    debugPanel.style.zIndex = '9999';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.maxWidth = '300px';
    debugPanel.style.maxHeight = '200px';
    debugPanel.style.overflowY = 'auto';
    debugPanel.style.display = 'none'; // Hidden by default
    
    // Debug toggle button
    const debugToggle = document.createElement('button');
    debugToggle.textContent = 'Debug';
    debugToggle.style.position = 'fixed';
    debugToggle.style.bottom = '10px';
    debugToggle.style.left = '10px';
    debugToggle.style.zIndex = '10000';
    debugToggle.style.padding = '5px 10px';
    
    // Status information
    const debugContent = document.createElement('div');
    debugContent.innerHTML = '<h3>Statistics Debug</h3>';
    debugPanel.appendChild(debugContent);
    
    // Add refresh button
    const refreshBtn = document.createElement('button');
    refreshBtn.textContent = 'Fix Scripts';
    refreshBtn.onclick = function() {
        fixCommonIssues();
    };
    debugPanel.appendChild(refreshBtn);
    
    // Toggle debug panel
    debugToggle.onclick = function() {
        if (debugPanel.style.display === 'none') {
            debugPanel.style.display = 'block';
            updateDebugInfo(debugContent);
        } else {
            debugPanel.style.display = 'none';
        }
    };
    
    // Add to document
    document.body.appendChild(debugToggle);
    document.body.appendChild(debugPanel);
}

// Update debug information
function updateDebugInfo(container) {
    // Check for common issues
    const issues = [];
    
    // Check if key scripts are loaded
    if (!window.CurrencyData) issues.push('❌ CurrencyData not loaded');
    if (!window.Chart) issues.push('❌ Chart.js not loaded');
    
    // Check for API objects
    const finnhubKey = window.FINNHUB_API_KEY || 'Not found';
    
    // Build status HTML
    let html = '<h3>Statistics Debug</h3>';
    html += `<p>Finnhub API Key: ${finnhubKey.substring(0, 8)}...</p>`;
    html += `<p>CurrencyData: ${window.CurrencyData ? '✅ Loaded' : '❌ Missing'}</p>`;
    html += `<p>Chart.js: ${window.Chart ? '✅ Loaded' : '❌ Missing'}</p>`;
    
    // List issues
    if (issues.length > 0) {
        html += '<h4>Issues Found:</h4>';
        html += '<ul>' + issues.map(issue => `<li>${issue}</li>`).join('') + '</ul>';
    } else {
        html += '<p>✅ No major issues detected</p>';
    }
    
    // Add API test buttons
    html += '<button onclick="testFinnhubAPI()">Test Finnhub API</button> ';
    html += '<button onclick="testExchangeRatesAPI()">Test Exchange API</button>';
    
    container.innerHTML = html;
}

// Monitor network requests for API calls
function monitorNetworkRequests() {
    // This requires manual checking of the network tab
    console.log('📊 Statistics Debug: Check Network tab for API requests');
}

// Check if required scripts are loaded
function checkScriptLoading() {
    const requiredScripts = [
        { name: 'Chart.js', global: 'Chart' },
        { name: 'CurrencyData', global: 'CurrencyData' },
        { name: 'TradingView', global: 'TradingView' }
    ];
    
    requiredScripts.forEach(script => {
        if (!window[script.global]) {
            console.warn(`📊 Statistics Debug: ${script.name} not loaded properly!`);
        }
    });
}

// Test Finnhub API
window.testFinnhubAPI = async function() {
    const apiKey = window.FINNHUB_API_KEY || '';
    const result = document.createElement('div');
    result.style.marginTop = '10px';
    result.innerHTML = 'Testing Finnhub API...';
    
    document.getElementById('stats-debug-panel').appendChild(result);
    
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${apiKey}`);
        const data = await response.json();
        
        if (data && data.c) {
            result.innerHTML = `✅ Finnhub API working! AAPL price: $${data.c}`;
        } else {
            result.innerHTML = `❌ Finnhub API response invalid: ${JSON.stringify(data)}`;
        }
    } catch (error) {
        result.innerHTML = `❌ Finnhub API error: ${error.message}`;
    }
};

// Test Exchange Rates API
window.testExchangeRatesAPI = async function() {
    const result = document.createElement('div');
    result.style.marginTop = '10px';
    result.innerHTML = 'Testing Exchange Rates API...';
    
    document.getElementById('stats-debug-panel').appendChild(result);
    
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        if (data && data.rates) {
            result.innerHTML = `✅ Exchange Rates API working! EUR rate: ${data.rates.EUR}`;
        } else {
            result.innerHTML = `❌ Exchange Rates API response invalid`;
        }
    } catch (error) {
        result.innerHTML = `❌ Exchange Rates API error: ${error.message}`;
    }
};

// Attempt to fix common issues
function fixCommonIssues() {
    console.log('Attempting to fix common issues...');
    
    // Try reloading scripts if missing
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(script);
    }
    
    // Force reload the currency data if missing
    if (!window.CurrencyData && window.loadExchangeRates) {
        console.log('Reloading exchange rates...');
        setTimeout(() => window.loadExchangeRates(true), 1000);
    }
    
    // Force refresh market data if indicators are showing errors
    if (window.loadMarketData) {
        console.log('Reloading market data...');
        setTimeout(() => window.loadMarketData(['sp500', 'nasdaq', 'dowjones']), 1000);
    }
    
    alert('Attempting to fix issues. Check console for details.');
}
