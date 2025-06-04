document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginStatus = document.getElementById('loginStatus');
    const signupStatus = document.getElementById('signupStatus');

    // Tab switching
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Login functionality
    loginButton.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            loginStatus.textContent = 'Please fill in all fields';
            loginStatus.className = 'status-message error';
            return;
        }

        try {
            const success = await signIn(email, password);
            if (success) {
                loginStatus.textContent = 'Logging in...';
                loginStatus.className = 'status-message success';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } catch (error) {
            loginStatus.textContent = error.message || 'Login failed. Please try again.';
            loginStatus.className = 'status-message error';
        }
    });

    // Sign up functionality
    signupButton.addEventListener('click', async () => {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!email || !password || !confirmPassword) {
            signupStatus.textContent = 'Please fill in all fields';
            signupStatus.className = 'status-message error';
            return;
        }

        if (password !== confirmPassword) {
            signupStatus.textContent = 'Passwords do not match';
            signupStatus.className = 'status-message error';
            return;
        }

        try {
            const success = await signUp(email, password);
            if (success) {
                signupStatus.textContent = 'Account created! Please check your email for verification.';
                signupStatus.className = 'status-message success';
                
                // Switch to login tab after successful signup
                setTimeout(() => {
                    loginTab.click();
                }, 2000);
            }
        } catch (error) {
            signupStatus.textContent = error.message || 'Signup failed. Please try again.';
            signupStatus.className = 'status-message error';
        }
    });
});
