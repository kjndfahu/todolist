import { Todo } from '../types/todo';

const STORAGE_KEY = 'tasks';

export const readFromStorage = (): Todo[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const writeToStorage = (tasks: Todo[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
