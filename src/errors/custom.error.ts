export type ErrorEntryType = {
  code: string;
  message?: string;
};

export type ErrorRegistryType = { [k in string]: ErrorRegistryType | ErrorEntryType };

export class CustomError {
  private readonly code: string;
  private readonly message: string = 'Unknown Error';
  private readonly metadata: unknown;

  constructor(errorEntry: ErrorEntryType, metadata?: unknown) {
    this.code = errorEntry.code;
    this.message = errorEntry.message || this.message;
    this.metadata = metadata;
  }
}
