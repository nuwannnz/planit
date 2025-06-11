'use client';

import { Amplify } from 'aws-amplify';
// import { signIn } from '@aws-amplify/auth';
import { RegisterUserParams } from '@/shared/types';
import { AppEnv } from '@/shared/services/AppEnv';
import { ENV_KEYS } from '@/shared/types/env';

/**
 * Singleton class for Auth related services.
 */
class AuthService {
  private _isInitialised = false;

  public initialise() {
    if (!this._isInitialised) {
      Amplify.configure(
        {
          Auth: {
            Cognito: {
              userPoolClientId: AppEnv.getValue(ENV_KEYS.COGNITO_CLIENT_APP_ID),
              userPoolId: AppEnv.getValue(ENV_KEYS.COGNITO_USER_POOL_ID),
              loginWith: {
                username: false,
                email: true,
              },
            },
          },
        }
        // { ssr: true }
      );
      this._isInitialised = true;
    }
  }

  public async register({}: RegisterUserParams) {}
}

export default new AuthService();
