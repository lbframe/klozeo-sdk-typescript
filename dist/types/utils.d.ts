import type { CompiledFilter, SortField } from "./types";
import { KlozeoError } from "./errors";
/**
 * Append filter, sort, and pagination params to a URLSearchParams instance.
 */
export declare function buildQueryParams(params: URLSearchParams, opts: {
    filters?: CompiledFilter[];
    sortBy?: SortField;
    sortOrder?: "asc" | "desc";
    limit?: number;
    cursor?: string;
    format?: string;
}): void;
/**
 * Parse an API error response body and produce a typed KlozeoError.
 */
export declare function parseError(response: Response): Promise<KlozeoError>;
/**
 * Sleep for the given number of milliseconds.
 */
export declare function sleep(ms: number): Promise<void>;
/**
 * Compute exponential back-off delay with jitter.
 * @param attempt - Zero-based attempt index.
 * @param baseMs - Base delay in milliseconds (default 500).
 */
export declare function backoffDelay(attempt: number, baseMs?: number): number;
/**
 * Convert a snake_case API lead object to a camelCase Lead.
 */
export declare function deserializeLead(raw: Record<string, any>): import("./types.js").Lead;
/**
 * Convert a camelCase CreateLeadInput / UpdateLeadInput to the snake_case
 * body expected by the API.
 */
export declare function serializeLeadInput(input: Record<string, any>): Record<string, any>;
/**
 * Deserialize a raw note object from the API.
 */
export declare function deserializeNote(raw: Record<string, any>): import("./types.js").Note;
/**
 * Deserialize a raw scoring rule from the API.
 */
export declare function deserializeScoringRule(raw: Record<string, any>): import("./types.js").ScoringRule;
/**
 * Deserialize a raw webhook from the API.
 */
export declare function deserializeWebhook(raw: Record<string, any>): import("./types.js").Webhook;
//# sourceMappingURL=utils.d.ts.map