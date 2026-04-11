import type {
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  CreateResponse,
  LeadPage,
  ListOptions,
  ExportOptions,
  ExportFormat,
  BatchCreateResult,
  BatchResult,
  BatchUpdateInput,
} from "../types";
import {
  buildQueryParams,
  deserializeLead,
  serializeLeadInput,
} from "../utils";
import type { HttpClient } from "../client";

/**
 * Resource class for all lead-related API operations.
 */
export class LeadsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create a new lead. Returns a `CreateResponse` that includes the ID
   * and indicates whether an existing lead was merged (deduplication).
   */
  async create(input: CreateLeadInput): Promise<CreateResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await this.http.request("POST", "/leads", {
      body: serializeLeadInput(input as unknown as Record<string, unknown>),
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
  async get(id: string): Promise<Lead> {
    const raw = await this.http.request("GET", `/leads/${encodeURIComponent(id)}`);
    return deserializeLead(raw as Record<string, unknown>);
  }

  /**
   * Update a lead. Only the supplied fields are changed.
   * Returns the full updated lead object.
   */
  async update(id: string, input: UpdateLeadInput): Promise<Lead> {
    const raw = await this.http.request("PUT", `/leads/${encodeURIComponent(id)}`, {
      body: serializeLeadInput(input as Record<string, unknown>),
    });
    return deserializeLead(raw as Record<string, unknown>);
  }

  /**
   * Delete a lead permanently. Resolves when the deletion succeeds (204).
   */
  async delete(id: string): Promise<void> {
    await this.http.request("DELETE", `/leads/${encodeURIComponent(id)}`);
  }

  /**
   * List leads with optional filters, sorting, and cursor pagination.
   */
  async list(opts: ListOptions = {}): Promise<LeadPage> {
    const params = new URLSearchParams();
    buildQueryParams(params, opts);

    const raw = await this.http.request("GET", `/leads?${params.toString()}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = raw as any;
    return {
      leads: (r.leads ?? []).map(deserializeLead),
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
  async *iterate(
    opts: Omit<ListOptions, "cursor"> = {}
  ): AsyncGenerator<Lead> {
    let cursor: string | undefined;
    do {
      const listOpts: ListOptions = { ...opts };
      if (cursor !== undefined) listOpts.cursor = cursor;
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
  async export(format: ExportFormat, opts: ExportOptions = {}): Promise<Blob> {
    const params = new URLSearchParams();
    buildQueryParams(params, { ...opts, format });
    return this.http.requestBlob("GET", `/leads/export?${params.toString()}`);
  }

  /**
   * Create up to 100 leads in a single request.
   * Returns per-item results including successes and failures.
   */
  async batchCreate(leads: CreateLeadInput[]): Promise<BatchCreateResult> {
    const body = { leads: leads.map((l) => serializeLeadInput(l as unknown as Record<string, unknown>)) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await this.http.request("POST", "/leads/batch", { body });
    return {
      created: (raw.created ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => ({ index: item.index, id: item.id, createdAt: item.created_at })
      ),
      errors: raw.errors ?? [],
      total: raw.total ?? leads.length,
      success: raw.success ?? 0,
      failed: raw.failed ?? 0,
    };
  }

  /**
   * Apply the same partial update to up to 100 leads.
   */
  async batchUpdate(input: BatchUpdateInput): Promise<BatchResult> {
    const body = {
      ids: input.ids,
      data: serializeLeadInput(input.data as Record<string, unknown>),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await this.http.request("PUT", "/leads/batch", { body });
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
  async batchDelete(ids: string[]): Promise<BatchResult> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any = await this.http.request("DELETE", "/leads/batch", { body: { ids } });
    return {
      results: raw.results ?? [],
      total: raw.total ?? ids.length,
      success: raw.success ?? 0,
      failed: raw.failed ?? 0,
    };
  }
}
