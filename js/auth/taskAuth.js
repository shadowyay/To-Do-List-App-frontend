import taskApi from '../api/taskApi.js';
import ui from '../ui.js';

const createTask = async (taskName) => {
    const token = localStorage.getItem('token');
    try {
        const response = await taskApi.createTask(taskName, token);
        if (response.ok) {
            await fetchAndDisplayTasks();
            ui.createTaskForm.reset();
        } else {
            alert('Failed to create task');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        alert('Error creating task');
    }
};

const fetchAndDisplayTasks = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await taskApi.fetchTasks(token);
        if (response.ok) {
            const tasks = await response.json();
            ui.displayTasks(tasks);
        } else {
            console.error('Failed to fetch tasks');
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const updateTask = async (id, newTaskName) => {
    const token = localStorage.getItem('token');
    if (newTaskName) {
        try {
            const response = await taskApi.updateTask(id, newTaskName, token);
            if (response.ok) {
                await fetchAndDisplayTasks();
            } else {
                alert('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    }
};

const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            const response = await taskApi.deleteTask(id, token);
            if (response.ok) {
                await fetchAndDisplayTasks();
            } else {
                alert('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Error deleting task');
        }
    }
};

const taskAuth = {
    fetchAndDisplayTasks,
    createTask,
    deleteTask,
    updateTask,
};

export default taskAuth;