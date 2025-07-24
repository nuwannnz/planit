'use client';

import { useState } from 'react';
import { Group, Stack, Container, Flex, Box } from '@mantine/core';
import { IconPlus, IconSearch, IconUser } from '@tabler/icons-react';
import { Button } from '@/shared/components/button/Button';
import { DayColumn } from '@/components/tasks/DayColumn/DayColumn';
import { Task } from '@/components/tasks/TaskCard/TaskCard';
import { TextField, Typography } from '@/shared/components';

type DayTasks = Record<string, Task[]>;

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WeeklyTaskManager() {
  const [tasks] = useState<DayTasks>({
    Monday: [
      {
        id: '1',
        title: 'Weekly Planning | Create tasks',
        category: 'WEEKLY PLANNING',
        priority: 'high',
        assignee: 'NK',
        estimatedTime: '2h',
      },
      {
        id: '2',
        title: 'Review project requirements',
        category: 'PLANNING',
        priority: 'medium',
        assignee: 'JD',
      },
    ],
    Tuesday: [
      {
        id: '3',
        title: 'Weekly Planning | Week view',
        category: 'WEEKLY PLANNING',
        priority: 'medium',
        assignee: 'NK',
        estimatedTime: '1h',
      },
    ],
    Wednesday: [
      {
        id: '4',
        title: 'Design system updates',
        category: 'DESIGN',
        priority: 'low',
        assignee: 'SM',
      },
    ],
    Thursday: [
      {
        id: '5',
        title: 'CI - Build pipeline setup',
        category: 'SETUP AND CI/CD',
        priority: 'high',
        assignee: 'RJ',
        estimatedTime: '3h',
      },
    ],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box
      style={{
        height: '100vh',
        backgroundColor: 'var(--mantine-color-white-1)',
      }}
      p="sm"
      id="weekly-task-manager"
    >
      <Container fluid h="100%">
        <Flex direction="column" gap="xl" h="100%">
          {/* Header */}
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Typography variant="heading" order={1} size="h2">
                  Week
                </Typography>
              </Stack>
              <Button
                type="button"
                leftSection={<IconPlus size={16} />}
                variant="light"
              >
                Add Task
              </Button>
            </Group>

            {/* Search and filters */}
            <Group gap="md">
              <TextField
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                style={{ flex: 1, maxWidth: '400px' }}
              />
              <Button
                type="button"
                variant="outline"
                leftSection={<IconUser size={16} />}
                color="gray"
              >
                Filter
              </Button>
            </Group>
          </Stack>

          {/* Weekly columns */}
          <Box
            style={{
              overflowX: 'auto',
              paddingBottom: '24px',
              flex: 1,
              minHeight: 0, // This is important for Firefox flex overflow
            }}
          >
            <Flex gap="xl" style={{ minWidth: 'fit-content', height: '100%' }}>
              {DAYS_OF_WEEK.map((day) => (
                <DayColumn key={day} day={day} tasks={tasks[day] || []} />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
