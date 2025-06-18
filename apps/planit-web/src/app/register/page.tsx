'use client';

import { Button, TextField, Typography } from '@./planit-shared-ui';
import { registerUser } from '@/actions/auth/register';
import { AuthPageLayout } from '@/components/AuthPageLayout/AuthPageLayout';
import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';

export default function Index() {
  const [state, action, isPending] = useActionState(registerUser, undefined);
  useEffect(() => {
    console.log('Action state changed:', state);
  }, [state]);

  return (
    <AuthPageLayout title="Create an account">
      <>
        <form action={action}>
          <Stack gap={4}>
            <TextField
              type="text"
              name="name"
              label="Your name"
              id="name"
              autoComplete="name"
              required
              disabled={isPending}
              errorText={state?.errors?.name?.join(',')}
              defaultValue={state?.formData?.get('name')?.toString() ?? ''}
            />

            <TextField
              type="email"
              name="email"
              label="Email address"
              id="email"
              autoComplete="email"
              required
              disabled={isPending}
              errorText={state?.errors?.email?.join(',')}
              defaultValue={state?.formData?.get('email')?.toString() ?? ''}
            />

            <TextField
              type="password"
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              errorText={state?.errors?.password?.join(',')}
              defaultValue={state?.formData?.get('password')?.toString() ?? ''}
            />
            <Button
              type="submit"
              disabled={isPending}
              loading={isPending}
              loadingText="Signing up..."
            >
              Sign up
            </Button>
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
