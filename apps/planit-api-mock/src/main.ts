import express from 'express';
import taskRouter from './tasks/routes.js';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send({ message: 'PlanIt API mock' });
});

app.use('/tasks', taskRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] ${host}:${port}`);
});
