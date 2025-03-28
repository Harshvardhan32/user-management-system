import axios from 'axios';
/**
 * API Service for User Management System
 * Handles API requests and interceptors for authentication
 */
const BASE_URL = 'https://reqres.in/api';

const api = axios.create({
    baseURL: BASE_URL,
});

/**
 * Interceptor for API requests
 * Adds authorization header if token exists
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Login API endpoint
 * Handles user authentication and token retrieval
 */
export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

/**
 * Get users API endpoint
 * Fetches paginated list of users
 */
export const getUsers = async (page) => {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
};

/**
 * Update user API endpoint
 * Updates user information
 */
export const updateUser = async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
};

/**
 * Delete user API endpoint
 * Deletes user by ID
 */
export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

/**
 * Default API instance
 * Exported for use in other modules
 */
export default api;