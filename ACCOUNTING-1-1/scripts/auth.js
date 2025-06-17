/**
 * Toggles password visibility between hidden and visible
 * @param {string} inputId - The ID of the password input field
 * @param {HTMLElement} button - The button element that was clicked
 */
function togglePasswordVisibility(inputId, button) {
    const passwordInput = document.getElementById(inputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        button.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        button.textContent = 'Show';
    }
}

/**
 * Validates a username
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateUsername(username) {
    // Basic validation - username should be at least 3 characters
    return username && username.trim().length >= 3;
}

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validatePassword(password) {
    // Basic validation - password should be at least 6 characters
    return password && password.length >= 6;
}

/**
 * Shows an error message below the specified input field
 * @param {string} message - Message to display
 * @param {string} inputId - ID of the input field to show message under
 * @param {string} type - Message type (success, error)
 */
function showMessage(message, inputId, type = 'error') {
    // Remove any existing message for this input
    clearMessage(inputId);
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}-message`;
    messageElement.id = `${inputId}-message`;
    messageElement.style.color = type === 'error' ? '#d9534f' : '#5cb85c';
    messageElement.style.fontSize = '14px';
    messageElement.style.marginTop = '5px';
    messageElement.style.marginBottom = '10px';
    messageElement.style.width = '100%';
    messageElement.style.textAlign = 'center';
    
    // Insert message after the input or its container
    const targetElement = document.getElementById(inputId);
    const container = targetElement.closest('.password-container') || targetElement;
    container.insertAdjacentElement('afterend', messageElement);
}

/**
 * Clears an error message for a specific input
 * @param {string} inputId - ID of the input field
 */
function clearMessage(inputId) {
    const existingMessage = document.getElementById(`${inputId}-message`);
    if (existingMessage) {
        existingMessage.remove();
    }
}

/**
 * Sets up event listeners to clear messages when inputs change
 * @param {Array} inputIds - Array of input field IDs to monitor
 */
function setupMessageClearingEvents(inputIds) {
    inputIds.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => clearMessage(inputId));
        }
    });
}

/**
 * Registers a new user
 * @param {string} username - Username for the new account
 * @param {string} password - Password for the new account
 * @returns {boolean} True if registration was successful, false if username exists
 */
function registerUser(username, password) {
    // Get existing accounts or initialize empty array
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Check if username already exists
    if (accounts.some(account => account.username === username)) {
        return false; // Username already exists
    }
    
    // Add new account
    accounts.push({
        username: username,
        password: password // In a real app, you should hash this password
    });
    
    // Save updated accounts
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    return true;
}

/**
 * Authenticates a user login
 * @param {string} username - Username to authenticate
 * @param {string} password - Password to authenticate
 * @returns {boolean} True if login was successful, false otherwise
 */
function login(username, password) {
    // Get accounts
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Find matching account
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    
    if (account) {
        // Store logged in user
        setUserData({
            username: account.username,
            loggedIn: true,
            loginTime: new Date().toString()
        });
        return true;
    }
    
    return false;
}

/**
 * Authenticates user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {boolean} Whether login was successful
 */
function authenticateWithEmail(email, password) {
    // Get accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    
    // Find account by email (case-insensitive)
    const account = accounts.find(acc => acc.email && acc.email.toLowerCase() === email.toLowerCase());
    
    if (account && account.password === password) {
        // Login successful
        setUserData(account); // Store current user data
        
        // Update last login time
        account.lastLogin = new Date().toISOString();
        localStorage.setItem('accounts', JSON.stringify(accounts));
        
        return true;
    }
    
    return false;
}

/**
 * Logs out the current user
 */
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../homepage.html';
}

/**
 * Shows the "No Account" modal
 */
function showNoAccountModal() {
    const modal = document.getElementById('no-account-modal');
    if (modal) {
        modal.classList.add('active');
        // Prevent scrolling of background content
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Closes the "No Account" modal
 */
function closeNoAccountModal() {
    const modal = document.getElementById('no-account-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Checks if user is logged in, shows modal if not
 * @returns {boolean} True if logged in, false otherwise
 */
function checkLoginStatus() {
    // Get user data from localStorage
    const userData = localStorage.getItem('currentUser');
    
    // If there's no user data, show the modal
    if (!userData) {
        showNoAccountModal();
        return false;
    }
    return true;
}

/**
 * Call this function when user tries to access protected content
 * @param {string} feature - Name of the feature being accessed (optional)
 */
function accessProtectedFeature(feature = '') {
    if (checkLoginStatus()) {
        // User is logged in, proceed with accessing content
        console.log('Access granted to', feature || 'protected content');
        return true;
    }
    return false;
}