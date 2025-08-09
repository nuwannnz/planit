import { Paper, Stack, Group, Box } from '@mantine/core';
import { Typography } from '@/shared/components';
import { ReactNode } from 'react';

interface KanbanColumnProps {
  title: ReactNode;
  children: ReactNode;
  headerRight?: ReactNode;
  minWidth?: string;
  maxWidth?: string;
}

export const KanbanColumn = ({
  title,
  children,
  headerRight,
  minWidth = '280px',
  maxWidth = '320px',
}: KanbanColumnProps) => {
  return (
    <Paper
      shadow="xs"
      radius="xs"
      p="xs"
      style={{
        minWidth,
        maxWidth,
        flex: 1,
        backgroundColor: 'var(--mantine-color-gray-0)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap="md" h="100%">
        <Group justify="space-between" align="center">
          {typeof title === 'string' ? (
            <Typography
              size="sm"
              fw={600}
              tt="uppercase"
              c="dimmed"
              style={{ letterSpacing: '0.5px' }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
          {headerRight}
        </Group>
        <Box style={{ flex: 1, overflowY: 'auto' }}>{children}</Box>
      </Stack>
    </Paper>
  );
};
