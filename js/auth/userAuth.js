import userApi from '../api/userApi.js';
import ui from '../ui.js';
import taskAuth from './taskAuth.js';

const register = async (username, email, password) => {
    try {
        const response = await userApi.registerUser(username, email, password);
        if (response.ok) {
            alert('Registration successful. Please login.');
            ui.showSection(ui.loginSection);
        } else {
            alert('Registration failed: Email or username may already be taken');
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Error registering');
    }
};

const login = async (email, password) => {
    try {
        const response = await userApi.loginUser(email, password);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.accessToken);
            console.log("Login successful, token received:", data.accessToken);
            window.location.href = 'index.html';
        } else {
            const errorText = await response.text();
            let errorMessage = 'Invalid email or password';
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorMessage;
            } catch (e) {
                // If errorText is not JSON, use the default message
            }
            console.error('Login failed:', response.status, errorText);
            alert(`Login failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

const checkLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        if (window.location.pathname.endsWith('login.html')) {
            window.location.href = 'index.html';
            return;
        }
        try {
            const response = await userApi.checkCurrentUser(token);
            if (response.ok) {
                const user = await response.json();
                ui.usernameSpan.textContent = user.username;
                ui.showSection(ui.tasksSection);
                ui.logoutBtn.style.display = 'block';
                await taskAuth.fetchAndDisplayTasks();
            } else {
                const errorText = await response.text();
                console.error('Check login failed:', response.status, errorText);
                localStorage.removeItem('token');
                ui.showSection(ui.loginSection);
                ui.logoutBtn.style.display = 'none';
            }
        } catch (error) {
            console.error('Error checking login:', error);
            localStorage.removeItem('token');
            ui.showSection(ui.loginSection);
            ui.logoutBtn.style.display = 'none';
        }
    } else {
        ui.showSection(ui.loginSection);
        ui.logoutBtn.style.display = 'none';
    }
};

const logout = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};

const userAuth = {
    checkLogin,
    login,
    register,
    logout,
};

export default userAuth;