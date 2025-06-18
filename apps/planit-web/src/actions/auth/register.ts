'use server';

import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  UsernameExistsException,
} from '@aws-sdk/client-cognito-identity-provider';
import { FormState, SignupFormSchema } from './register.schema';

export async function registerUser(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
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

  const command = new SignUpCommand({
    ClientId: AppEnv.getValue(ENV_KEYS.AWS_COGNITO_CLIENT_APP_ID),
    Username: validatedFields.data.email,
    Password: validatedFields.data.password,
    UserAttributes: [{ Name: 'name', Value: validatedFields.data.name }],
  });

  try {
    const result = await client.send(command);
    console.log('User registration result:', result);
    return {
      message: 'User registered successfully',
      success: true,
      formData,
    };
  } catch (e: unknown) {
    console.error('Error during user registration:', e);
    if (e instanceof UsernameExistsException) {
      return {
        errors: { email: ['This email is already registered.'] },
        success: false,
        formData,
      };
    }
    return {
      message: 'An error occurred during registration.',
      success: false,
      formData,
    };
  }
}
