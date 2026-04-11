/**
 * Base error class for all Klozeo API errors.
 */
export class KlozeoError extends Error {
  /** HTTP status code */
  readonly statusCode: number;
  /** API error code (e.g. "not_found", "rate_limit_exceeded") */
  readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = "KlozeoError";
    this.statusCode = statusCode;
    this.code = code;
    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API returns 404 Not Found.
 */
export class NotFoundError extends KlozeoError {
  constructor(message: string, code = "not_found") {
    super(message, 404, code);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API returns 401 Unauthorized (missing or invalid API key).
 */
export class UnauthorizedError extends KlozeoError {
  constructor(message: string, code = "unauthorized") {
    super(message, 401, code);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API returns 403 Forbidden (e.g. leads limit reached).
 */
export class ForbiddenError extends KlozeoError {
  constructor(message: string, code = "forbidden") {
    super(message, 403, code);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API returns 429 Too Many Requests.
 * Check `retryAfter` (seconds) before retrying.
 */
export class RateLimitedError extends KlozeoError {
  /** Number of seconds to wait before retrying */
  readonly retryAfter: number;

  constructor(message: string, retryAfter: number, code = "rate_limit_exceeded") {
    super(message, 429, code);
    this.name = "RateLimitedError";
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API returns 400 Bad Request.
 */
export class BadRequestError extends KlozeoError {
  constructor(message: string, code = "bad_request") {
    super(message, 400, code);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
