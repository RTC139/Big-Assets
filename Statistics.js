// Constants for Finnhub API
const FINNHUB_API_KEY = 'd0avtfhr01qlq65pvsngd0avtfhr01qlq65pvso0'; // Replace with your actual Finnhub API key
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Market index mappings to direct index symbols for Finnhub API
const marketIndices = {
    'sp500': { symbol: '^GSPC', name: 'S&P 500' },    // Direct index symbol
    'nasdaq': { symbol: '^IXIC', name: 'NASDAQ' },    // Direct index symbol
    'dowjones': { symbol: '^DJI', name: 'Dow Jones' }, // Direct index symbol
    'russell2000': { symbol: '^RUT', name: 'Russell 2000' }, // Direct index symbol
    'vix': { symbol: '^VIX', name: 'VIX Volatility' },
    'ftse100': { symbol: '^FTSE', name: 'FTSE 100' },
    'dax': { symbol: '^GDAXI', name: 'DAX' },
    'nikkei225': { symbol: '^N225', name: 'Nikkei 225' },
    'hangseng': { symbol: '^HSI', name: 'Hang Seng' },
    'shanghai': { symbol: '000001.SS', name: 'Shanghai Composite' },
    'psei': { symbol: 'PSEI.PS', name: 'Philippines Index' }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    updateTime();
    
    // Create required indicators if missing
    createDataIndicators();
    
    // Check if market overview exists and load data
    const marketOverview = document.querySelector('.market-overview');
    if (marketOverview) {
        loadMarketData(['sp500', 'nasdaq', 'dowjones']);
    }
    
    // Initialize trading view widget with default stock
    initializeTradingViewWidget('AAPL');
    
    // Load stock summary information
    updateStockSummary('AAPL');
    
    // Load news for the default stock
    loadStockNews('AAPL');
    
    // Initialize components with improved error handling
    try {
        initializeExchangeRates();
    } catch (e) {
        console.error('Error initializing exchange rates:', e);
    }
    
    try {
        setupThemeSwitcher();
    } catch (e) {
        console.error('Error setting up theme switcher:', e);
    }
    
    try {
        initMarketScreener();
    } catch (e) {
        console.error('Error initializing market screener:', e);
    }
    
    try {
        initializeStockSearch();
    } catch (e) {
        console.error('Error initializing stock search:', e);
    }
    
    try {
        setupFavoriteStocks();
    } catch (e) {
        console.error('Error setting up favorite stocks:', e);
    }
    
    try {
        setupChartControls();
    } catch (e) {
        console.error('Error setting up chart controls:', e);
    }
    
    // Set up event listeners for stock select
    document.getElementById('stock-select').addEventListener('change', function() {
        const selectedStock = this.value;
        updateStockTrendsView(selectedStock);
    });
    
    // Setup comparison options if they exist
    if (document.getElementById('compare-stock')) {
        document.getElementById('compare-stock').addEventListener('change', function() {
            const mainStock = document.getElementById('stock-select').value;
            const timeRange = getActiveTimeRange();
            const chartStyle = getActiveChartStyle();
            initializeTradingViewWidget(mainStock, this.value, timeRange, chartStyle);
        });
    }
    
    // Setup refresh button
    document.getElementById('refresh-btn').addEventListener('click', function() {
        updateTime();
        const selectedStock = document.getElementById('stock-select').value;
        updateStockTrendsView(selectedStock, true); // true for refresh
        
        if (marketOverview) {
            const indexDisplay = document.getElementById('index-display');
            if (indexDisplay) {
                const selectedIndex = indexDisplay.value;
                loadMarketData(selectedIndex === 'all' ? ['sp500', 'nasdaq', 'dowjones'] : [selectedIndex]);
            } else {
                loadMarketData();
            }
        }
    });
    
    // Add to favorites button
    document.getElementById('add-favorite').addEventListener('click', function() {
        const selectedStock = document.getElementById('stock-select').value;
        toggleFavoriteStock(selectedStock);
    });
    
    // Add event listener for index display dropdown
    const indexDisplay = document.getElementById('index-display');
    if (indexDisplay) {
        indexDisplay.addEventListener('change', function() {
            const selectedValue = this.value;
            updateIndexDisplay(selectedValue);
        });
        
        // Initialize with default selection
        updateIndexDisplay(indexDisplay.value);
    }
    
    // Add event listener for load data button with improved error handling
    const loadDataBtn = document.getElementById('load-data-btn');
    if (loadDataBtn) {
        loadDataBtn.addEventListener('click', function() {
            console.log('Load Data button clicked');
            try {
                loadWorldBankData();
            } catch (e) {
                console.error('Error loading World Bank data:', e);
                alert('Failed to load economic data. Using sample data instead.');
                useWorldBankSampleData('USA', 'NY.GDP.MKTP.KD.ZG', 'GDP Growth (%)', 'United States');
            }
        });
    }
    
    // Add event listener for refresh rates button with improved error handling
    const refreshForexBtn = document.getElementById('refresh-forex-btn');
    if (refreshForexBtn) {
        refreshForexBtn.addEventListener('click', function() {
            console.log('Refresh Rates button clicked');
            try {
                loadExchangeRates(false); // false means not initial load, so force refresh
            } catch (e) {
                console.error('Error refreshing exchange rates:', e);
                alert('Failed to refresh exchange rates. Please try again later.');
            }
        });
    }
    
    // Other event listeners as before...
    // ...existing code...
});

// Create necessary data indicators on page load
function createDataIndicators() {
    // Create market data indicator if it doesn't exist
    const marketOverview = document.querySelector('.market-overview');
    if (marketOverview && !document.querySelector('.market-data-indicator')) {
        const marketIndicator = document.createElement('div');
        marketIndicator.className = 'market-data-indicator';
        marketIndicator.style.position = 'absolute';
        marketIndicator.style.top = '10px';
        marketIndicator.style.right = '10px';
        marketIndicator.style.fontSize = '12px';
        marketIndicator.style.padding = '5px 10px';
        marketIndicator.style.borderRadius = '4px';
        marketIndicator.style.fontWeight = 'bold';
        marketIndicator.style.zIndex = '10';
        marketIndicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#e67e22;margin-right:5px;"></span> Loading Market Data';
        marketOverview.style.position = 'relative';
        marketOverview.appendChild(marketIndicator);
    }
}

// Update the dashboard timestamp
function updateTime() {
    const now = new Date();
    const updateTimeElement = document.getElementById('update-time');
    if (updateTimeElement) {
        updateTimeElement.textContent = now.toLocaleString();
    }
}

