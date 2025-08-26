import express, { Request, Response } from 'express';
import { CreateTaskDto, Task } from '@./types';
import { getUUID } from '@./utils';
import taskStorage from '../storage/TaskStorage.js';

const router = express.Router();

router.get(`/`, (_req, res: Response<Task[]>) => {
  return res.send(taskStorage.get());
});

router.post('/', (req: Request<CreateTaskDto>, res: Response<Task>) => {
  const task: Task = {
    ...req.body,
    id: getUUID(),
  };
  taskStorage.add(task);

  return res.send(taskStorage.getById(task.id));
});

export default router;
