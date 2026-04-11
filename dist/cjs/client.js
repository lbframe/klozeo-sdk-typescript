"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Klozeo = void 0;
const utils_1 = require("./utils");
const errors_1 = require("./errors");
const leads_1 = require("./resources/leads");
const notes_1 = require("./resources/notes");
const scoring_1 = require("./resources/scoring");
const webhooks_1 = require("./resources/webhooks");
const DEFAULT_BASE_URL = "https://app.klozeo.com/api/v1";
const DEFAULT_TIMEOUT = 30000;
const DEFAULT_MAX_RETRIES = 3;
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
class Klozeo {
    constructor(apiKey, options) {
        this._rateLimitState = null;
        if (!apiKey || typeof apiKey !== "string") {
            throw new TypeError("Klozeo: apiKey must be a non-empty string");
        }
        this.apiKey = apiKey;
        this.baseUrl = (options?.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
        this.timeout = options?.timeout ?? DEFAULT_TIMEOUT;
        this.maxRetries = options?.maxRetries ?? DEFAULT_MAX_RETRIES;
        this.fetchImpl = options?.fetch ?? globalThis.fetch.bind(globalThis);
        this.leads = new leads_1.LeadsResource(this);
        this.notes = new notes_1.NotesResource(this);
        this.scoring = new scoring_1.ScoringResource(this);
        this.webhooks = new webhooks_1.WebhooksResource(this);
    }
    /**
     * Returns the last observed rate-limit state from response headers,
     * or `null` if no request has been made yet.
     */
    rateLimitState() {
        return this._rateLimitState;
    }
    // ---------------------------------------------------------------------------
    // Internal HTTP helpers (implements HttpClient)
    // ---------------------------------------------------------------------------
    /**
     * Make a JSON API request with automatic retry on 429 / 5xx.
     * @internal
     */
    async request(method, path, opts = {}) {
        const url = `${this.baseUrl}${path}`;
        const headers = {
            "X-API-Key": this.apiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        const init = {
            method,
            headers,
            ...(opts.body !== undefined
                ? { body: JSON.stringify(opts.body) }
                : {}),
        };
        return this._executeWithRetry(url, init, false);
    }
    /**
     * Make a request that returns a Blob (used by the export endpoint).
     * @internal
     */
    async requestBlob(method, path) {
        const url = `${this.baseUrl}${path}`;
        const init = {
            method,
            headers: {
                "X-API-Key": this.apiKey,
            },
        };
        return this._executeWithRetry(url, init, true);
    }
    // ---------------------------------------------------------------------------
    // Private helpers
    // ---------------------------------------------------------------------------
    async _executeWithRetry(url, init, blobResponse) {
        let lastError;
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            const response = await this._fetchWithTimeout(url, init);
            // Update rate-limit state from every response
            this._updateRateLimitState(response);
            if (response.ok) {
                if (blobResponse) {
                    return response.blob();
                }
                // 204 No Content — return empty object
                if (response.status === 204) {
                    return {};
                }
                return response.json();
            }
            // Build a typed error
            const error = await (0, utils_1.parseError)(response);
            // Retry on 429 and 5xx
            const shouldRetry = attempt < this.maxRetries &&
                (response.status === 429 || response.status >= 500);
            if (!shouldRetry) {
                throw error;
            }
            // For 429, respect the Retry-After header
            if (error instanceof errors_1.RateLimitedError) {
                await (0, utils_1.sleep)(error.retryAfter * 1000);
            }
            else {
                await (0, utils_1.sleep)((0, utils_1.backoffDelay)(attempt));
            }
            lastError = error;
        }
        // Should not reach here, but satisfy TypeScript
        throw lastError ?? new Error("Request failed after retries");
    }
    async _fetchWithTimeout(url, init) {
        if (typeof AbortController === "undefined") {
            // Environments without AbortController (very old runtimes)
            return this.fetchImpl(url, init);
        }
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);
        try {
            return await this.fetchImpl(url, { ...init, signal: controller.signal });
        }
        finally {
            clearTimeout(timer);
        }
    }
    _updateRateLimitState(response) {
        const limit = response.headers.get("X-RateLimit-Limit");
        const remaining = response.headers.get("X-RateLimit-Remaining");
        if (limit !== null && remaining !== null) {
            const parsedLimit = parseInt(limit, 10);
            const parsedRemaining = parseInt(remaining, 10);
            if (!isNaN(parsedLimit) && !isNaN(parsedRemaining)) {
                this._rateLimitState = { limit: parsedLimit, remaining: parsedRemaining };
            }
        }
    }
}
exports.Klozeo = Klozeo;
//# sourceMappingURL=client.js.map