// Initialize TradingView widget with improved colors for eye comfort
function initializeTradingViewWidget(symbol, compareSymbol = null, timeRange = '1M', chartStyle = '1') {
    // Get the container element
    const chartContainer = document.querySelector('.stock-trends .chart-container');
    
    // Clear any existing content
    chartContainer.innerHTML = '';
    
    // Create container for TradingView widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'tradingview-widget';
    widgetContainer.style.width = '100%';
    widgetContainer.style.height = '400px';
    chartContainer.appendChild(widgetContainer);
    
    // Map time range to interval
    const intervalMap = {
        '1D': '5',    // 5 minute bars for 1 day
        '1W': '15',   // 15 minute bars for 1 week
        '1M': '60',   // 1 hour bars for 1 month
        '3M': 'D',    // Daily bars for 3 months
        '6M': 'D',    // Daily bars for 6 months
        '1Y': 'D',    // Daily bars for 1 year
        '5Y': 'W',    // Weekly bars for 5 years
        'MAX': 'M'    // Monthly bars for max time
    };
    
    // Get theme and customize options for eye comfort
    const currentTheme = localStorage.getItem('theme');
    const isLightTheme = !currentTheme || currentTheme === 'light';
    
    // Create the TradingView widget with customized options
    new TradingView.widget({
        "width": "100%",
        "height": "100%",
        "symbol": symbol,
        "interval": intervalMap[timeRange] || 'D',
        "timezone": "exchange",
        "theme": isLightTheme ? "light" : "dark",
        "style": chartStyle, // Use the provided chart style
        "locale": "en",
        "toolbar_bg": isLightTheme ? "#f0f4f8" : "#2d3748",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "hide_side_toolbar": true,
        "allow_symbol_change": false,
        "save_image": true,
        "studies": [
            "MASimple@tv-basicstudies"
        ],
        "container_id": "tradingview-widget",
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "compare_symbols": compareSymbol ? [compareSymbol] : [],
        "range": timeRange.toLowerCase(),
        // Custom colors for light theme to be easier on eyes
        "overrides": isLightTheme ? {
            "paneProperties.background": "#f8fafc",
            "paneProperties.vertGridProperties.color": "#edf2f7",
            "paneProperties.horzGridProperties.color": "#edf2f7",
            "scalesProperties.textColor": "#45505e",
            "mainSeriesProperties.candleStyle.upColor": "#4caf50",
            "mainSeriesProperties.candleStyle.downColor": "#f44336",
            "mainSeriesProperties.candleStyle.wickUpColor": "#4caf50",
            "mainSeriesProperties.candleStyle.wickDownColor": "#f44336"
        } : {}
    });
    
    // Add data source indicator
    const indicator = document.createElement('div');
    indicator.className = 'stock-data-source';
    indicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#2962FF;margin-right:5px;"></span> Live TradingView Data';
    indicator.style.position = 'absolute';
    indicator.style.bottom = '10px';
    indicator.style.right = '10px';
    indicator.style.fontSize = '12px';
    indicator.style.padding = '5px 10px';
    indicator.style.backgroundColor = 'rgba(41, 98, 255, 0.1)';
    indicator.style.borderRadius = '4px';
    indicator.style.color = '#2962FF';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '100';
    
    // Set container position for absolute positioning
    chartContainer.style.position = 'relative';
    
    // Remove any existing indicator
    const existingIndicator = document.querySelector('.stock-data-source');
    if (existingIndicator) existingIndicator.remove();
    
    // Add after widget is created
    setTimeout(() => chartContainer.appendChild(indicator), 1000);
}

// Function to update all stock trends related components
function updateStockTrendsView(symbol, isRefresh = false) {
    const timeRange = getActiveTimeRange();
    const chartStyle = getActiveChartStyle();
    const compareSymbol = document.getElementById('compare-stock').value;
    
    // Update trading view widget
    initializeTradingViewWidget(symbol, compareSymbol, timeRange, chartStyle);
    
    // Update stock summary
    updateStockSummary(symbol);
    
    // Update news only if specifically refreshing or changing stock
    if (isRefresh || !document.querySelector('.news-item')) {
        loadStockNews(symbol);
    }
    
    // Update favorite button state
    updateFavoriteButtonState(symbol);
    
    // Highlight this stock in favorites bar if it exists
    highlightActiveFavorite(symbol);
}

// Get the currently selected time range
function getActiveTimeRange() {
    const activeButton = document.querySelector('.time-btn.active');
    return activeButton ? activeButton.getAttribute('data-range') : '1M';
}

// Get the currently selected chart style
function getActiveChartStyle() {
    const activeButton = document.querySelector('.chart-type-btn.active');
    return activeButton ? activeButton.getAttribute('data-type') : '1';
}

