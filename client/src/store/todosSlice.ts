import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';
import { readFromStorage, writeToStorage } from '../utils/storage';
import {
    fetchTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from './thunks/todosThunks';

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: readFromStorage(),
    loading: false,
    error: null,
};

const todosSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
                writeToStorage(state.todos);
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos';
            })

            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.unshift(action.payload);
                writeToStorage(state.todos);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add todo';
            })

            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
                writeToStorage(state.todos);
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update todo';
            })

            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
                writeToStorage(state.todos);
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to toggle todo';
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                writeToStorage(state.todos);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete todo';
            });
    },
});

export const { clearError } = todosSlice.actions;
export default todosSlice.reducer;