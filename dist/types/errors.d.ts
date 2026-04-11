/**
 * Base error class for all Klozeo API errors.
 */
export declare class KlozeoError extends Error {
    /** HTTP status code */
    readonly statusCode: number;
    /** API error code (e.g. "not_found", "rate_limit_exceeded") */
    readonly code: string;
    constructor(message: string, statusCode: number, code: string);
}
/**
 * Thrown when the API returns 404 Not Found.
 */
export declare class NotFoundError extends KlozeoError {
    constructor(message: string, code?: string);
}
/**
 * Thrown when the API returns 401 Unauthorized (missing or invalid API key).
 */
export declare class UnauthorizedError extends KlozeoError {
    constructor(message: string, code?: string);
}
/**
 * Thrown when the API returns 403 Forbidden (e.g. leads limit reached).
 */
export declare class ForbiddenError extends KlozeoError {
    constructor(message: string, code?: string);
}
/**
 * Thrown when the API returns 429 Too Many Requests.
 * Check `retryAfter` (seconds) before retrying.
 */
export declare class RateLimitedError extends KlozeoError {
    /** Number of seconds to wait before retrying */
    readonly retryAfter: number;
    constructor(message: string, retryAfter: number, code?: string);
}
/**
 * Thrown when the API returns 400 Bad Request.
 */
export declare class BadRequestError extends KlozeoError {
    constructor(message: string, code?: string);
}
//# sourceMappingURL=errors.d.ts.map