// Login and signup form handling

// Setup form event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
    // For login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            // Clear any existing messages
            clearMessage('login-username');
            clearMessage('login-password');
            
            // Validate input
            let isValid = true;
            
            if (!validateUsername(username)) {
                showMessage('Username must be at least 3 characters', 'login-username');
                isValid = false;
            }
            
            if (!validatePassword(password)) {
                showMessage('Password must be at least 6 characters', 'login-password');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Attempt login
            if (login(username, password)) {
                showMessage('Login successful! Redirecting...', 'login-form', 'success');
                setTimeout(() => {
                    window.location.href = '../homepage2.html';
                }, 1500);
            } else {
                showMessage('Invalid username or password', 'login-password');
            }
        });
        
        // Set up input monitoring to clear messages
        setupMessageClearingEvents(['login-username', 'login-password']);
    }
    
    // For signup page
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Clear any existing messages
            clearMessage('username');
            clearMessage('password');
            clearMessage('confirm-password');
            
            // Validate input
            let isValid = true;
            
            if (!validateUsername(username)) {
                showMessage('Username must be at least 3 characters', 'username');
                isValid = false;
            }
            
            if (!validatePassword(password)) {
                showMessage('Password must be at least 6 characters', 'password');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'confirm-password');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Try to register
            if (registerUser(username, password)) {
                showMessage('Account created successfully!', 'signup-form', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                showMessage('Username already exists', 'username');
            }
        });
        
        // Set up input monitoring to clear messages
        setupMessageClearingEvents(['username', 'password', 'confirm-password']);
    }
    
    // Setup logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});