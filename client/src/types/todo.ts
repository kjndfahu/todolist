export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt: string | null;
    createdAt: string;
}

export type TodoUpdateFields = Partial<Pick<Todo, 'title' | 'description'>>;
