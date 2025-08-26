export interface BaseTask {
  id: string;
}

export interface Task extends BaseTask {
  title: string;
  description?: string;
}
