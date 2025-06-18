import { Typography } from '@./planit-shared-ui';
import { Container, Center, Stack } from '@chakra-ui/react';

interface AuthPageLayoutProps {
  title?: string;
  children?: React.ReactNode;
}
export const AuthPageLayout = ({ title, children }: AuthPageLayoutProps) => (
  <Container>
    <Container maxW={'md'} pt={20}>
      <Center>
        {/* TODO ADD logo */}
        <Typography variant="heading" size="xl">
          {title}
        </Typography>
      </Center>

      <Stack mt={10} gap={2}>
        {children}
      </Stack>
    </Container>
  </Container>
);
