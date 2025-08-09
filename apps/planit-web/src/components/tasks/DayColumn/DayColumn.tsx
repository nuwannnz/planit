import { Stack } from '@mantine/core';
import { TaskCard, Task } from '../TaskCard/TaskCard';
import { KanbanColumn } from '@/shared/components/kanbanColumn/KanbanColumn';

interface DayColumnProps {
  day: string;
  tasks: Task[];
}

export function DayColumn({ day, tasks }: DayColumnProps) {
  return (
    <KanbanColumn title={day}>
      <Stack gap="xs">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </KanbanColumn>
  );
}
