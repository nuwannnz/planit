'use server';

import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';
import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { FormState, ResendCodeFormSchema } from './resendCode.schema';

export async function resendCode(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = ResendCodeFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      formData,
    };
  }

  const client = new CognitoIdentityProviderClient({});

  const command = new ResendConfirmationCodeCommand({
    ClientId: AppEnv.getValue(ENV_KEYS.AWS_COGNITO_CLIENT_APP_ID),
    Username: validatedFields.data.email,
  });

  try {
    const result = await client.send(command);
    console.log('Resend confirmation code result:', result);
    return {
      message: 'A new confirmation code has been sent to your email.',
      success: true,
      formData,
    };
  } catch (e: unknown) {
    console.error('Error during resend confirmation code:', e);
    return {
      message: 'An error occurred during account confirmation.',
      success: false,
      formData,
    };
  }
}
