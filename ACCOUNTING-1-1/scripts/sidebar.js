document.addEventListener('DOMContentLoaded', function() {
    const profileToggle = document.getElementById('profile-toggle');
    const sidebar = document.getElementById('profile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const logoutButton = document.getElementById('logout-button');

    // Toggle sidebar when profile icon is clicked
    profileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'pages/login.html';
        });
    }
});