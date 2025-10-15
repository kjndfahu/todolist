// In-memory store for tasks
const tasks = [];

export const getTodos = (search) => {
    if (!search) return tasks;
    const q = String(search).toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
};

export const getTodoById = (id) => tasks.find((t) => t.id === String(id));

export const createTodo = (data) => {
    const now = new Date();
    const newTask = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description ?? "",
        completed: Boolean(data.completed) || false,
        completedAt: data.completed ? now : null,
        createdAt: now,
    };
    tasks.push(newTask);
    return newTask;
};

export const updateTodo = (id, data) => {
    const idx = tasks.findIndex((t) => t.id === String(id));
    if (idx === -1) return null;
    const existing = tasks[idx];

    const willBeCompleted =
        typeof data.completed === 'boolean' ? data.completed : existing.completed;

    const updated = {
        ...existing,
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        completed: willBeCompleted,
        completedAt: willBeCompleted ? (existing.completedAt ?? new Date()) : null,
    };
    tasks[idx] = updated;
    return updated;
};

export const deleteTodo = (id) => {
    const idx = tasks.findIndex((t) => t.id === String(id));
    if (idx === -1) return null;
    const [removed] = tasks.splice(idx, 1);
    return removed;
};
