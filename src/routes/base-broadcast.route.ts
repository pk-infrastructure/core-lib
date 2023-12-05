import { TSchema } from '@sinclair/typebox';

export abstract class BaseBroadcastRoute {
  static method: string;
  static topic: string;

  static dataSchema: TSchema;
}