// Initialize stock search functionality
function initializeStockSearch() {
    const searchInput = document.getElementById('stock-search');
    const resultsContainer = document.getElementById('search-results-container');
    
    if (!searchInput || !resultsContainer) return;
    
    // Get all available stocks from the dropdown
    const allStocks = getAllStocksFromDropdown();
    
    // Handle input in search box
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        // Clear results
        resultsContainer.innerHTML = '';
        
        if (query.length < 1) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        // Filter stocks based on query
        const filteredStocks = allStocks.filter(stock => {
            return stock.symbol.toLowerCase().includes(query) || 
                   stock.name.toLowerCase().includes(query) ||
                   stock.sector.toLowerCase().includes(query);
        }).slice(0, 10); // Limit to 10 results
        
        if (filteredStocks.length > 0) {
            resultsContainer.classList.add('active');
            
            // Create results
            filteredStocks.forEach(stock => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `<strong>${stock.symbol}</strong> - ${stock.name} <span style="opacity:0.7">(${stock.sector})</span>`;
                
                // Handle click on result
                resultItem.addEventListener('click', function() {
                    // Update dropdown selection
                    document.getElementById('stock-select').value = stock.symbol;
                    
                    // Update the view
                    updateStockTrendsView(stock.symbol);
                    
                    // Clear and close search
                    searchInput.value = '';
                    resultsContainer.innerHTML = '';
                    resultsContainer.classList.remove('active');
                });
                
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.classList.add('active');
            resultsContainer.innerHTML = '<div class="search-result-item">No matching stocks found</div>';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

// Get all stocks from the dropdown
function getAllStocksFromDropdown() {
    const stockSelect = document.getElementById('stock-select');
    const stocks = [];
    
    if (!stockSelect) return stocks;
    
    // Loop through all option groups
    Array.from(stockSelect.querySelectorAll('optgroup')).forEach(group => {
        const sector = group.label;
        
        // Loop through all options in this group
        Array.from(group.querySelectorAll('option')).forEach(option => {
            const fullText = option.textContent;
            const symbolMatch = fullText.match(/\(([^)]+)\)/);
            const symbol = symbolMatch ? symbolMatch[1] : option.value;
            const name = fullText.replace(/\s*\([^)]*\)\s*/, '').trim();
            
            stocks.push({
                symbol: symbol,
                name: name,
                value: option.value,
                sector: sector
            });
        });
    });
    
    return stocks;
}

// Update stock summary card
function updateStockSummary(symbol) {
    const summarySymbol = document.getElementById('summary-symbol');
    const summaryName = document.getElementById('summary-name');
    const summaryPrice = document.getElementById('summary-price');
    const summaryChange = document.getElementById('summary-change');
    const summaryMarketCap = document.getElementById('summary-marketcap');
    const summaryRange = document.getElementById('summary-range');
    
    if (!summarySymbol) return;
    
    // Show loading state
    summarySymbol.textContent = symbol;
    summaryName.textContent = "Loading...";
    summaryPrice.textContent = "--";
    summaryChange.textContent = "--";
    summaryMarketCap.textContent = "--";
    summaryRange.textContent = "--";
    
    // Fetch stock data from Finnhub
    fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response failed');
            return response.json();
        })
        .then(quoteData => {
            // Get company profile for additional info
            return fetch(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response failed');
                    return response.json();
                })
                .then(profileData => {
                    return { quote: quoteData, profile: profileData };
                });
        })
        .then(data => {
            // Update the summary card with real data
            summarySymbol.textContent = symbol;
            summaryName.textContent = data.profile.name || getStockNameFromSymbol(symbol);
            
            // Format price
            summaryPrice.textContent = `$${data.quote.c.toFixed(2)}`;
            
            // Format change
            const changeValue = data.quote.d;
            const changePercent = data.quote.dp;
            summaryChange.textContent = `${changeValue >= 0 ? '+' : ''}${changeValue.toFixed(2)} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`;
            summaryChange.className = `metric-value ${changeValue >= 0 ? 'positive' : 'negative'}`;
            
            // Format market cap
            const marketCap = data.profile.marketCapitalization;
            summaryMarketCap.textContent = formatMarketCapForDisplay(marketCap * 1000000);
            
            // Calculate 52-week range
            const high = data.quote.h;
            const low = data.quote.l;
            summaryRange.textContent = `$${low.toFixed(2)} - $${high.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            
            // Use placeholder data on failure
            summarySymbol.textContent = symbol;
            summaryName.textContent = getStockNameFromSymbol(symbol);
            summaryPrice.textContent = "$--";
            summaryChange.textContent = "--";
            summaryMarketCap.textContent = "--";
            summaryRange.textContent = "--";
        });
}

// Get stock name from symbol using the dropdown
function getStockNameFromSymbol(symbol) {
    const stockSelect = document.getElementById('stock-select');
    const option = Array.from(stockSelect.options).find(opt => opt.value === symbol);
    return option ? option.textContent.split('(')[0].trim() : symbol;
}

// Format market cap for display in summary
function formatMarketCapForDisplay(marketCap) {
    if (!marketCap) return 'N/A';
    
    if (marketCap >= 1000000000000) {
        return `$${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (marketCap >= 1000000000) {
        return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
        return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else {
        return `$${(marketCap / 1000).toFixed(2)}K`;
    }
}

// Setup favorite stocks functionality
function setupFavoriteStocks() {
    // Load favorites from localStorage
    loadFavorites();
}

// Load favorites from localStorage
function loadFavorites() {
    const favoritesContainer = document.getElementById('favorite-stocks');
    if (!favoritesContainer) return;
    
    // Clear container
    favoritesContainer.innerHTML = '';
    
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
    
    if (favorites.length === 0) {
        // Show default suggested stocks
        const defaultFavorites = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
        
        defaultFavorites.forEach(symbol => {
            const tag = createFavoriteStockTag(symbol, false);
            favoritesContainer.appendChild(tag);
        });
        
        // Add a hint that these are suggestions
        const hint = document.createElement('span');
        hint.style.fontSize = '12px';
        hint.style.opacity = '0.7';
        hint.style.marginLeft = '10px';
        hint.textContent = '(suggested)';
        favoritesContainer.appendChild(hint);
    } else {
        // Show user's favorites
        favorites.forEach(stock => {
            const tag = createFavoriteStockTag(stock.symbol, true);
            favoritesContainer.appendChild(tag);
        });
    }
}

// Create a favorite stock tag element
function createFavoriteStockTag(symbol, isSaved) {
    const tag = document.createElement('div');
    tag.className = 'favorite-stock-tag';
    if (!isSaved) tag.classList.add('suggested');
    tag.textContent = symbol;
    tag.dataset.symbol = symbol;
    
    // Handle click on favorite
    tag.addEventListener('click', function() {
        // Update dropdown
        document.getElementById('stock-select').value = symbol;
        
        // Update view
        updateStockTrendsView(symbol);
    });
    
    return tag;
}

// Toggle a stock as favorite
function toggleFavoriteStock(symbol) {
    // Get current favorites
    let favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
    
    // Check if this stock is already a favorite
    const existingIndex = favorites.findIndex(stock => stock.symbol === symbol);
    
    if (existingIndex >= 0) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
    } else {
        // Add to favorites
        const stockName = getStockNameFromSymbol(symbol);
        favorites.push({
            symbol: symbol,
            name: stockName
        });
    }
    
    // Save to localStorage
    localStorage.setItem('favoriteStocks', JSON.stringify(favorites));
    
    // Update UI
    loadFavorites();
    updateFavoriteButtonState(symbol);
}

// Update favorite button state
function updateFavoriteButtonState(symbol) {
    const favoriteButton = document.getElementById('add-favorite');
    if (!favoriteButton) return;
    
    // Get current favorites
    const favorites = JSON.parse(localStorage.getItem('favoriteStocks') || '[]');
    
    // Check if this stock is a favorite
    const isFavorite = favorites.some(stock => stock.symbol === symbol);
    
    // Update button state
    if (isFavorite) {
        favoriteButton.classList.add('active');
        favoriteButton.title = 'Remove from favorites';
    } else {
        favoriteButton.classList.remove('active');
        favoriteButton.title = 'Add to favorites';
    }
}

// Highlight active favorite in the favorites bar
function highlightActiveFavorite(symbol) {
    // Remove active class from all tags
    document.querySelectorAll('.favorite-stock-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    
    // Add active class to the matching tag
    const activeTag = document.querySelector(`.favorite-stock-tag[data-symbol="${symbol}"]`);
    if (activeTag) {
        activeTag.classList.add('active');
    }
}

// Setup chart controls
function setupChartControls() {
    // Chart type buttons
    document.querySelectorAll('.chart-type-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.chart-type-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart
            const selectedStock = document.getElementById('stock-select').value;
            const timeRange = getActiveTimeRange();
            const chartStyle = this.getAttribute('data-type');
            const compareSymbol = document.getElementById('compare-stock').value;
            
            initializeTradingViewWidget(selectedStock, compareSymbol, timeRange, chartStyle);
        });
    });
    
    // Time range buttons
    document.querySelectorAll('.time-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart
            const selectedStock = document.getElementById('stock-select').value;
            const timeRange = this.getAttribute('data-range');
            const chartStyle = getActiveChartStyle();
            const compareSymbol = document.getElementById('compare-stock').value;
            
            initializeTradingViewWidget(selectedStock, compareSymbol, timeRange, chartStyle);
        });
    });
}

// Market Overview Section - Using queue system for API calls
function loadMarketData(indices = ['sp500', 'nasdaq', 'dowjones']) {
    // Check if the market overview section exists
    const marketOverview = document.querySelector('.market-overview');
    if (!marketOverview) {
        return; // Skip if section doesn't exist
    }
    
    // Update the last updated time
    updateTime();
    
    // Update indicator to show "connecting" status
    updateMarketDataIndicator(false, 'Connecting to Finnhub API...');
    
    // Process indices one by one to avoid rate limiting
    const pendingIndices = [...indices];
    let successCount = 0;
    
    // Create a queue to handle API rate limits
    const fetchQueue = async () => {
        if (pendingIndices.length === 0) {
            // All done - update the indicator
            updateMarketDataIndicator(
                successCount > 0, 
                successCount > 0 ? 
                    `Live market data from Finnhub as of ${new Date().toLocaleString()}` : 
                    'Could not load market data'
            );
            return;
        }
        
        const indexId = pendingIndices.shift();
        const symbol = marketIndices[indexId]?.symbol;
        
        if (!symbol) {
            console.warn(`No symbol found for index ID: ${indexId}`);
            // Process next in queue
            setTimeout(fetchQueue, 0);
            return;
        }
        
        try {
            // Show the card if it was hidden
            const element = document.getElementById(indexId);
            if (element) {
                element.style.display = '';
                
                // Show loading state
                const valueElement = element.querySelector('.value');
                const changeElement = element.querySelector('.change');
                
                if (valueElement) valueElement.textContent = 'Loading...';
                if (changeElement) {
                    changeElement.textContent = '--';
                    changeElement.className = 'change';
                }
            }
            
            // Fetch data for this index
            const success = await fetchMarketData(symbol, indexId);
            if (success) successCount++;
        } catch (error) {
            console.error(`Error processing ${indexId}:`, error);
        }
        
        // Queue the next fetch with a delay to respect API limits
        if (pendingIndices.length > 0) {
            // Add 1.5 second delay between calls to avoid rate limits
            setTimeout(fetchQueue, 1500);
        } else {
            // Update indicator with final status
            updateMarketDataIndicator(
                successCount > 0, 
                successCount > 0 ? 
                    `Live market data from Finnhub as of ${new Date().toLocaleString()}` : 
                    'Could not load market data'
            );
        }
    };
    
    // Start the queue
    fetchQueue();
}

