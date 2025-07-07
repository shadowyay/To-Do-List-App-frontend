import userApi from '../api/userApi.js';
import ui from '../ui.js';

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
            await checkLogin();
        } else {
            alert('Login failed: Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in');
    }
};


const checkLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await userApi.checkCurrentUser(token);
            if (response.ok) {
                const user = await response.json();
                ui.usernameSpan.textContent = user.username;
                ui.showSection(ui.tasksSection);
                ui.logoutBtn.style.display = 'block';
                await fetchAndDisplayTasks();
            } else {
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
    ui.showSection(ui.loginSection);
    ui.logoutBtn.style.display = 'none';
};

const userAuth = {
    checkLogin,
    login,
    register,
    logout,
};

export default userAuth;