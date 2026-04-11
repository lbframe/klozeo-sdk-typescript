"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsResource = void 0;
const utils_1 = require("../utils");
/**
 * Resource class for all lead-related API operations.
 */
class LeadsResource {
    constructor(http) {
        this.http = http;
    }
    /**
     * Create a new lead. Returns a `CreateResponse` that includes the ID
     * and indicates whether an existing lead was merged (deduplication).
     */
    async create(input) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = await this.http.request("POST", "/leads", {
            body: (0, utils_1.serializeLeadInput)(input),
        });
        return {
            id: raw.id,
            message: raw.message,
            createdAt: raw.created_at,
            duplicate: raw.duplicate,
            potentialDuplicateId: raw.potential_duplicate_id,
        };
    }
    /**
     * Retrieve a single lead by ID.
     */
    async get(id) {
        const raw = await this.http.request("GET", `/leads/${encodeURIComponent(id)}`);
        return (0, utils_1.deserializeLead)(raw);
    }
    /**
     * Update a lead. Only the supplied fields are changed.
     * Returns the full updated lead object.
     */
    async update(id, input) {
        const raw = await this.http.request("PUT", `/leads/${encodeURIComponent(id)}`, {
            body: (0, utils_1.serializeLeadInput)(input),
        });
        return (0, utils_1.deserializeLead)(raw);
    }
    /**
     * Delete a lead permanently. Resolves when the deletion succeeds (204).
     */
    async delete(id) {
        await this.http.request("DELETE", `/leads/${encodeURIComponent(id)}`);
    }
    /**
     * List leads with optional filters, sorting, and cursor pagination.
     */
    async list(opts = {}) {
        const params = new URLSearchParams();
        (0, utils_1.buildQueryParams)(params, opts);
        const raw = await this.http.request("GET", `/leads?${params.toString()}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = raw;
        return {
            leads: (r.leads ?? []).map(utils_1.deserializeLead),
            nextCursor: r.next_cursor,
            hasMore: r.has_more ?? false,
            count: r.count ?? 0,
        };
    }
    /**
     * Async iterator that automatically fetches all pages.
     *
     * @example
     * for await (const lead of client.leads.iterate({ filters: [city().eq("Berlin")] })) {
     *   console.log(lead.name);
     * }
     */
    async *iterate(opts = {}) {
        let cursor;
        do {
            const listOpts = { ...opts };
            if (cursor !== undefined)
                listOpts.cursor = cursor;
            const page = await this.list(listOpts);
            for (const lead of page.leads) {
                yield lead;
            }
            cursor = page.hasMore ? page.nextCursor : undefined;
        } while (cursor !== undefined);
    }
    /**
     * Export leads as CSV, JSON, or XLSX. Returns a `Blob`.
     *
     * @example
     * // Browser
     * const blob = await client.leads.export(ExportFormat.CSV);
     * const url = URL.createObjectURL(blob);
     *
     * // Node.js
     * const blob = await client.leads.export(ExportFormat.CSV);
     * writeFileSync("leads.csv", Buffer.from(await blob.arrayBuffer()));
     */
    async export(format, opts = {}) {
        const params = new URLSearchParams();
        (0, utils_1.buildQueryParams)(params, { ...opts, format });
        return this.http.requestBlob("GET", `/leads/export?${params.toString()}`);
    }
    /**
     * Create up to 100 leads in a single request.
     * Returns per-item results including successes and failures.
     */
    async batchCreate(leads) {
        const body = { leads: leads.map((l) => (0, utils_1.serializeLeadInput)(l)) };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = await this.http.request("POST", "/leads/batch", { body });
        return {
            created: (raw.created ?? []).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item) => ({ index: item.index, id: item.id, createdAt: item.created_at })),
            errors: raw.errors ?? [],
            total: raw.total ?? leads.length,
            success: raw.success ?? 0,
            failed: raw.failed ?? 0,
        };
    }
    /**
     * Apply the same partial update to up to 100 leads.
     */
    async batchUpdate(input) {
        const body = {
            ids: input.ids,
            data: (0, utils_1.serializeLeadInput)(input.data),
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = await this.http.request("PUT", "/leads/batch", { body });
        return {
            results: raw.results ?? [],
            total: raw.total ?? input.ids.length,
            success: raw.success ?? 0,
            failed: raw.failed ?? 0,
        };
    }
    /**
     * Delete up to 100 leads in a single request.
     */
    async batchDelete(ids) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = await this.http.request("DELETE", "/leads/batch", { body: { ids } });
        return {
            results: raw.results ?? [],
            total: raw.total ?? ids.length,
            success: raw.success ?? 0,
            failed: raw.failed ?? 0,
        };
    }
}
exports.LeadsResource = LeadsResource;
//# sourceMappingURL=leads.js.map