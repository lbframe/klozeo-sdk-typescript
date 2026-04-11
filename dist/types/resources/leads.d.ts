import type { Lead, CreateLeadInput, UpdateLeadInput, CreateResponse, LeadPage, ListOptions, ExportOptions, ExportFormat, BatchCreateResult, BatchResult, BatchUpdateInput } from "../types";
import type { HttpClient } from "../client";
/**
 * Resource class for all lead-related API operations.
 */
export declare class LeadsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Create a new lead. Returns a `CreateResponse` that includes the ID
     * and indicates whether an existing lead was merged (deduplication).
     */
    create(input: CreateLeadInput): Promise<CreateResponse>;
    /**
     * Retrieve a single lead by ID.
     */
    get(id: string): Promise<Lead>;
    /**
     * Update a lead. Only the supplied fields are changed.
     * Returns the full updated lead object.
     */
    update(id: string, input: UpdateLeadInput): Promise<Lead>;
    /**
     * Delete a lead permanently. Resolves when the deletion succeeds (204).
     */
    delete(id: string): Promise<void>;
    /**
     * List leads with optional filters, sorting, and cursor pagination.
     */
    list(opts?: ListOptions): Promise<LeadPage>;
    /**
     * Async iterator that automatically fetches all pages.
     *
     * @example
     * for await (const lead of client.leads.iterate({ filters: [city().eq("Berlin")] })) {
     *   console.log(lead.name);
     * }
     */
    iterate(opts?: Omit<ListOptions, "cursor">): AsyncGenerator<Lead>;
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
    export(format: ExportFormat, opts?: ExportOptions): Promise<Blob>;
    /**
     * Create up to 100 leads in a single request.
     * Returns per-item results including successes and failures.
     */
    batchCreate(leads: CreateLeadInput[]): Promise<BatchCreateResult>;
    /**
     * Apply the same partial update to up to 100 leads.
     */
    batchUpdate(input: BatchUpdateInput): Promise<BatchResult>;
    /**
     * Delete up to 100 leads in a single request.
     */
    batchDelete(ids: string[]): Promise<BatchResult>;
}
//# sourceMappingURL=leads.d.ts.map