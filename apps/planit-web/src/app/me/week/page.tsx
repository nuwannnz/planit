'use client';

import { useState } from 'react';
import { Group, Stack, Flex, Box } from '@mantine/core';
import { DayColumn } from '@/components/tasks/DayColumn/DayColumn';
import { Task } from '@/components/tasks/TaskCard/TaskCard';
import { Typography } from '@/shared/components';
import { getCurrentWeekRange } from '@/shared/utils/dates/weeks';
import { AppPageLayout } from '@/components/appShell/AppPageLayout';

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

export default function Index() {
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

  return (
    <AppPageLayout>
      <Flex direction="column" gap="xl" h="100%">
        {/* Header */}
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Group gap="sm" align="end">
                <Typography variant="heading" order={1} size="h2">
                  Week
                </Typography>
                <Typography c="dimmed" size="md" pb={2}>
                  ({getCurrentWeekRange()})
                </Typography>
              </Group>
            </Stack>
          </Group>
        </Stack>

        {/* Weekly columns */}
        <Box
          style={{
            overflowX: 'auto',
            paddingBottom: '24px',
            flex: 1,
            minHeight: 0, // For Firefox flex overflow
          }}
        >
          <Flex gap="lg" style={{ minWidth: 'fit-content', height: '100%' }}>
            {DAYS_OF_WEEK.map((day) => (
              <DayColumn key={day} day={day} tasks={tasks[day] || []} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </AppPageLayout>
  );
}
