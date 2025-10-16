import {
    saveTodo,
    findAllTodos,
    findTodoById,
    updateTodoById,
    deleteTodoById
} from "../repository/todo-dal.js";

export const createTodo = (data) => {
    const todo = {
        title: data.title,
        description: data.description ?? "",
        completed: Boolean(data.completed) || false,
        completedAt: data.completed ? new Date() : null,
    };
    return saveTodo(todo);
};

export const getAllTodos = (searchQuery) => {
    return findAllTodos(searchQuery);
};

export const getTodoById = (id) => {
    return findTodoById(id);
};

export const updateTodo = async (id, data) => {
    const existing = await findTodoById(id);
    if (!existing) return null;

    const willBeCompleted =
        typeof data.completed === 'boolean' ? data.completed : existing.completed;

    const updateData = {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        completed: willBeCompleted,
        completedAt: willBeCompleted ? (existing.completedAt ?? new Date()) : null,
    };

    return updateTodoById(id, updateData);
};

export const deleteTodo = (id) => {
    return deleteTodoById(id);
};