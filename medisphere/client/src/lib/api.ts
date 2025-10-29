import axios from 'axios';

const api = axios.create({
  // If VITE_API_URL is set, use it. Otherwise, use localhost for dev, and /api in prod on Vercel.
  baseURL:
    (import.meta as any).env?.VITE_API_URL ||
    ((import.meta as any).env?.DEV ? 'http://localhost:5000/api' : '/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api.post('/auth/register', data),
};

// Hospital API
export const hospitalAPI = {
  getAll: () => api.get('/hospitals'),
  search: (params: { q?: string; location?: string; specialty?: string }) =>
    api.get('/hospitals/search', { params }),
};

// Appointment API
export const appointmentAPI = {
  create: (data: { hospitalId: string; date: string; reason?: string; notes?: string }) =>
    api.post('/appointments', data),
  getUserAppointments: () => api.get('/appointments'),
};