// Fetch data for a specific index from Finnhub
async function fetchMarketData(symbol, elementId) {
    try {
        console.log(`Fetching data for ${symbol} (${elementId})`);
        
        // Attempt to fetch data from Finnhub
        const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Finnhub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if we got meaningful data
        if (data.c === 0 && data.dp === 0) {
            console.warn(`Received zero values for ${symbol}, using fallback`);
            return useFallbackData(symbol, elementId);
        }
        
        // Update UI with the fetched data
        const element = document.getElementById(elementId);
        if (element) {
            const valueElement = element.querySelector('.value');
            const changeElement = element.querySelector('.change');
            
            // Format the price with appropriate decimal places
            const price = data.c.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            if (valueElement) valueElement.textContent = price;
            
            if (changeElement) {
                const percentChange = data.dp.toFixed(2);
                changeElement.textContent = (percentChange >= 0 ? '+' : '') + percentChange + '%';
                changeElement.className = 'change ' + (percentChange >= 0 ? 'positive' : 'negative');
            }
        }
        
        return true;
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
        return useFallbackData(symbol, elementId);
    }
}

// Fallback data for indices when API fails
function useFallbackData(symbol, elementId) {
    // Realistic fallback values for each index
    const fallbackData = {
        '^GSPC': { value: 5123.41, change: 0.57 },    // S&P 500
        '^IXIC': { value: 16273.38, change: 0.35 },   // NASDAQ
        '^DJI': { value: 38654.42, change: 0.32 },    // Dow Jones
        '^RUT': { value: 2017.79, change: -0.17 },    // Russell 2000
        '^VIX': { value: 15.36, change: -2.53 },      // VIX
        '^FTSE': { value: 7865.35, change: 0.41 },    // FTSE 100
        '^GDAXI': { value: 17045.95, change: 0.76 },  // DAX
        '^N225': { value: 38487.90, change: 0.41 },   // Nikkei 225
        '^HSI': { value: 17650.67, change: -1.52 },   // Hang Seng
        '000001.SS': { value: 3067.93, change: -1.12 }, // Shanghai 
        'PSEI.PS': { value: 6684.54, change: 0.33 }   // PSEI
    };
    
    // Default fallback if specific symbol not found
    const data = fallbackData[symbol] || { 
        value: (Math.random() * 1000 + 1000).toFixed(2), 
        change: (Math.random() * 4 - 2).toFixed(2) 
    };
    
    // Apply small variation to make values look real
    const variation = (Math.random() * 0.08 - 0.04);
    const value = data.value * (1 + variation);
    const change = data.change + (variation * 10);
    
    // Update UI with fallback data
    const element = document.getElementById(elementId);
    if (element) {
        const valueElement = element.querySelector('.value');
        const changeElement = element.querySelector('.change');
        
        if (valueElement) valueElement.textContent = value.toFixed(2);
        if (changeElement) {
            changeElement.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
            changeElement.className = 'change ' + (change >= 0 ? 'positive' : 'negative');
        }
    }
    
    return false; // Indicate we used fallback data
}

// Update market data indicator
function updateMarketDataIndicator(isRealData, message = null) {
    const indicator = document.querySelector('.market-data-indicator');
    if (!indicator) return;
    
    if (isRealData) {
        indicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#27ae60;margin-right:5px;"></span> Live Market Data';
        indicator.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        indicator.style.color = '#27ae60';
    } else {
        indicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#e67e22;margin-right:5px;"></span> Loading Market Data';
        indicator.style.backgroundColor = 'rgba(243, 156, 18, 0.2)';
        indicator.style.color = '#d35400';
    }
    
    indicator.title = message || '';
}

// Data source indicator for economic data
function updateDataSourceIndicator(isRealData, message = null) {
    const existingIndicator = document.querySelector('.data-source-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    const indicator = document.createElement('div');
    indicator.className = 'data-source-indicator';
    
    if (isRealData) {
        indicator.innerHTML = '<span class="indicator-dot real"></span> Using Real World Bank Data';
        indicator.title = message || 'Data retrieved from World Bank API';
    } else {
        indicator.innerHTML = '<span class="indicator-dot mock"></span> Using Sample Data';
        indicator.title = message || 'Using local sample data (API unavailable)';
    }
    
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.fontSize = '12px';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '4px';
    indicator.style.backgroundColor = isRealData ? 'rgba(46, 204, 113, 0.2)' : 'rgba(243, 156, 18, 0.2)';
    indicator.style.color = isRealData ? '#27ae60' : '#d35400';
    indicator.style.fontWeight = 'bold';
    
    const dot = indicator.querySelector('.indicator-dot');
    dot.style.display = 'inline-block';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '50%';
    dot.style.marginRight = '5px';
    
    if (isRealData) {
        dot.style.backgroundColor = '#27ae60';
    } else {
        dot.style.backgroundColor = '#e67e22';
    }
    
    const chartContainer = document.querySelector('.economic-indicators .chart-container');
    chartContainer.style.position = 'relative';
    chartContainer.appendChild(indicator);
}

// World Bank API functions
function loadWorldBankData() {
    console.log('Loading World Bank data...');
    
    // Get selected values
    const countryCode = document.getElementById('country-select').value;
    const indicatorCode = document.getElementById('indicator-select').value;
    const indicatorName = document.getElementById('indicator-select').options[
        document.getElementById('indicator-select').selectedIndex].text;
    const countryName = document.getElementById('country-select').options[
        document.getElementById('country-select').selectedIndex].text;
    
    console.log(`Selected country: ${countryName} (${countryCode})`);
    console.log(`Selected indicator: ${indicatorName} (${indicatorCode})`);
    
    // Show loading state
    const chartContainer = document.querySelector('.economic-indicators .chart-container');
    if (!chartContainer) {
        console.error('Chart container not found!');
        return;
    }
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading data...';
    loadingIndicator.style.textAlign = 'center';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.backgroundColor = 'rgba(0,0,0,0.05)';
    loadingIndicator.style.borderRadius = '4px';
    loadingIndicator.style.margin = '20px 0';
    
    // Remove existing loading indicator if any
    const existingLoading = chartContainer.querySelector('.loading-indicator');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    chartContainer.prepend(loadingIndicator);
    
    // Show connecting indicator
    updateDataSourceIndicator(false, 'Connecting to World Bank API...');
    
    // World Bank API URL
    const apiUrl = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?date=2010:2025&format=json&per_page=15`;
    
    console.log('Attempting World Bank API call:', apiUrl);
    
    fetch(apiUrl)
        .then(response => {
            console.log('World Bank API response status:', response.status);
            if (!response.ok) {
                throw new Error(`Network response failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Remove loading indicator
            const loadingElement = chartContainer.querySelector('.loading-indicator');
            if (loadingElement) {
                loadingElement.remove();
            }
            
            if (data && data[1] && data[1].length > 0) {
                console.log('Successfully received World Bank data');
                processWorldBankData(data, indicatorName, countryName);
            } else {
                console.warn('No data available from World Bank API');
                throw new Error('No data available');
            }
        })
        .catch(error => {
            console.error('Error fetching World Bank data:', error);
            
            // Remove loading indicator
            const loadingElement = chartContainer.querySelector('.loading-indicator');
            if (loadingElement) {
                loadingElement.textContent = 'Error loading data. Using sample data.';
                setTimeout(() => loadingElement.remove(), 3000);
            }
            
            // Use sample data as fallback
            useWorldBankSampleData(countryCode, indicatorCode, indicatorName, countryName);
        });
}

function processWorldBankData(data, indicatorName, countryName) {
    const years = [];
    const values = [];
    
    // Process World Bank data (most recent first, so reverse for chronological)
    for (let i = data[1].length - 1; i >= 0; i--) {
        if (data[1][i].value !== null) {
            years.push(data[1][i].date);
            values.push(data[1][i].value);
        }
    }
    
    // Show real data indicator
    updateDataSourceIndicator(true, `Latest data from World Bank as of ${new Date().toLocaleDateString()}`);
    
    createEconomicChart(years, values, indicatorName, countryName);
}

