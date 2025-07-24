import { Paper, Stack, Group, ActionIcon, Box, Center } from '@mantine/core';
import { IconPlus, IconCalendar } from '@tabler/icons-react';
import { TaskCard, Task } from '../TaskCard/TaskCard';
import { Typography } from '@/shared/components';
import { Label } from '@/shared/components/label/Label';

interface DayColumnProps {
  day: string;
  tasks: Task[];
}

export const DayColumn = ({ day, tasks }: DayColumnProps) => {
  const taskCount = tasks.length;

  return (
    <Paper
      shadow="xs"
      radius="xs"
      p="xs"
      style={{
        minWidth: '280px',
        maxWidth: '320px',
        flex: 1,
        backgroundColor: 'var(--mantine-color-gray-1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap="md" h="100%">
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <Typography
              size="sm"
              fw={600}
              tt="uppercase"
              c="dimmed"
              style={{ letterSpacing: '0.5px' }}
            >
              {day}
            </Typography>
            <Label variant="filled" color="gray" size="xs">
              {taskCount}
            </Label>
          </Group>
          <ActionIcon variant="subtle" color="gray" size="sm">
            <IconPlus size={16} />
          </ActionIcon>
        </Group>

        <Box style={{ flex: 1, overflowY: 'auto' }}>
          {tasks.length > 0 ? (
            <Stack gap="xs">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Stack>
          ) : (
            <Paper
              style={{
                height: '120px',
                border: '2px dashed var(--mantine-color-gray-3)',
                backgroundColor: 'transparent',
              }}
              radius="md"
            >
              <Center h="100%">
                <Stack align="center" gap="xs">
                  <IconCalendar size={32} color="var(--mantine-color-gray-5)" />
                  <Typography size="sm" c="dimmed">
                    No tasks scheduled
                  </Typography>
                </Stack>
              </Center>
            </Paper>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
