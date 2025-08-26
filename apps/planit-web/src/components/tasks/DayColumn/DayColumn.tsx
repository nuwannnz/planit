import { Stack } from '@mantine/core';
import { TaskCard } from '../TaskCard/TaskCard';
import { KanbanColumn } from '@/shared/components/kanbanColumn/KanbanColumn';
import { Task } from '@./types';

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
