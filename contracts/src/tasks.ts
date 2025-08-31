// contracts/src/tasks.ts
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

// 定義任務的 Zod Schema
const TaskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.enum(['Pending', 'In Progress', 'Completed']),
  lastEdited: z.string(),
});

const TaskCreateSchema = TaskSchema.omit({ _id: true, lastEdited: true });
const TaskUpdateSchema = TaskSchema.omit({ lastEdited: true });

// 定義 API 接口合約
export const taskContract = c.router({
  getTasks: {
    method: 'GET',
    path: '/tasks',
    responses: {
      200: z.array(TaskSchema),
    },
  },
  getTask: {
    method: 'GET',
    path: '/tasks/:id',
    responses: {
      200: TaskSchema,
      404: z.object({ message: z.string() }),
    },
  },
  createTask: {
    method: 'POST',
    path: '/tasks',
    body: TaskCreateSchema,
    responses: {
      201: TaskSchema,
    },
  },
  updateTask: {
    method: 'PUT',
    path: '/tasks/:id',
    body: TaskUpdateSchema,
    responses: {
      200: TaskSchema,
      404: z.object({ message: z.string() }),
    },
  },
  deleteTask: {
    method: 'DELETE',
    path: '/tasks/:id',
    body: z.object({}),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
  },
});