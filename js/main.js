import ui from './ui.js';
import userAuth from './auth/userAuth.js';
import taskAuth from './auth/taskAuth.js';

const initializeEventListeners = () => {
    ui.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        await userAuth.login(email, password);
    });

    ui.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        await userAuth.register(username, email, password);
    });

    ui.createTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name').value;
        await taskAuth.createTask(taskName);
    });

    ui.taskList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            await taskAuth.deleteTask(id);
        } else if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            const newTaskName = prompt('Enter new task name:');
            await taskAuth.updateTask(id, newTaskName);
        }
    });

    ui.logoutBtn.addEventListener('click', () => {
        userAuth.logout();
    });

    ui.showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        ui.showSection(ui.registerSection);
    });

    ui.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        ui.showSection(ui.loginSection);
    });
};

const main = {
    init: () => {
        initializeEventListeners();
        userAuth.checkLogin();
    }
};

export default main;
