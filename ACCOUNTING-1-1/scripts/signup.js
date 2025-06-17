document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            // Validate email
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            console.log('Signup data:', { username, email });
            
            // Save user data
            saveUserData(username, email, password);
            
            // Also set as current user
            const userData = {
                username: username,
                email: email,
                password: password,
                lastLogin: new Date().toISOString()
            };
            setUserData(userData);
            
            // Redirect to homepage2
            window.location.href = '../homepage2.html';
        });
    }
});