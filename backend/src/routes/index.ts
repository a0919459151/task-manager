import { initServer } from '@ts-rest/express';
import { taskContract } from '../../../contracts/src/tasks';
import Task from '../models/Task';

const s = initServer();

export const taskRouter = s.router(taskContract, {
  getTasks: async () => {
    const tasks = await Task.find().sort({ updatedAt: -1 });
    return {
      status: 200,
      body: tasks.map(task => ({
        _id: task._id.toString(),
        title: task.title,
        content: task.content,
        status: task.status,
        lastEdited: task.updatedAt.toISOString(), // 使用 updatedAt
      })),
    };
  },
  getTask: async ({ params }) => {
    const task = await Task.findById(params.id);
    if (!task) {
      return { status: 404, body: { message: 'Task not found' } };
    }
    return {
      status: 200,
      body: {
        _id: task._id.toString(),
        title: task.title,
        content: task.content,
        status: task.status,
        lastEdited: task.updatedAt.toISOString(),
      },
    };
  },
  createTask: async ({ body }) => {
    const task = new Task(body);
    await task.save();
    return {
      status: 201,
      body: {
        _id: task._id.toString(),
        title: task.title,
        content: task.content,
        status: task.status,
        lastEdited: task.updatedAt.toISOString(),
      },
    };
  },
  updateTask: async ({ params, body }) => {
    const task = await Task.findByIdAndUpdate(params.id, body, { new: true });
    if (!task) {
      return { status: 404, body: { message: 'Task not found' } };
    }
    return {
      status: 200,
      body: {
        _id: task._id.toString(),
        title: task.title,
        content: task.content,
        status: task.status,
        lastEdited: task.updatedAt.toISOString(),
      },
    };
  },
  deleteTask: async ({ params }) => {
    const task = await Task.findByIdAndDelete(params.id);
    if (!task) {
      return { status: 404, body: { message: 'Task not found' } };
    }
    return { status: 200, body: { message: 'Task deleted successfully' } };
  },
});