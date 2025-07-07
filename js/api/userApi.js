const API_URL = "https://to-do-list-app-xsqu.onrender.com"

const registerUser = async (username, email, password) => {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    return response;
};

const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response;
};

const checkCurrentUser = async (token) => {
    const response = await fetch(`${API_URL}/users/current`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
};

const userApi = {
    checkCurrentUser,
    loginUser,
    registerUser,
};

export default userApi;
