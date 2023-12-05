import { TSchema } from '@sinclair/typebox';

export abstract class BaseRequestRoute {
  static method: string;
  static topic: string;

  static requestSchema: TSchema;
  static responseSchema: TSchema;

  static role: string;
}
