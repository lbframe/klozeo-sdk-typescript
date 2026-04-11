import type { CompiledFilter, SortField } from "./types";
import {
  KlozeoError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  RateLimitedError,
  BadRequestError,
} from "./errors";

/**
 * Append filter, sort, and pagination params to a URLSearchParams instance.
 */
export function buildQueryParams(
  params: URLSearchParams,
  opts: {
    filters?: CompiledFilter[];
    sortBy?: SortField;
    sortOrder?: "asc" | "desc";
    limit?: number;
    cursor?: string;
    format?: string;
  }
): void {
  if (opts.filters) {
    for (const f of opts.filters) {
      params.append("filter", f.toString());
    }
  }
  if (opts.sortBy !== undefined) {
    params.set("sort_by", opts.sortBy);
  }
  if (opts.sortOrder !== undefined) {
    params.set("sort_order", opts.sortOrder.toUpperCase());
  }
  if (opts.limit !== undefined) {
    params.set("limit", String(opts.limit));
  }
  if (opts.cursor !== undefined) {
    params.set("cursor", opts.cursor);
  }
  if (opts.format !== undefined) {
    params.set("format", opts.format);
  }
}

/**
 * Parse an API error response body and produce a typed KlozeoError.
 */
export async function parseError(
  response: Response
): Promise<KlozeoError> {
  const retryAfterHeader = response.headers.get("Retry-After");
  const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;

  let body: { error?: string; message?: string; code?: string } = {};
  try {
    body = await response.json();
  } catch {
    // non-JSON body — use status text
  }

  const message = body.message ?? body.error ?? response.statusText ?? "Unknown error";
  const code = body.code ?? body.error ?? "unknown";

  switch (response.status) {
    case 400:
      return new BadRequestError(message, code);
    case 401:
      return new UnauthorizedError(message, code);
    case 403:
      return new ForbiddenError(message, code);
    case 404:
      return new NotFoundError(message, code);
    case 429:
      return new RateLimitedError(message, retryAfter, code);
    default:
      return new KlozeoError(message, response.status, code);
  }
}

/**
 * Sleep for the given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Compute exponential back-off delay with jitter.
 * @param attempt - Zero-based attempt index.
 * @param baseMs - Base delay in milliseconds (default 500).
 */
export function backoffDelay(attempt: number, baseMs = 500): number {
  const exp = Math.min(attempt, 8); // cap exponent
  const delay = baseMs * Math.pow(2, exp);
  // add ±20% jitter
  const jitter = delay * 0.2 * (Math.random() * 2 - 1);
  return Math.round(delay + jitter);
}

/**
 * Convert a snake_case API lead object to a camelCase Lead.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deserializeLead(raw: Record<string, any>): import("./types.js").Lead {
  return {
    id: raw.id,
    name: raw.name,
    source: raw.source,
    score: raw.score ?? 0,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    lastInteractionAt: raw.last_interaction_at,
    description: raw.description,
    address: raw.address,
    city: raw.city,
    state: raw.state,
    country: raw.country,
    postalCode: raw.postal_code,
    latitude: raw.latitude,
    longitude: raw.longitude,
    phone: raw.phone,
    email: raw.email,
    website: raw.website,
    rating: raw.rating,
    reviewCount: raw.review_count,
    category: raw.category,
    tags: raw.tags,
    sourceId: raw.source_id,
    logoUrl: raw.logo_url,
    attributes: raw.attributes,
  };
}

/**
 * Convert a camelCase CreateLeadInput / UpdateLeadInput to the snake_case
 * body expected by the API.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeLeadInput(input: Record<string, any>): Record<string, any> {
  const out: Record<string, unknown> = {};
  const map: Record<string, string> = {
    postalCode: "postal_code",
    reviewCount: "review_count",
    sourceId: "source_id",
    logoUrl: "logo_url",
  };
  for (const [k, v] of Object.entries(input)) {
    if (v === undefined) continue;
    out[map[k] ?? k] = v;
  }
  return out;
}

/**
 * Deserialize a raw note object from the API.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deserializeNote(raw: Record<string, any>): import("./types.js").Note {
  return {
    id: raw.id,
    leadId: raw.lead_id,
    content: raw.content,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/**
 * Deserialize a raw scoring rule from the API.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deserializeScoringRule(raw: Record<string, any>): import("./types.js").ScoringRule {
  return {
    id: raw.id,
    name: raw.name,
    expression: raw.expression,
    priority: raw.priority ?? 0,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

/**
 * Deserialize a raw webhook from the API.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deserializeWebhook(raw: Record<string, any>): import("./types.js").Webhook {
  return {
    id: raw.id,
    url: raw.url,
    events: raw.events ?? [],
    active: raw.active ?? true,
    createdAt: raw.created_at,
  };
}
