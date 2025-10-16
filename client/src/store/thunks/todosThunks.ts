import { createAsyncThunk } from '@reduxjs/toolkit';
import {todoAPI} from "../../services/api";
import {TodoUpdateFields} from "../../types/todo";

interface TodosState {
    todos: Array<{
        id: string;
        completed: boolean;
        title: string;
        description: string;
    }>;
    loading: boolean;
    error: string | null;
}

export const fetchTodos = createAsyncThunk(
    'tasks/fetchTodos',
    async (search?: string) => {
        const response = await todoAPI.getAll(search);
        return response;
    }
);

export const addTodo = createAsyncThunk(
    'tasks/addTodo',
    async (data: { title: string; description: string }) => {
        const response = await todoAPI.create({
            title: data.title,
            description: data.description,
            completed: false,
        });
        return response;
    }
);

export const updateTodo = createAsyncThunk(
    'tasks/updateTodo',
    async ({ id, fields }: { id: string; fields: TodoUpdateFields }) => {
        const response = await todoAPI.update(id, fields);
        return response;
    }
);

export const toggleTodo = createAsyncThunk(
    'tasks/toggleTodo',
    async (id: string, { getState }) => {
        const state = getState() as { todos: TodosState };
        const todo = state.todos.todos.find(t => t.id === id);

        if (!todo) throw new Error('Todo not found');

        const response = await todoAPI.update(id, {
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : null,
        } as any);
        return response;
    }
);

export const deleteTodo = createAsyncThunk(
    'tasks/deleteTodo',
    async (id: string) => {
        await todoAPI.delete(id);
        return id;
    }
);