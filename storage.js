// This file handles user data storage

/**
 * Saves user credentials to local storage
 * @param {string} username - The user's username
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 */
function saveUserData(username, email, password) {
    console.log('Saving user data:', { username, email, password });
    
    // Store user data as an object
    const userData = {
        username: username,
        email: email,
        password: password,
        lastLogin: new Date().toISOString() // Track when user registered
    };
    
    // Save in multiple locations for consistency
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Update the accounts list
    let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const existingAccountIndex = accounts.findIndex(acc => acc.username === username);
    
    if (existingAccountIndex >= 0) {
        // Update existing account
        accounts[existingAccountIndex] = {
            ...accounts[existingAccountIndex],
            ...userData
        };
    } else {
        // Add new account
        accounts.push(userData);
    }
    
    // Save updated accounts
    localStorage.setItem('accounts', JSON.stringify(accounts));
    console.log('Updated accounts:', accounts);
}

/**
 * Gets the current user data
 * @returns {Object|null} User data object or null if no user is logged in
 */
function getUserData() {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) {
        console.log('No current user data found');
        return null;
    }
    
    try {
        const userData = JSON.parse(currentUserData);
        console.log('Retrieved user data:', userData);
        return userData;
    } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
    }
}

/**
 * Sets the current user data
 * @param {Object} userData - User data to store
 */
function setUserData(userData) {
    // Ensure the email is included in the userData
    if (userData && !userData.email && userData.userEmail) {
        userData.email = userData.userEmail; // Normalize email property name
    }
    
    // Log what we're storing
    console.log('Setting current user data:', userData);
    
    // Store the data
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Also update in accounts array to ensure consistency
    if (userData && userData.username) {
        const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        const index = accounts.findIndex(acc => acc.username === userData.username);
        
        if (index !== -1) {
            // Update existing account
            accounts[index] = {...accounts[index], ...userData};
            localStorage.setItem('accounts', JSON.stringify(accounts));
            console.log('Updated account in accounts array:', accounts[index]);
        }
    }
}

/**
 * Clears current user data
 */
function clearUserData() {
    localStorage.removeItem('currentUser');
}