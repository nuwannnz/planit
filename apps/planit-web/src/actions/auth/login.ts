'use server';

import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  NotAuthorizedException,
  UserNotConfirmedException,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import { FormState, LoginFormSchema } from './login.schema';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/shared/types/cookies';

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

  let result: InitiateAuthCommandOutput;

  try {
    result = await client.send(command);

    const idToken = result.AuthenticationResult?.IdToken;
    const accessToken = result.AuthenticationResult?.AccessToken;
    const refreshToken = result.AuthenticationResult?.RefreshToken;

    if (idToken && accessToken && refreshToken) {
      const cookieStore = await cookies();
      const options = {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: true,
      };

      cookieStore.set(COOKIE_KEYS.ID_TOKEN, idToken, options);
      cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, options);
      cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, options);
    } else {
      throw new Error();
    }
  } catch (e: unknown) {
    console.error('Error during user login:', e);
    if (e instanceof UserNotConfirmedException) {
      return redirect(
        `/auth/verify?n=${btoa(encodeURIComponent(validatedFields.data.email))}`
      );
    }

    let message = 'An error occurred during login.';

    if (e instanceof UserNotFoundException) {
      message = 'User not found. Please check your email and password.';
    }

    if (e instanceof NotAuthorizedException) {
      message = 'Incorrect email or password. Please try again.';
    }

    return {
      message,
      success: false,
      formData,
    };
  }

  redirect('/me');
}
