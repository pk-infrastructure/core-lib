export type ErrorEntryType = {
    code: string;
    message?: string;
};
export type ErrorRegistryType = {
    [k in string]: ErrorRegistryType | ErrorEntryType;
};
export declare class CustomError {
    private readonly code;
    private readonly message;
    private readonly metadata;
    constructor(errorEntry: ErrorEntryType, metadata?: unknown);
}
