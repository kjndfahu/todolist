import { Todo } from '../types/todo';

export const filterTodos = (todos: Todo[], query: string): Todo[] => {
    const searchQuery = query.trim().toLowerCase();
    if (!searchQuery) return todos;
    return todos.filter(todo => todo.title.toLowerCase().includes(searchQuery));
};
