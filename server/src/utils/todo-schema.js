import { z } from 'zod';

export const createTodoSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    completed: z.boolean().optional()
});

export const updateTodoSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional()
});

export const idParamSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/i, 'Invalid ObjectId')
});

export const searchQuerySchema = z.object({
    search: z.string().optional()
});