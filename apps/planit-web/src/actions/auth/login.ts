'use server';

import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  UserNotConfirmedException,
} from '@aws-sdk/client-cognito-identity-provider';
import { FormState, LoginFormSchema } from './login.schema';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function loginUser(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      formData,
    };
  }

  const client = new CognitoIdentityProviderClient({});

  const command = new InitiateAuthCommand({
    ClientId: AppEnv.getValue(ENV_KEYS.AWS_COGNITO_CLIENT_APP_ID),
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: validatedFields.data.email,
      PASSWORD: validatedFields.data.password,
    },
  });

  try {
    const result = await client.send(command);
    console.log('User logged in result:', result);
    const idToken = result.AuthenticationResult?.IdToken;
    const accessToken = result.AuthenticationResult?.AccessToken;
    const refreshToken = result.AuthenticationResult?.RefreshToken;

    if (idToken && accessToken && refreshToken) {
      const cookieStore = await cookies();
      cookieStore.set('idToken', idToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
      });
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
      });
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'lax',
      });
    }

    redirect('/me');
  } catch (e: unknown) {
    console.error('Error during user registration:', e);
    if (e instanceof UserNotConfirmedException) {
      return redirect(
        `/auth/verify?n=${btoa(encodeURIComponent(validatedFields.data.email))}`
      );
    }
    return {
      message: 'An error occurred during login.',
      success: false,
      formData,
    };
  }
}
