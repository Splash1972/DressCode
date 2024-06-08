document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerHTML = `Failed to log in. Don't have an account? <a href="/register">Register here</a>`;
            errorMessage.style.display = 'block';
        }
    }
});