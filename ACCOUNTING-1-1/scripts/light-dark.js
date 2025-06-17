// Light-dark theme toggle functionality

document.addEventListener('DOMContentLoaded', function() {
    // Only homepage.html should have theme toggle visible
    const isHomepage1 = window.location.pathname.endsWith('homepage.html') || 
                        window.location.pathname.endsWith('/');
    const isSettingsPage = window.location.pathname.includes('settings.html');
    const themeToggleWrapper = document.querySelector('.theme-switch-wrapper');
    
    console.log('Current page:', window.location.pathname);
    console.log('Is homepage1:', isHomepage1);
    
    // Hide theme toggle on all pages except homepage1
    if (themeToggleWrapper && !isHomepage1) {
        themeToggleWrapper.style.display = 'none';
    }
    
    // Apply theme based on source
    if (isHomepage1) {
        // Homepage1 uses its own theme setting
        const storedTheme = localStorage.getItem('homepage1-theme') || 'light';
        applyTheme(storedTheme);
        
        // Set up theme toggle for homepage1
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.checked = storedTheme === 'dark';
            toggle.addEventListener('change', function(e) {
                const newTheme = e.target.checked ? 'dark' : 'light';
                applyTheme(newTheme);
                localStorage.setItem('homepage1-theme', newTheme);
            });
        }
    } else {
        // All other pages use master theme from settings
        const masterTheme = localStorage.getItem('master-theme') || 'light';
        console.log('Applying master theme:', masterTheme);
        applyTheme(masterTheme);
        
        // Settings page retains control of master theme
        if (isSettingsPage) {
            const settingsToggle = document.getElementById('theme-toggle-settings');
            if (settingsToggle) {
                settingsToggle.checked = masterTheme === 'dark';
            }
        }
    }
    
    // Helper function to apply theme
    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        
        // Remove any existing theme classes first
        document.body.classList.remove('light-theme', 'dark-theme');
        
        // Apply theme via data-attribute (primary method)
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
        } else {
            document.body.removeAttribute('data-theme');
            document.body.classList.add('light-theme');
        }
        
        // Also set a class on html element for broader compatibility
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
        
        // Dispatch event for any custom theme handlers
        const themeEvent = new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        });
        document.dispatchEvent(themeEvent);
    }
});