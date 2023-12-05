"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(errorEntry, metadata) {
        this.message = 'Unknown Error';
        this.code = errorEntry.code;
        this.message = errorEntry.message || this.message;
        this.metadata = metadata;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom.error.js.map