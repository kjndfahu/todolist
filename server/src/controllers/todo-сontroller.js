import * as todoService from '../services/todo-service.js'

export const getAll = async (req, res, next) => {
    try{
        const { search } = req.query;
        const todos = await todoService.getAllTodos(search);
        res.status(200).json(todos);
    } catch(err){
        next(err)
    }
}

export const getById = async (req, res, next) => {
    try{
        const todo = await todoService.getTodoById(req.params.id);
        if(!todo){
            return res.status(404).json({message: 'Task not found'});
        }
        res.status(200).json(todo)
    } catch(err){
        next(err)
    }
}

export const create = async (req, res, next) => {
    try{
        const { title, description, completed } = req.body;
        const todo = await todoService.createTodo({ title, description, completed });
        res.status(201).json(todo)
    } catch(err){
        next(err)
    }
}

export const update = async (req, res, next) => {
    try{
        const todo = await todoService.updateTodo(req.params.id, req.body);

        if (!todo) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(todo);
    } catch(err){
        next(err)
    }
}

export const remove = async (req, res, next) => {
    try {
        const todo = await todoService.deleteTodo(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        next(err);
    }
};