function useWorldBankSampleData(countryCode, indicatorCode, indicatorName, countryName) {
    // Sample data for fallback
    const sampleData = {
        // GDP Growth data
        "NY.GDP.MKTP.KD.ZG": {
            "USA": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [2.3, 1.8, 2.3, 2.7, 1.7, 2.3, 3.0, 2.2, -3.4, 5.7]},
            "CHN": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [7.9, 7.8, 7.3, 6.9, 6.7, 6.8, 6.6, 6.1, 2.2, 8.1]},
            "JPN": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [1.4, 2.0, 0.4, 1.2, 0.5, 2.2, 0.3, 0.3, -4.3, 1.6]},
            "DEU": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [0.4, 0.4, 2.2, 1.5, 2.2, 2.7, 1.1, 1.1, -4.6, 2.6]},
            "GBR": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [1.5, 2.1, 2.6, 2.4, 1.9, 1.7, 1.3, 1.4, -9.3, 7.6]},
            "IND": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [5.5, 6.4, 7.4, 8.0, 8.3, 6.8, 6.5, 4.0, -6.6, 8.7]}
        },
        // Inflation data
        "FP.CPI.TOTL.ZG": {
            "USA": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [2.1, 1.5, 1.6, 0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7]}
        },
        // Additional indicators 
        "SL.UEM.TOTL.ZS": {
            "USA": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [8.1, 7.4, 6.2, 5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.4]}
        },
        "NE.TRD.GNFS.ZS": {
            "USA": {years: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
                   values: [30.2, 30.0, 29.9, 28.0, 27.0, 27.1, 27.5, 26.4, 23.5, 26.5]}
        }
    };
    
    let years = [];
    let values = [];
    
    // Get sample data if available
    if (sampleData[indicatorCode] && sampleData[indicatorCode][countryCode]) {
        years = sampleData[indicatorCode][countryCode].years;
        values = sampleData[indicatorCode][countryCode].values;
    } else {
        // Default sample data
        years = ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
        values = [3.2, 3.5, 3.2, 2.8, 2.5, 3.0, 3.2, 2.7, -3.2, 4.8];
    }
    
    // Show sample data indicator
    updateDataSourceIndicator(false, 'Using sample data - World Bank API unavailable');
    
    createEconomicChart(years, values, indicatorName, countryName);
}

