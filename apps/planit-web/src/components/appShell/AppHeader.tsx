'use client';

import { Typography, IconButton, Tooltip } from '@/shared/components';
import { APP_SHELL_HEADER_HEIGHT } from '@/shared/branding/dimensions';
import { AppShellHeader, Group } from '@mantine/core';
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
  IconLogout,
} from '@tabler/icons-react';
import { logoutUser } from '@/actions/auth/logout';
import { BLACK } from '@/shared/branding/colors';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';

interface AppHeaderProps {
  onNavbarToggled: (opened: boolean) => void;
}

export function AppHeader({ onNavbarToggled }: AppHeaderProps) {
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    onNavbarToggled(opened);
  }, [opened, onNavbarToggled]);

  return (
    <AppShellHeader h={APP_SHELL_HEADER_HEIGHT}>
      <Group align="center" justify="space-between" h="100%" px={12}>
        <Group align="center" h="100%">
          <IconButton onClick={toggle} aria-label="Toggle sidebar">
            {opened ? (
              <IconLayoutSidebarRightExpand />
            ) : (
              <IconLayoutSidebarLeftExpand />
            )}
          </IconButton>
          <Typography variant="subheading">PlanIt</Typography>
        </Group>
        <Tooltip label="Logout" position="bottom">
          <IconButton onClick={logoutUser} aria-label="Logout" color={BLACK}>
            <IconLogout />
          </IconButton>
        </Tooltip>
      </Group>
    </AppShellHeader>
  );
}
