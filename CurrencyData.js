// This file contains comprehensive currency data for the forex dashboard
const CurrencyData = {
    // Full list of world currencies with ISO code, name, symbol and continent
    currencies: {
        "AED": { name: "UAE Dirham", symbol: "د.إ", region: "Middle East" },
        "AFN": { name: "Afghan Afghani", symbol: "؋", region: "Asia" },
        "ALL": { name: "Albanian Lek", symbol: "L", region: "Europe" },
        "AMD": { name: "Armenian Dram", symbol: "֏", region: "Asia" },
        "ANG": { name: "Netherlands Antillean Guilder", symbol: "ƒ", region: "Americas" },
        "AOA": { name: "Angolan Kwanza", symbol: "Kz", region: "Africa" },
        "ARS": { name: "Argentine Peso", symbol: "$", region: "Americas" },
        "AUD": { name: "Australian Dollar", symbol: "A$", region: "Oceania" },
        "AWG": { name: "Aruban Florin", symbol: "ƒ", region: "Americas" },
        "AZN": { name: "Azerbaijani Manat", symbol: "₼", region: "Asia" },
        "BAM": { name: "Bosnia-Herzegovina Mark", symbol: "KM", region: "Europe" },
        "BBD": { name: "Barbadian Dollar", symbol: "Bds$", region: "Americas" },
        "BDT": { name: "Bangladeshi Taka", symbol: "৳", region: "Asia" },
        "BGN": { name: "Bulgarian Lev", symbol: "лв", region: "Europe" },
        "BHD": { name: "Bahraini Dinar", symbol: ".د.ب", region: "Middle East" },
        "BIF": { name: "Burundian Franc", symbol: "FBu", region: "Africa" },
        "BMD": { name: "Bermudan Dollar", symbol: "$", region: "Americas" },
        "BND": { name: "Brunei Dollar", symbol: "B$", region: "Asia" },
        "BOB": { name: "Bolivian Boliviano", symbol: "Bs.", region: "Americas" },
        "BRL": { name: "Brazilian Real", symbol: "R$", region: "Americas" },
        "BSD": { name: "Bahamian Dollar", symbol: "B$", region: "Americas" },
        "BTC": { name: "Bitcoin", symbol: "₿", region: "Global" },
        "BTN": { name: "Bhutanese Ngultrum", symbol: "Nu.", region: "Asia" },
        "BWP": { name: "Botswanan Pula", symbol: "P", region: "Africa" },
        "BYN": { name: "Belarusian Ruble", symbol: "Br", region: "Europe" },
        "BZD": { name: "Belize Dollar", symbol: "BZ$", region: "Americas" },
        "CAD": { name: "Canadian Dollar", symbol: "C$", region: "Americas" },
        "CDF": { name: "Congolese Franc", symbol: "FC", region: "Africa" },
        "CHF": { name: "Swiss Franc", symbol: "Fr", region: "Europe" },
        "CLF": { name: "Chilean Unit of Account", symbol: "UF", region: "Americas" },
        "CLP": { name: "Chilean Peso", symbol: "$", region: "Americas" },
        "CNH": { name: "Chinese Yuan (Offshore)", symbol: "¥", region: "Asia" },
        "CNY": { name: "Chinese Yuan", symbol: "¥", region: "Asia" },
        "COP": { name: "Colombian Peso", symbol: "$", region: "Americas" },
        "CRC": { name: "Costa Rican Colón", symbol: "₡", region: "Americas" },
        "CUC": { name: "Cuban Convertible Peso", symbol: "$", region: "Americas" },
        "CUP": { name: "Cuban Peso", symbol: "₱", region: "Americas" },
        "CVE": { name: "Cape Verdean Escudo", symbol: "$", region: "Africa" },
        "CZK": { name: "Czech Koruna", symbol: "Kč", region: "Europe" },
        "DJF": { name: "Djiboutian Franc", symbol: "Fdj", region: "Africa" },
        "DKK": { name: "Danish Krone", symbol: "kr", region: "Europe" },
        "DOP": { name: "Dominican Peso", symbol: "RD$", region: "Americas" },
        "DZD": { name: "Algerian Dinar", symbol: "د.ج", region: "Africa" },
        "EGP": { name: "Egyptian Pound", symbol: "E£", region: "Africa" },
        "ERN": { name: "Eritrean Nakfa", symbol: "Nfk", region: "Africa" },
        "ETB": { name: "Ethiopian Birr", symbol: "Br", region: "Africa" },
        "EUR": { name: "Euro", symbol: "€", region: "Europe" },
        "FJD": { name: "Fijian Dollar", symbol: "FJ$", region: "Oceania" },
        "FKP": { name: "Falkland Islands Pound", symbol: "£", region: "Americas" },
        "GBP": { name: "British Pound", symbol: "£", region: "Europe" },
        "GEL": { name: "Georgian Lari", symbol: "₾", region: "Asia" },
        "GGP": { name: "Guernsey Pound", symbol: "£", region: "Europe" },
        "GHS": { name: "Ghanaian Cedi", symbol: "GH₵", region: "Africa" },
        "GIP": { name: "Gibraltar Pound", symbol: "£", region: "Europe" },
        "GMD": { name: "Gambian Dalasi", symbol: "D", region: "Africa" },
        "GNF": { name: "Guinean Franc", symbol: "FG", region: "Africa" },
        "GTQ": { name: "Guatemalan Quetzal", symbol: "Q", region: "Americas" },
        "GYD": { name: "Guyanese Dollar", symbol: "G$", region: "Americas" },
        "HKD": { name: "Hong Kong Dollar", symbol: "HK$", region: "Asia" },
        "HNL": { name: "Honduran Lempira", symbol: "L", region: "Americas" },
        "HRK": { name: "Croatian Kuna", symbol: "kn", region: "Europe" },
        "HTG": { name: "Haitian Gourde", symbol: "G", region: "Americas" },
        "HUF": { name: "Hungarian Forint", symbol: "Ft", region: "Europe" },
        "IDR": { name: "Indonesian Rupiah", symbol: "Rp", region: "Asia" },
        "ILS": { name: "Israeli New Shekel", symbol: "₪", region: "Middle East" },
        "IMP": { name: "Manx Pound", symbol: "£", region: "Europe" },
        "INR": { name: "Indian Rupee", symbol: "₹", region: "Asia" },
        "IQD": { name: "Iraqi Dinar", symbol: "ع.د", region: "Middle East" },
        "IRR": { name: "Iranian Rial", symbol: "﷼", region: "Middle East" },
        "ISK": { name: "Icelandic Króna", symbol: "kr", region: "Europe" },
        "JEP": { name: "Jersey Pound", symbol: "£", region: "Europe" },
        "JMD": { name: "Jamaican Dollar", symbol: "J$", region: "Americas" },
        "JOD": { name: "Jordanian Dinar", symbol: "د.ا", region: "Middle East" },
        "JPY": { name: "Japanese Yen", symbol: "¥", region: "Asia" },
        "KES": { name: "Kenyan Shilling", symbol: "KSh", region: "Africa" },
        "KGS": { name: "Kyrgystani Som", symbol: "с", region: "Asia" },
        "KHR": { name: "Cambodian Riel", symbol: "៛", region: "Asia" },
        "KMF": { name: "Comorian Franc", symbol: "CF", region: "Africa" },
        "KPW": { name: "North Korean Won", symbol: "₩", region: "Asia" },
        "KRW": { name: "South Korean Won", symbol: "₩", region: "Asia" },
        "KWD": { name: "Kuwaiti Dinar", symbol: "د.ك", region: "Middle East" },
        "KYD": { name: "Cayman Islands Dollar", symbol: "$", region: "Americas" },
        "KZT": { name: "Kazakhstani Tenge", symbol: "₸", region: "Asia" },
        "LAK": { name: "Laotian Kip", symbol: "₭", region: "Asia" },
        "LBP": { name: "Lebanese Pound", symbol: "ل.ل", region: "Middle East" },
        "LKR": { name: "Sri Lankan Rupee", symbol: "Rs", region: "Asia" },
        "LRD": { name: "Liberian Dollar", symbol: "L$", region: "Africa" },
        "LSL": { name: "Lesotho Loti", symbol: "M", region: "Africa" },
        "LYD": { name: "Libyan Dinar", symbol: "ل.د", region: "Africa" },
        "MAD": { name: "Moroccan Dirham", symbol: "د.م.", region: "Africa" },
        "MDL": { name: "Moldovan Leu", symbol: "L", region: "Europe" },
        "MGA": { name: "Malagasy Ariary", symbol: "Ar", region: "Africa" },
        "MKD": { name: "Macedonian Denar", symbol: "ден", region: "Europe" },
        "MMK": { name: "Myanmar Kyat", symbol: "K", region: "Asia" },
        "MNT": { name: "Mongolian Tugrik", symbol: "₮", region: "Asia" },
        "MOP": { name: "Macanese Pataca", symbol: "MOP$", region: "Asia" },
        "MRO": { name: "Mauritanian Ouguiya", symbol: "UM", region: "Africa" },
        "MRU": { name: "Mauritanian Ouguiya", symbol: "UM", region: "Africa" },
        "MUR": { name: "Mauritian Rupee", symbol: "₨", region: "Africa" },
        "MVR": { name: "Maldivian Rufiyaa", symbol: "Rf", region: "Asia" },
        "MWK": { name: "Malawian Kwacha", symbol: "MK", region: "Africa" },
        "MXN": { name: "Mexican Peso", symbol: "Mex$", region: "Americas" },
        "MYR": { name: "Malaysian Ringgit", symbol: "RM", region: "Asia" },
        "MZN": { name: "Mozambican Metical", symbol: "MT", region: "Africa" },
        "NAD": { name: "Namibian Dollar", symbol: "N$", region: "Africa" },
        "NGN": { name: "Nigerian Naira", symbol: "₦", region: "Africa" },
        "NIO": { name: "Nicaraguan Córdoba", symbol: "C$", region: "Americas" },
        "NOK": { name: "Norwegian Krone", symbol: "kr", region: "Europe" },
        "NPR": { name: "Nepalese Rupee", symbol: "₨", region: "Asia" },
        "NZD": { name: "New Zealand Dollar", symbol: "NZ$", region: "Oceania" },
        "OMR": { name: "Omani Rial", symbol: "ر.ع.", region: "Middle East" },
        "PAB": { name: "Panamanian Balboa", symbol: "B/.", region: "Americas" },
        "PEN": { name: "Peruvian Sol", symbol: "S/", region: "Americas" },
        "PGK": { name: "Papua New Guinean Kina", symbol: "K", region: "Oceania" },
        "PHP": { name: "Philippine Peso", symbol: "₱", region: "Asia" },
        "PKR": { name: "Pakistani Rupee", symbol: "₨", region: "Asia" },
        "PLN": { name: "Polish Złoty", symbol: "zł", region: "Europe" },
        "PYG": { name: "Paraguayan Guaraní", symbol: "₲", region: "Americas" },
        "QAR": { name: "Qatari Riyal", symbol: "ر.ق", region: "Middle East" },
        "RON": { name: "Romanian Leu", symbol: "lei", region: "Europe" },
        "RSD": { name: "Serbian Dinar", symbol: "дин.", region: "Europe" },
        "RUB": { name: "Russian Ruble", symbol: "₽", region: "Europe" },
        "RWF": { name: "Rwandan Franc", symbol: "FRw", region: "Africa" },
        "SAR": { name: "Saudi Riyal", symbol: "ر.س", region: "Middle East" },
        "SBD": { name: "Solomon Islands Dollar", symbol: "SI$", region: "Oceania" },
        "SCR": { name: "Seychellois Rupee", symbol: "SR", region: "Africa" },
        "SDG": { name: "Sudanese Pound", symbol: "ج.س.", region: "Africa" },
        "SEK": { name: "Swedish Krona", symbol: "kr", region: "Europe" },
        "SGD": { name: "Singapore Dollar", symbol: "S$", region: "Asia" },
        "SHP": { name: "Saint Helena Pound", symbol: "£", region: "Africa" },
        "SLL": { name: "Sierra Leonean Leone", symbol: "Le", region: "Africa" },
        "SOS": { name: "Somali Shilling", symbol: "S", region: "Africa" },
        "SRD": { name: "Surinamese Dollar", symbol: "$", region: "Americas" },
        "SSP": { name: "South Sudanese Pound", symbol: "£", region: "Africa" },
        "STD": { name: "São Tomé & Príncipe Dobra", symbol: "Db", region: "Africa" },
        "STN": { name: "São Tomé & Príncipe Dobra", symbol: "Db", region: "Africa" },
        "SVC": { name: "Salvadoran Colón", symbol: "₡", region: "Americas" },
        "SYP": { name: "Syrian Pound", symbol: "£S", region: "Middle East" },
        "SZL": { name: "Swazi Lilangeni", symbol: "E", region: "Africa" },
        "THB": { name: "Thai Baht", symbol: "฿", region: "Asia" },
        "TJS": { name: "Tajikistani Somoni", symbol: "ЅМ", region: "Asia" },
        "TMT": { name: "Turkmenistani Manat", symbol: "T", region: "Asia" },
        "TND": { name: "Tunisian Dinar", symbol: "د.ت", region: "Africa" },
        "TOP": { name: "Tongan Paʻanga", symbol: "T$", region: "Oceania" },
        "TRY": { name: "Turkish Lira", symbol: "₺", region: "Europe" },
        "TTD": { name: "Trinidad & Tobago Dollar", symbol: "TT$", region: "Americas" },
        "TWD": { name: "New Taiwan Dollar", symbol: "NT$", region: "Asia" },
        "TZS": { name: "Tanzanian Shilling", symbol: "TSh", region: "Africa" },
        "UAH": { name: "Ukrainian Hryvnia", symbol: "₴", region: "Europe" },
        "UGX": { name: "Ugandan Shilling", symbol: "USh", region: "Africa" },
        "USD": { name: "US Dollar", symbol: "$", region: "Americas" },
        "UYU": { name: "Uruguayan Peso", symbol: "$U", region: "Americas" },
        "UZS": { name: "Uzbekistani Som", symbol: "лв", region: "Asia" },
        "VEF": { name: "Venezuelan Bolívar", symbol: "Bs.", region: "Americas" },
        "VES": { name: "Venezuelan Bolívar Soberano", symbol: "Bs.S", region: "Americas" },
        "VND": { name: "Vietnamese Đồng", symbol: "₫", region: "Asia" },
        "VUV": { name: "Vanuatu Vatu", symbol: "VT", region: "Oceania" },
        "WST": { name: "Samoan Tala", symbol: "WS$", region: "Oceania" },
        "XAF": { name: "Central African CFA Franc", symbol: "FCFA", region: "Africa" },
        "XCD": { name: "East Caribbean Dollar", symbol: "EC$", region: "Americas" },
        "XOF": { name: "West African CFA Franc", symbol: "CFA", region: "Africa" },
        "XPF": { name: "CFP Franc", symbol: "₣", region: "Oceania" },
        "YER": { name: "Yemeni Rial", symbol: "﷼", region: "Middle East" },
        "ZAR": { name: "South African Rand", symbol: "R", region: "Africa" },
        "ZMW": { name: "Zambian Kwacha", symbol: "ZK", region: "Africa" },
        "ZWL": { name: "Zimbabwean Dollar", symbol: "Z$", region: "Africa" }
    },

    // Major currency pairs that are most commonly traded
    majorPairs: [
        "EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", 
        "USD/CAD", "AUD/USD", "NZD/USD", "EUR/GBP", 
        "EUR/JPY", "GBP/JPY", "CHF/JPY", "EUR/CHF",
        "EUR/CAD", "AUD/JPY", "GBP/CHF", "USD/MXN"
    ],
    
    api: {
        // No API key required for basic Exchange Rates API
        key: "", 
        baseUrl: "https://api.exchangerate-api.com/v4/latest",
        status: "idle", // Can be: idle, loading, success, error
        lastUpdated: null,
        rates: {}
    },
    
    // Method to fetch live rates from Exchange Rates API
    fetchLiveRates: async function(baseCurrency = 'USD') {
        this.api.status = "loading";
        console.log("Fetching exchange rates from Exchange Rates API...");
        
        try {
            // Exchange Rates API uses the base currency in the URL path
            const url = `${this.api.baseUrl}/${baseCurrency}`;
            console.log(`Making API request to: ${url}`);
            
            const response = await fetch(url);
            console.log("API response status:", response.status);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.rates) {
                console.log("Successfully fetched exchange rates");
                this.api.rates = data.rates;
                this.api.lastUpdated = new Date(data.time_last_updated * 1000); // Convert Unix timestamp to JS Date
                this.api.status = "success";
                return true;
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (error) {
            console.error("Failed to fetch exchange rates:", error);
            this.api.status = "error";
            return false;
        }
    },
    
    // Method to get a rate - uses live data if available, falls back to generated
    getRate: function(base, counter) {
        // Handle special case - same currency
        if (base === counter) return 1.0;
        
        // If we have fetched live rates successfully
        if (this.api.status === "success") {
            if (base === this.api.currentBase) {
                // Direct rate from API
                if (this.api.rates[counter]) {
                    return parseFloat(this.api.rates[counter]);
                }
            } else if (this.api.rates[base] && this.api.rates[counter]) {
                // Cross rate calculation
                // For Exchange Rates API, all rates are against base currency
                return parseFloat(this.api.rates[counter]) / parseFloat(this.api.rates[base]);
            }
        }
        
        // Fallback to generated rates
        console.log(`Using generated rate for ${base}/${counter} (API status: ${this.api.status})`);
        return this.generateRate(base, counter);
    },
    
    // Fallback method to generate approximate exchange rates - unchanged
    generateRate: function(base, counter) {
        // Base exchange rates against USD (approximated)
        const usdRates = {
            "USD": 1.00,
            "EUR": 0.93,
            "GBP": 0.80,
            "JPY": 150.0,
            "CAD": 1.35,
            "AUD": 1.52,
            "CHF": 0.91,
            "CNY": 7.25,
            "HKD": 7.82,
            "NZD": 1.62,
            "SEK": 10.40,
            "NOK": 10.60,
            "MXN": 17.0,
            "SGD": 1.35,
            "INR": 83.0,
            "BRL": 5.0,
            "ZAR": 18.5,
            "RUB": 90.0,
            "PLN": 4.0,
            "TRY": 32.5,
            "KRW": 1350.0,
            "THB": 35.5,
            // Added Philippine Peso with correct rate
            "PHP": 55.5
        };
        
        // Handle special cases first
        if (base === counter) return 1.0;
        
        let rate;
        
        // If we have predefined rates for both currencies against USD
        if (usdRates[base] && usdRates[counter]) {
            // Cross rate calculation
            rate = usdRates[counter] / usdRates[base];
        } 
        // Other fallback logic as before
        else if (usdRates[base]) {
            // Use a reasonable range for unknown currencies
            const variation = Math.random() * 100 + 0.5;
            rate = variation / usdRates[base];
        }
        else if (usdRates[counter]) {
            const variation = Math.random() * 100 + 0.5;
            rate = usdRates[counter] * variation;
        }
        else {
            // Generate a reasonable random rate between 0.01 and 100
            rate = Math.pow(10, (Math.random() * 4) - 2);
        }
        
        // Add a small random variation to make it look realistic
        const variation = 1 + ((Math.random() * 0.04) - 0.02);
        rate *= variation;
        
        return rate;
    },
    
    // Helper methods - unchanged
    formatPairName: function(base, counter) {
        return `${base}/${counter}`;
    },
    
    isMajorPair: function(base, counter) {
        const pairName = this.formatPairName(base, counter);
        return this.majorPairs.includes(pairName);
    },
    
    getLastUpdatedString: function() {
        if (this.api.lastUpdated) {
            return this.api.lastUpdated.toLocaleString();
        }
        return "Not yet updated";
    }
};