function createEconomicChart(years, values, indicatorName, countryName) {
    const ctx = document.getElementById('economic-chart').getContext('2d');
    
    if (window.economicChart) {
        window.economicChart.destroy();
    }
    
    // Chart type and colors
    let chartType = 'bar';
    let chartColor = 'rgba(54, 162, 235, 0.5)';
    let borderColor = 'rgba(54, 162, 235, 1)';
    
    if (indicatorName.includes('GDP')) {
        chartColor = 'rgba(75, 192, 192, 0.5)';
        borderColor = 'rgba(75, 192, 192, 1)';
    } else if (indicatorName.includes('Inflation')) {
        chartColor = 'rgba(255, 159, 64, 0.5)';
        borderColor = 'rgba(255, 159, 64, 1)';
    } else if (indicatorName.includes('Unemployment')) {
        chartColor = 'rgba(153, 102, 255, 0.5)';
        borderColor = 'rgba(153, 102, 255, 1)';
    }
    
    window.economicChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: years,
            datasets: [{
                label: indicatorName,
                data: values,
                backgroundColor: chartColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `${indicatorName} - ${countryName}`,
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: indicatorName
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// ===== EXCHANGE RATES FUNCTIONALITY (UPDATED FOR EXCHANGE RATES API) =====

function initializeExchangeRates() {
    // Populate the base currency dropdown
    const baseSelect = document.getElementById('base-currency');
    
    // Clear existing options
    baseSelect.innerHTML = '';
    
    // Popular currencies to show at top
    const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
    
    // Add popular currencies group
    const popularGroup = document.createElement('optgroup');
    popularGroup.label = 'Popular Currencies';
    
    popularCurrencies.forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.text = `${code} - ${CurrencyData.currencies[code].name}`;
        popularGroup.appendChild(option);
    });
    
    baseSelect.appendChild(popularGroup);
    
    // Add all other currencies
    const otherGroup = document.createElement('optgroup');
    otherGroup.label = 'All Currencies';
    
    Object.keys(CurrencyData.currencies).sort().forEach(code => {
        if (!popularCurrencies.includes(code)) {
            const option = document.createElement('option');
            option.value = code;
            option.text = `${code} - ${CurrencyData.currencies[code].name}`;
            otherGroup.appendChild(option);
        }
    });
    
    baseSelect.appendChild(otherGroup);
    
    // Set USD as default
    baseSelect.value = 'USD';
    
    // Set up search functionality
    document.getElementById('currency-search').addEventListener('input', function() {
        filterCurrencyPairs(this.value);
    });
    
    // Initial load of exchange rates
    loadExchangeRates(true);
}

// Load exchange rates using Exchange Rates API
async function loadExchangeRates(isInitialLoad = false) {
    console.log('Loading exchange rates, initial load:', isInitialLoad);
    const baseCurrency = document.getElementById('base-currency').value;
    const pairsContainer = document.getElementById('forex-pairs-container');
    const pairsToShow = document.getElementById('pairs-to-show').value;
    
    if (!pairsContainer) {
        console.error('Forex pairs container not found!');
        return;
    }
    
    // Clear existing currency pairs
    pairsContainer.innerHTML = '';
    
    // Show loading message
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'loading-message';
    loadingMsg.textContent = 'Loading exchange rates...';
    pairsContainer.appendChild(loadingMsg);
    
    // Update indicator to show "connecting" status
    updateForexDataIndicator(false, 'Connecting to Exchange Rates API...');
    
    // Store the base currency in the API data for cross rate calculations
    CurrencyData.api.currentBase = baseCurrency;
    
    try {
        // Fetch live rates if this isn't the initial load or if we haven't loaded rates yet
        if (!isInitialLoad || CurrencyData.api.status === 'idle') {
            // Attempt to fetch live rates
            await CurrencyData.fetchLiveRates(baseCurrency);
        }
        
        // Remove loading message
        loadingMsg.remove();
        
        // Get all currency codes except the base currency
        const allCurrencies = Object.keys(CurrencyData.currencies)
            .filter(code => code !== baseCurrency);
        
        // Determine which currencies to display based on dropdown selection
        let displayCurrencies;
        
        if (pairsToShow === 'all') {
            displayCurrencies = allCurrencies;
        } else {
            // For limited selections, show that many currencies
            const numPairs = parseInt(pairsToShow);
            displayCurrencies = allCurrencies.slice(0, numPairs);
        }
        
        // Generate and display rates for each currency pair
        displayCurrencies.forEach(counterCurrency => {
            createForexCard(baseCurrency, counterCurrency, pairsContainer);
        });
        
        // Add region markers when displaying all currencies
        if (pairsToShow === 'all') {
            insertRegionMarkers(pairsContainer);
        }
        
        // Update data source indicator based on API status
        updateForexDataIndicator(
            CurrencyData.api.status === "success",
            CurrencyData.api.status === "success" 
                ? `Live data from Exchange Rates API as of ${CurrencyData.getLastUpdatedString()}`
                : 'Using sample exchange rate data - API unavailable'
        );
    } catch (error) {
        console.error('Error loading exchange rates:', error);
        loadingMsg.textContent = 'Error loading exchange rates. Using sample data.';
        
        // Fallback to sample data after a short delay
        setTimeout(() => {
            loadingMsg.remove();
            createSampleForexCards(baseCurrency, pairsContainer, pairsToShow);
            updateForexDataIndicator(false, 'Error connecting to API. Using sample data.');
        }, 1500);
    }
}

// Helper function to create sample forex cards as fallback
function createSampleForexCards(baseCurrency, container, pairsToShow) {
    // Get all currency codes except the base currency
    const allCurrencies = Object.keys(CurrencyData.currencies)
        .filter(code => code !== baseCurrency);
    
    // Determine which currencies to display
    let displayCurrencies;
    if (pairsToShow === 'all') {
        displayCurrencies = allCurrencies;
    } else {
        const numPairs = parseInt(pairsToShow) || 8;
        displayCurrencies = allCurrencies.slice(0, numPairs);
    }
    
    // Create cards with generated rates
    displayCurrencies.forEach(counterCurrency => {
        createForexCard(baseCurrency, counterCurrency, container);
    });
    
    // Add region markers for all currencies view
    if (pairsToShow === 'all') {
        insertRegionMarkers(container);
    }
}

// Create a forex card for a currency pair with Exchange Rates API data
function createForexCard(base, counter, container) {
    // Get exchange rate using the getRate method
    let rate = CurrencyData.getRate(base, counter);
    
    // Expected rate ranges for common currency pairs (approximate)
    const expectedRanges = {
        'USD/PHP': { min: 50, max: 60 },
        'USD/JPY': { min: 100, max: 160 },
        'USD/INR': { min: 70, max: 90 },
        'USD/MXN': { min: 15, max: 22 },
        'EUR/USD': { min: 0.9, max: 1.2 },
        'GBP/USD': { min: 1.1, max: 1.4 }
    };
    
    // Check if the rate seems incorrect
    const pairName = `${base}/${counter}`;
    if (expectedRanges[pairName] && 
        (rate < expectedRanges[pairName].min || rate > expectedRanges[pairName].max)) {
        console.warn(`⚠️ Suspicious rate for ${pairName}: ${rate} - Using fallback value`);
        
        // Apply fallback for known incorrect rates
        if (base === 'USD' && counter === 'PHP') {
            rate = 55.5; // Current approximate USD/PHP rate
        }
    }
    
    // Format the rate with appropriate decimal places
    const formattedRate = rate >= 100 ? 
        rate.toFixed(2) : (rate >= 10 ? 
            rate.toFixed(3) : rate.toFixed(4));
    
    // Generate random change percentage or use saved changes if available
    const changePercent = (Math.random() * 0.02 - 0.01);
    const change = (rate * changePercent).toFixed(5);
    const changeText = (changePercent >= 0 ? '+' : '') + (changePercent * 100).toFixed(2) + '%';
    
    // Create forex pair card
    const forexCard = document.createElement('div');
    forexCard.className = 'forex-pair';
    forexCard.dataset.base = base;
    forexCard.dataset.counter = counter;
    forexCard.dataset.region = CurrencyData.currencies[counter].region;
    
    // Add data source attribution
    const dataSource = CurrencyData.api.status === "success" ? 
        "Live data" : "Sample data";
    
    forexCard.innerHTML = `
        <h3>${CurrencyData.currencies[base].symbol}/${CurrencyData.currencies[counter].symbol}</h3>
        <div class="rate">${formattedRate}</div>
        <div class="change ${parseFloat(change) >= 0 ? 'positive' : 'negative'}">
            ${changeText}
        </div>
        <div class="currency-names">
            ${pairName}
        </div>
        <div class="currency-full-names">
            ${CurrencyData.currencies[base].name} / ${CurrencyData.currencies[counter].name}
        </div>
        <div class="rate-source" title="Data source" style="font-size: 9px; opacity: 0.7; text-align: right;">
            ${dataSource}
        </div>
    `;
    
    // Add to container
    container.appendChild(forexCard);
    
    // Add a special highlight for suspicious rates
    if (expectedRanges[pairName] && 
        (rate < expectedRanges[pairName].min || rate > expectedRanges[pairName].max)) {
        forexCard.style.border = "1px solid #f39c12";
        forexCard.title = "Rate may be using fallback value";
    }
}

// Add region headers when showing all currencies
function insertRegionMarkers(container) {
    // Get all forex cards
    const cards = Array.from(container.querySelectorAll('.forex-pair'));
    
    // Exit if no cards
    if (!cards.length) return;
    
    // Group cards by region
    const regions = {};
    cards.forEach(card => {
        const region = card.dataset.region;
        if (!regions[region]) regions[region] = [];
        regions[region].push(card);
    });
    
    // Clear container
    container.innerHTML = '';
    
    // Add each region with header
    const regionOrder = ['Americas', 'Europe', 'Asia', 'Oceania', 'Africa', 'Middle East', 'Global'];
    
    regionOrder.forEach(region => {
        if (regions[region] && regions[region].length > 0) {
            // Add region header
            const header = document.createElement('div');
            header.className = 'region-header';
            header.textContent = region;
            container.appendChild(header);
            
            // Add all cards for this region
            regions[region].forEach(card => {
                container.appendChild(card);
            });
        }
    });
}

// Filter currency pairs based on search input
function filterCurrencyPairs(searchText) {
    const pairs = document.querySelectorAll('.forex-pair');
    const regexPattern = new RegExp(searchText, 'i'); // case insensitive
    
    // Hide all region headers initially
    document.querySelectorAll('.region-header').forEach(header => {
        header.style.display = 'none';
    });
    
    // Set of visible regions
    const visibleRegions = new Set();
    
    pairs.forEach(pair => {
        const base = pair.dataset.base;
        const counter = pair.dataset.counter;
        const baseName = CurrencyData.currencies[base].name;
        const counterName = CurrencyData.currencies[counter].name;
        const searchString = `${base}/${counter} ${baseName} ${counterName}`;
        
        if (regexPattern.test(searchString)) {
            pair.style.display = '';
            visibleRegions.add(pair.dataset.region);
        } else {
            pair.style.display = 'none';
        }
    });
    
    // Show relevant region headers
    document.querySelectorAll('.region-header').forEach(header => {
        if (visibleRegions.has(header.textContent)) {
            header.style.display = '';
        }
    });
    
    // Show "no results" message if needed
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (document.querySelectorAll('.forex-pair:not([style*="display: none"])').length === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No matching currencies found.';
            document.getElementById('forex-pairs-container').appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Update the source indicator for forex data
function updateForexDataIndicator(isRealData, message = null) {
    const container = document.querySelector('.exchange-rates');
    if (!container) return;
    
    // Remove any existing indicator
    const existingIndicator = container.querySelector('.forex-data-indicator');
    if (existingIndicator) existingIndicator.remove();
    
    // Add indicator
    const indicator = document.createElement('div');
    indicator.className = 'forex-data-indicator';
    
    if (isRealData) {
        indicator.innerHTML = '<span class="indicator-dot real"></span> Live Exchange Rate Data';
        indicator.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        indicator.style.color = '#27ae60';
    } else {
        indicator.innerHTML = '<span class="indicator-dot mock"></span> Sample Exchange Rate Data';
        indicator.style.backgroundColor = 'rgba(243, 156, 18, 0.2)';
        indicator.style.color = '#d35400';
    }
    
    indicator.title = message || (isRealData ? 
        'Using real-time exchange rates from Exchange Rates API' : 
        'Using generated exchange rates based on approximated market values');
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.fontSize = '12px';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '4px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '10';
    
    // Add indicator
    container.style.position = 'relative';
    container.appendChild(indicator);
}

// Theme switcher functionality
function setupThemeSwitcher() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // Function to switch theme
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Add event listener for theme switch
    toggleSwitch.addEventListener('change', switchTheme);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
}

// ===== MARKET SCREENER FUNCTIONALITY =====

// Stock Screener functionality with real Finnhub API data
function initMarketScreener() {
    console.log('Initializing market screener...');
    const runScreenerBtn = document.getElementById('run-screener-btn');
    const screenerSection = document.querySelector('.market-screener');
    
    if (!screenerSection) {
        console.error('Market screener section not found!');
        return;
    }
    
    // Ensure the screener section is visible
    screenerSection.style.display = 'block';
    
    if (runScreenerBtn) {
        console.log('Run screener button found, attaching event listener');
        runScreenerBtn.addEventListener('click', runScreener);
        
        // Load default view on page load with a slight delay to ensure DOM is ready
        setTimeout(() => {
            console.log('Running initial market screener');
            runScreener();
        }, 1000);
    } else {
        console.error('Run screener button not found!');
    }
}

// Format market cap for display
function formatMarketCap(marketCap) {
    if (marketCap >= 1000000000000) {
        return `$${(marketCap / 1000000000000).toFixed(1)}T`;
    } else if (marketCap >= 1000000000) {
        return `$${(marketCap / 1000000000).toFixed(1)}B`;
    } else if (marketCap >= 1000000) {
        return `$${(marketCap / 1000000).toFixed(0)}M`;
    } else {
        return `$${marketCap.toLocaleString()}`;
    }
}

// Run the screener with Finnhub API
async function runScreener() {
    const sectorFilter = document.getElementById('sector-filter').value;
    const marketCapFilter = document.getElementById('marketcap-filter').value;
    const performanceFilter = document.getElementById('performance-filter').value;
    
    // Show loading state
    showScreenerLoading(true);
    
    try {
        // Base list of symbols to screen (expandable)
        const stockGroups = {
            'tech': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'TSM', 'AVGO', 'ORCL', 'CSCO', 'AMD', 'ADBE', 'INTC', 'CRM', 'NFLX', 'PYPL', 'QCOM', 'ASML', 'IBM', 'TXN', 'SONY', 'SHOP', 'SQ', 'PLTR', 'SNAP', 'RIOT', 'MARA'],
            'healthcare': ['JNJ', 'UNH', 'PFE', 'MRK', 'ABBV', 'ABT', 'TMO', 'DHR', 'LLY', 'BMY', 'AMGN', 'ISRG', 'CVS', 'GILD', 'MRNA', 'CRSP', 'BIIB'],
            'financials': ['JPM', 'V', 'MA', 'BAC', 'WFC', 'GS', 'C', 'BLK', 'MS', 'HSBC', 'AXP', 'SCHW', 'RY', 'TD', 'CB'],
            'consumer': ['WMT', 'PG', 'KO', 'PEP', 'MCD', 'NKE', 'SBUX', 'TGT', 'HD', 'LOW', 'COST', 'DIS', 'ABNB', 'BKNG', 'YUM', 'AMZN', 'EBAY'],
            'industrial': ['HON', 'UPS', 'CAT', 'BA', 'GE', 'LMT', 'MMM', 'DE', 'RTX', 'UNP', 'FDX'],
            'energy': ['XOM', 'CVX', 'COP', 'BP', 'SHEL', 'SLB', 'EOG', 'OXY', 'VLO', 'PSX'],
            'utilities': ['NEE', 'DUK', 'SO', 'D', 'AEP', 'EXC', 'PCG', 'SRE', 'XEL', 'WEC'],
            'materials': ['LIN', 'APD', 'ECL', 'SHW', 'NEM', 'FCX', 'DOW', 'NUE', 'SCCO', 'CF'],
            'realestate': ['SPG', 'AMT', 'PLD', 'WELL', 'O', 'CCI', 'EQIX', 'PSA', 'DLR', 'AVB'],
            'philippine': [
                // Major Philippine stocks with Finnhub symbols
                'SM.PS',    // SM Investments Corporation
                'ALI.PS',   // Ayala Land
                'BDO.PS',   // BDO Unibank
                'AC.PS',    // Ayala Corporation
                'JFC.PS',   // Jollibee Foods Corporation
                'SMPH.PS',  // SM Prime Holdings
                'BPI.PS',   // Bank of the Philippine Islands
                'TEL.PS',   // PLDT Inc.
                'GLO.PS',   // Globe Telecom
                'URC.PS',   // Universal Robina Corporation
                'MBT.PS',   // Metropolitan Bank & Trust
                'AEV.PS',   // Aboitiz Equity Ventures
                'AP.PS',    // Aboitiz Power
                'SECB.PS',  // Security Bank
                'MER.PS',   // Manila Electric Company (Meralco)
                'JGS.PS',   // JG Summit Holdings
                'MEG.PS',   // Megaworld Corporation
                'PGOLD.PS', // Puregold Price Club
                'LTG.PS',   // LT Group
                'MPI.PS'    // Metro Pacific Investments
            ]
        };
        
        // Determine which symbols to fetch based on sector filter
        let symbolsToFetch = [];
        if (sectorFilter && stockGroups[sectorFilter]) {
            symbolsToFetch = stockGroups[sectorFilter];
        } else {
            // If no sector filter, get a sample from each sector
            Object.values(stockGroups).forEach(sectorStocks => {
                // Take first few stocks from each sector
                symbolsToFetch = symbolsToFetch.concat(sectorStocks.slice(0, 3));
            });
        }
        
        // Limit to 30 symbols for performance
        symbolsToFetch = symbolsToFetch.slice(0, 30);
        
        // Create an array of promises for each symbol to fetch data
        const stockPromises = symbolsToFetch.map(async (symbol) => {
            try {
                // Fetch basic quote data
                const quoteResponse = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
                if (!quoteResponse.ok) {
                    throw new Error(`Failed to fetch quote for ${symbol}`);
                }
                const quoteData = await quoteResponse.json();
                
                // Fetch company profile for sector and market cap
                const profileResponse = await fetch(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
                if (!profileResponse.ok) {
                    throw new Error(`Failed to fetch profile for ${symbol}`);
                }
                const profileData = await profileResponse.json();
                
                // Calculate market cap if available
                const marketCap = profileData.marketCapitalization ? 
                    profileData.marketCapitalization * 1000000 : // Convert from millions to actual value
                    null;
                    
                // Construct stock object with combined data
                return {
                    symbol: symbol,
                    name: profileData.name || symbol,
                    price: quoteData.c,
                    change: quoteData.dp, // Percentage change
                    marketCap: marketCap,
                    pe: null, // P/E not directly available in basic API
                    sector: profileData.finnhubIndustry || 'Unknown'
                };
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                return null; // Return null for failed requests
            }
        });
        
        // Wait for all API calls to complete
        const results = await Promise.allSettled(stockPromises);
        const stocks = results
            .filter(result => result.status === 'fulfilled' && result.value)
            .map(result => result.value);
        
        // Apply additional filters
        let filteredStocks = stocks;
        
        // Market cap filtering
        if (marketCapFilter) {
            filteredStocks = filteredStocks.filter(stock => {
                if (!stock.marketCap) return false;
                
                switch (marketCapFilter) {
                    case 'mega':
                        return stock.marketCap >= 200000000000; // > $200B
                    case 'large':
                        return stock.marketCap >= 10000000000 && stock.marketCap < 200000000000; // $10B - $200B
                    case 'mid':
                        return stock.marketCap >= 2000000000 && stock.marketCap < 10000000000; // $2B - $10B
                    case 'small':
                        return stock.marketCap >= 300000000 && stock.marketCap < 2000000000; // $300M - $2B
                    case 'micro':
                        return stock.marketCap < 300000000; // < $300M
                    default:
                        return true;
                }
            });
        }
        
        // Performance filtering
        if (performanceFilter) {
            filteredStocks = filteredStocks.filter(stock => {
                switch (performanceFilter) {
                    case 'day_up':
                        return stock.change > 0;
                    case 'day_down':
                        return stock.change < 0;
                    case 'week_up5':
                        return stock.change > 5;
                    case 'month_up20':
                        return stock.change > 10;
                    case 'month_down20':
                        return stock.change < -5;
                    default:
                        return true;
                }
            });
        }
        
        // Display the filtered results
        displayScreenerResults(filteredStocks);
        
        // Update indicator to show real data
        updateScreenerDataIndicator(true, `Live stock data from Finnhub as of ${new Date().toLocaleString()}`);
        
    } catch (error) {
        console.error('Error running stock screener:', error);
        
        // Show error state
        updateScreenerDataIndicator(false, `API Error: ${error.message}. Using sample data.`);
        
        // Fallback to minimal placeholder data
        const placeholderStocks = [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 177.56, change: 1.25, marketCap: 2750000000000, sector: 'Technology' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 399.04, change: 0.89, marketCap: 2970000000000, sector: 'Technology' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.12, change: 1.78, marketCap: 2080000000000, sector: 'Technology' }
        ];
        
        displayScreenerResults(placeholderStocks);
    } finally {
        // Hide loading state
        showScreenerLoading(false);
    }
}

// Display screener results in the table
function displayScreenerResults(stocks) {
    const tableBody = document.querySelector('#screener-table tbody');
    tableBody.innerHTML = '';
    
    if (stocks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" style="text-align: center;">No matching stocks found</td>';
        tableBody.appendChild(row);
        return;
    }
    
    // Sort by market cap descending by default
    stocks.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
    
    stocks.forEach(stock => {
        const row = document.createElement('tr');
        
        // Format values
        const formattedMarketCap = stock.marketCap ? formatMarketCap(stock.marketCap) : 'N/A';
        const formattedPE = stock.pe ? stock.pe.toFixed(1) : 'N/A';
        
        // Create cells
        row.innerHTML = `
            <td><strong>${stock.symbol}</strong></td>
            <td>${stock.name}</td>
            <td>$${stock.price ? stock.price.toFixed(2) : 'N/A'}</td>
            <td class="${stock.change >= 0 ? 'positive' : 'negative'}">${stock.change >= 0 ? '+' : ''}${stock.change ? stock.change.toFixed(2) : '0.00'}%</td>
            <td>${formattedMarketCap}</td>
            <td>${formattedPE}</td>
            <td>${stock.sector}</td>
        `;
        
        // Add click handler to show more details
        row.addEventListener('click', () => {
            // Could open detailed view or load the stock in TradingView
            if (document.getElementById('stock-select')) {
                const stockSelect = document.getElementById('stock-select');
                // Find the option or default to direct symbol
                const options = Array.from(stockSelect.options);
                const stockOption = options.find(opt => opt.value === stock.symbol);
                
                if (stockOption) {
                    stockSelect.value = stock.symbol;
                    // Trigger change event
                    stockSelect.dispatchEvent(new Event('change'));
                    
                    // Scroll to the chart section
                    document.querySelector('.stock-trends').scrollIntoView({ 
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Add hover style
        row.style.cursor = 'pointer';
        
        tableBody.appendChild(row);
    });
}

// Show loading state for screener
function showScreenerLoading(isLoading) {
    const tableBody = document.querySelector('#screener-table tbody');
    const runButton = document.getElementById('run-screener-btn');
    
    if (isLoading) {
        // Disable button and show loading state
        if (runButton) {
            runButton.disabled = true;
            runButton.textContent = 'Loading...';
        }
        
        // Show loading message in table
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                    <div class="loading-spinner"></div>
                    <div style="margin-top: 10px;">Fetching stock data from Finnhub API...</div>
                </td>
            </tr>
        `;
    } else {
        // Re-enable button
        if (runButton) {
            runButton.disabled = false;
            runButton.textContent = 'Run Screener';
        }
    }
}

// Update data source indicator for screener
function updateScreenerDataIndicator(isRealData, message = null) {
    const container = document.querySelector('.market-screener');
    if (!container) return;
    
    // Remove any existing indicator
    const existingIndicator = container.querySelector('.screener-data-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create indicator element
    const indicator = document.createElement('div');
    indicator.className = 'screener-data-indicator';
    
    if (isRealData) {
        indicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#27ae60;margin-right:5px;"></span> Live Stock Data';
        indicator.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
        indicator.style.color = '#27ae60';
    } else {
        indicator.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#e67e22;margin-right:5px;"></span> Sample Stock Data';
        indicator.style.backgroundColor = 'rgba(243, 156, 18, 0.2)';
        indicator.style.color = '#d35400';
    }
    
    indicator.title = message || '';
    
    // Style the indicator
    indicator.style.position = 'absolute';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.fontSize = '12px';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '4px';
    indicator.style.fontWeight = 'bold';
    
    // Make sure container has positioning
    container.style.position = 'relative';
    
    // Add to container
    container.appendChild(indicator);
}

// Load news for selected stock
function loadStockNews(symbol) {
    const newsContainer = document.getElementById('stock-news-container');
    if (!newsContainer) return;
    
    // Show loading
    newsContainer.innerHTML = '<div class="news-loading">Loading latest news...</div>';
    
    // Fetch news from Finnhub
    fetch(`${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${getDateString(30)}&to=${getDateString(0)}&token=${FINNHUB_API_KEY}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response failed');
            return response.json();
        })
        .then(news => {
            // Filter out items without images or summaries
            const filteredNews = news
                .filter(item => item.headline && (item.image || item.summary))
                .slice(0, 6);  // Limit to 6 news items
            
            if (filteredNews.length > 0) {
                // Clear container
                newsContainer.innerHTML = '';
                
                // Add news items
                filteredNews.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    
                    const newsDate = new Date(item.datetime * 1000);
                    const formattedDate = newsDate.toLocaleDateString();
                    
                    newsItem.innerHTML = `
                        <div class="news-image" style="background-image: url('${item.image || ''}'); background-size: cover; background-position: center;"></div>
                        <div class="news-content">
                            <div class="news-title">${item.headline}</div>
                            <div class="news-summary">${item.summary || 'No summary available'}</div>
                            <div class="news-meta">
                                <span>${formattedDate}</span>
                                <span>${item.source}</span>
                            </div>
                        </div>
                    `;
                    
                    // Add click handler to open news article
                    newsItem.addEventListener('click', function() {
                        if (item.url) {
                            window.open(item.url, '_blank');
                        }
                    });
                    
                    newsContainer.appendChild(newsItem);
                });
            } else {
                newsContainer.innerHTML = '<div class="news-loading">No recent news found for this stock.</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<div class="news-loading">Unable to load news. Please try again later.</div>';
        });
}

// Helper function to get date string for news API
function getDateString(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

// Function to update index display based on selection - FIXED
function updateIndexDisplay(selectedValue) {
    console.log('Updating index display to:', selectedValue);
    const allIndexCards = document.querySelectorAll('.market-indices .index-card');
    
    // First, hide all index cards
    allIndexCards.forEach(card => {
        card.style.display = 'none';
    });
    
    if (selectedValue === 'all') {
        // Show all index cards
        allIndexCards.forEach(card => {
            card.style.display = '';
        });
        
        // Load data for major indices to avoid API overload
        const majorIndices = ['sp500', 'nasdaq', 'dowjones', 'russell2000', 'vix'];
        loadMarketData(majorIndices);
    } else {
        // Show only the selected index card
        const selectedCard = document.getElementById(selectedValue);
        if (selectedCard) {
            selectedCard.style.display = '';
        }
        
        // Load data for the selected index
        loadMarketData([selectedValue]);
    }
}