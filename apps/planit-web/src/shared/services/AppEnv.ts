import { ENV_KEYS } from '@/shared/types/env';

export abstract class AppEnv {
  public static getValue(key: ENV_KEYS): string {
    return process.env[key] ?? '';
  }
}
