import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for sending HTTP-only cookies
});

const apiService = {
    // Authentication methods
    register: (userData) => api.post('/auth/register', userData),
    login: (userData) => api.post('/auth/login', userData),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me'),

    // Post methods (placeholders for now, will refine with form-data and images)
    createPost: (postData) => api.post('/posts', postData),
    getAllPosts: () => api.get('/posts'),
    getPost: (slug) => api.get(`/posts/${slug}`),
    updatePost: (slug, postData) => api.put(`/posts/${slug}`, postData),
    deletePost: (slug) => api.delete(`/posts/${slug}`),
    getMyPosts: () => api.get('/posts/my/posts'),
};

export default apiService;
