// Debug utility for storage issues

function debugStorageState() {
    console.group('Storage Debug Information');
    console.log('localStorage contents:');
    
    // Display all localStorage keys and values
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
            const value = localStorage.getItem(key);
            const parsed = JSON.parse(value);
            console.log(`${key}:`, parsed);
        } catch (e) {
            console.log(`${key}:`, localStorage.getItem(key));
        }
    }
    
    // Specifically log user-related data
    console.log('Current user data:', getUserData());
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    console.log('All accounts:', accounts);
    console.groupEnd();
}

// Export the userData and accounts to global scope for debugging
function exposeStorageToConsole() {
    window.debugStorage = {
        getUserData: getUserData,
        debugStorageState: debugStorageState,
        accounts: JSON.parse(localStorage.getItem('accounts') || '[]'),
        userData: localStorage.getItem('userData'),
        currentUser: localStorage.getItem('currentUser')
    };
    
    console.log("Debug helpers exposed to window.debugStorage");
}
