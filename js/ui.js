const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const tasksSection = document.getElementById('tasks-section');
const logoutBtn = document.getElementById('logout-btn');
const usernameSpan = document.getElementById('username');
const taskList = document.getElementById('task-list');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const createTaskForm = document.getElementById('create-task');

const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');


const displayTasks = (tasks) => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.taskName}</span>
            <div>
                <button class="edit-btn" data-id="${task._id}">Edit</button>
                <button class="delete-btn" data-id="${task._id}">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

const ui = {
    loginSection,
    registerSection,
    tasksSection,
    logoutBtn,
    usernameSpan,
    taskList,
    loginForm,
    registerForm,
    createTaskForm,
    showRegister,
    showLogin,
    displayTasks,
};

export default ui;
