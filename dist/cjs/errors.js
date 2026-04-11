"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.RateLimitedError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.KlozeoError = void 0;
/**
 * Base error class for all Klozeo API errors.
 */
class KlozeoError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.name = "KlozeoError";
        this.statusCode = statusCode;
        this.code = code;
        // Maintain proper prototype chain for instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.KlozeoError = KlozeoError;
/**
 * Thrown when the API returns 404 Not Found.
 */
class NotFoundError extends KlozeoError {
    constructor(message, code = "not_found") {
        super(message, 404, code);
        this.name = "NotFoundError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Thrown when the API returns 401 Unauthorized (missing or invalid API key).
 */
class UnauthorizedError extends KlozeoError {
    constructor(message, code = "unauthorized") {
        super(message, 401, code);
        this.name = "UnauthorizedError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Thrown when the API returns 403 Forbidden (e.g. leads limit reached).
 */
class ForbiddenError extends KlozeoError {
    constructor(message, code = "forbidden") {
        super(message, 403, code);
        this.name = "ForbiddenError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Thrown when the API returns 429 Too Many Requests.
 * Check `retryAfter` (seconds) before retrying.
 */
class RateLimitedError extends KlozeoError {
    constructor(message, retryAfter, code = "rate_limit_exceeded") {
        super(message, 429, code);
        this.name = "RateLimitedError";
        this.retryAfter = retryAfter;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.RateLimitedError = RateLimitedError;
/**
 * Thrown when the API returns 400 Bad Request.
 */
class BadRequestError extends KlozeoError {
    constructor(message, code = "bad_request") {
        super(message, 400, code);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=errors.js.map