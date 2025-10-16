import { Todo } from "../models/todo.js";

export const saveTodo = async (todo) => {
    try {
        const newTodo = new Todo(todo);
        return await newTodo.save();
    } catch (err) {
        throw err;
    }
};

export const findAllTodos = async (filter = {}) => {
    try {
        return await Todo.find(filter);
    } catch (err) {
        throw err;
    }
};

export const findTodoById = async (id) => {
    try {
        return await Todo.findById(id);
    } catch (err) {
        throw err;
    }
};

export const updateTodoById = async (id, updateData) => {
    try {
        return await Todo.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    } catch (err) {
        throw err;
    }
};

export const deleteTodoById = async (id) => {
    try {
        return await Todo.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
};