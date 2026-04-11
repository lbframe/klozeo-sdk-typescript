import type { KlozeoOptions, RateLimitState } from "./types";
import { LeadsResource } from "./resources/leads";
import { NotesResource } from "./resources/notes";
import { ScoringResource } from "./resources/scoring";
import { WebhooksResource } from "./resources/webhooks";
/**
 * Internal HTTP client interface used by resource classes.
 * @internal
 */
export interface HttpClient {
    request(method: string, path: string, opts?: {
        body?: unknown;
    }): Promise<unknown>;
    requestBlob(method: string, path: string): Promise<Blob>;
}
/**
 * Main Klozeo API client.
 *
 * @example
 * ```typescript
 * import { Klozeo } from "@klozeo/sdk";
 *
 * const client = new Klozeo("sk_live_your_api_key");
 * const lead = await client.leads.get("cl_...");
 * ```
 */
export declare class Klozeo implements HttpClient {
    /** Leads resource — CRUD, batch, pagination, export */
    readonly leads: LeadsResource;
    /** Notes resource — create, list, update, delete */
    readonly notes: NotesResource;
    /** Scoring resource — rules management and score recalculation */
    readonly scoring: ScoringResource;
    /** Webhooks resource — create, list, delete */
    readonly webhooks: WebhooksResource;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly timeout;
    private readonly maxRetries;
    private readonly fetchImpl;
    private _rateLimitState;
    constructor(apiKey: string, options?: KlozeoOptions);
    /**
     * Returns the last observed rate-limit state from response headers,
     * or `null` if no request has been made yet.
     */
    rateLimitState(): RateLimitState | null;
    /**
     * Make a JSON API request with automatic retry on 429 / 5xx.
     * @internal
     */
    request(method: string, path: string, opts?: {
        body?: unknown;
    }): Promise<unknown>;
    /**
     * Make a request that returns a Blob (used by the export endpoint).
     * @internal
     */
    requestBlob(method: string, path: string): Promise<Blob>;
    private _executeWithRetry;
    private _fetchWithTimeout;
    private _updateRateLimitState;
}
//# sourceMappingURL=client.d.ts.map