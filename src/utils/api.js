import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const taskService = {
  async fetchTasks() {
    const { data } = await api.get('/tasks');
    return data;
  },

  async createTask(taskData) {
    const { data } = await api.post('/tasks/create', taskData);
    return data;
  },

  async updateTask(id, taskData) {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data;
  },

  async deleteTask(id) {
    await api.delete(`/tasks/${id}`);
  },

  async getTask(id) {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  async toggleTaskStatus(id, completed) {
    const { data } = await api.patch(`/tasks/${id}`, { completed });
    return data;
  }
};

export const userService = {
  async getProfile(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  async updateProfile(id, userData) {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  }
};

export default api;
