import { EnvKeys } from '@/shared/types/env';

export abstract class AppEnv {
  public static getValue(key: EnvKeys): string {
    return process.env[key] ?? '';
  }
}
