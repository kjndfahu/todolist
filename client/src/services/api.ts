import axios from 'axios';
import { Todo } from '../types/todo';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoAPI = {
    getAll: async (search?: string): Promise<Todo[]> => {
        const params = search ? { search } : {};
        const response = await api.get<Todo[]>('/', { params });
        return response.data;
    },

    getById: async (id: string): Promise<Todo> => {
        const response = await api.get<Todo>(`/${id}`);
        return response.data;
    },

    create: async (data: { title: string; description: string; completed?: boolean }): Promise<Todo> => {
        const response = await api.post<Todo>('/', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Todo>): Promise<Todo> => {
        const response = await api.put<Todo>(`/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/${id}`);
    },
};
