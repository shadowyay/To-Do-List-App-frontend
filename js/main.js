import ui from './ui.js';
import userAuth from './auth/userAuth.js';
import taskAuth from './auth/taskAuth.js';

const handleRouting = () => {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();
    if (token && currentPage === 'login.html') {
        window.location.href = 'index.html';
        return;
    }
    if (!token && currentPage === 'index.html') {
        window.location.href = 'login.html';
        return;
    }
};

ui.showRegister.addEventListener("click",(e)=>{
    e.preventDefault();
    ui.loginSection.classList.add("hidden");
    ui.registerSection.classList.remove("hidden");
});

ui.showLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    ui.loginSection.classList.remove("hidden");
    ui.registerSection.classList.add("hidden");
});

const initializeLoginRegisterEventListeners = () => {
    ui.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        await userAuth.login(email, password);
    });

    ui.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Register form submitted.");
        const username = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        await userAuth.register(username, email, password);
    });
};

const initializeTaskEventListeners = () => {
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
};

const main = {
    init: () => {
        document.addEventListener('DOMContentLoaded', () => {
            console.log("DOM Content Loaded. Initializing event listeners.");
            handleRouting();
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'login.html') {
                initializeLoginRegisterEventListeners();
            } else if (currentPage === 'index.html') {
                initializeTaskEventListeners();
                userAuth.checkLogin(); // Only check login if on tasks page
            }
        });
    }
};

export default main;

main.init();
