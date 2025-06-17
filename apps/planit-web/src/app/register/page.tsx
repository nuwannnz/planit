import { Button, TextField, Typography } from '@./planit-shared-ui';
import { AuthPageLayout } from '@/components/AuthPageLayout/AuthPageLayout';
import { Stack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Index() {
  return (
    <AuthPageLayout title="Create an account">
      <>
        <form action="#">
          <Stack gap={4}>
            <TextField
              type="email"
              name="email"
              label="Email address"
              id="email"
              autoComplete="email"
              required
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              required
            />
            <Button type="submit">Sign up</Button>
          </Stack>
        </form>

        <Typography>
          Already have an account?{' '}
          <Link href="#" className="font-semibold ">
            log in here
          </Link>
        </Typography>
      </>
    </AuthPageLayout>
  );
}
