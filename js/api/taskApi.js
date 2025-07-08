const API_URL = "https://to-do-list-app-xsqu.onrender.com/api"

const createTask = async (taskName, token) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ taskName })
    });
    return response;
};

const fetchTasks = async (token) => {
    const response = await fetch(`${API_URL}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};


const updateTask = async (id, newTaskName, token) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ taskName: newTaskName })
    });
    return response;
};

const deleteTask = async (id, token) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

const taskApi = {
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
};

export default taskApi;
