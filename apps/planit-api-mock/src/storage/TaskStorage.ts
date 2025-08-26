import { BaseStorage } from './BaseStorage.js';
import { Task } from '@./types';

class TaskStorage extends BaseStorage<Task> {}

export default new TaskStorage();
