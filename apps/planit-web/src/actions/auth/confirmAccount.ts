'use server';

import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ExpiredCodeException,
} from '@aws-sdk/client-cognito-identity-provider';
import { FormState, ConfirmAccountFormSchema } from './confirmAccount.schema';
import { redirect } from 'next/navigation';

export async function confirmAccount(
  _formState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = ConfirmAccountFormSchema.safeParse({
    email: formData.get('email'),
    confirmationCode: formData.get('confirmationCode'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      formData,
    };
  }

  const client = new CognitoIdentityProviderClient({});

  const command = new ConfirmSignUpCommand({
    ClientId: AppEnv.getValue(ENV_KEYS.AWS_COGNITO_CLIENT_APP_ID),
    Username: validatedFields.data.email,
    ConfirmationCode: validatedFields.data.confirmationCode,
  });

  try {
    const result = await client.send(command);
    console.log('User account confirmed result:', result);
    return redirect('/auth/login');
  } catch (e: unknown) {
    console.error('Error during user account confirmation:', e);

    if (e instanceof ExpiredCodeException) {
      return {
        errors: { confirmationCode: ['The confirmation code has expired.'] },
        success: false,
        formData,
      };
    }
    return {
      message: 'An error occurred during account confirmation.',
      success: false,
      formData,
    };
  }
}
