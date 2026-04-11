/**
 * Attribute value types supported by the API.
 */
export type AttributeValue =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>;

/**
 * Supported attribute types.
 */
export type AttributeType = "text" | "number" | "bool" | "list" | "object";

/**
 * A dynamic attribute attached to a lead.
 */
export interface Attribute {
  /** Unique identifier (returned by API) */
  id?: string;
  /** Attribute name */
  name: string;
  /** Attribute type */
  type: AttributeType;
  /** Attribute value */
  value: AttributeValue;
}

/**
 * A compiled filter ready to be serialized to a query string.
 */
export interface CompiledFilter {
  /** Filter logic: "and" or "or" */
  logic: "and" | "or";
  /** Filter operator (e.g. "eq", "gte", "array_contains") */
  operator: string;
  /** Field name (e.g. "city", "rating", "attr:industry") */
  field: string;
  /** Filter value (empty string for no-value operators like "is_empty") */
  value: string;
  /** Serialize to "logic.operator.field.value" */
  toString(): string;
}

/**
 * Sortable field names accepted by the API.
 */
export type SortField =
  | "name"
  | "city"
  | "country"
  | "state"
  | "category"
  | "source"
  | "email"
  | "phone"
  | "website"
  | "rating"
  | "review_count"
  | "created_at"
  | "updated_at"
  | "last_interaction_at"
  | `attr:${string}`;

/**
 * Export format options.
 */
export enum ExportFormat {
  CSV = "csv",
  JSON = "json",
  XLSX = "xlsx",
}

/**
 * A lead object as returned by the API.
 */
export interface Lead {
  /** Unique lead identifier (format: "cl_...") */
  id: string;
  /** Lead name */
  name: string;
  /** Lead source */
  source: string;
  /** Calculated score (0–100) */
  score: number;
  /** Unix timestamp of creation */
  createdAt: number;
  /** Unix timestamp of last structural update */
  updatedAt: number;
  /** Unix timestamp of last interaction or push */
  lastInteractionAt: number;

  /** Description */
  description?: string;
  /** Street address */
  address?: string;
  /** City */
  city?: string;
  /** State / province */
  state?: string;
  /** Country */
  country?: string;
  /** Postal code */
  postalCode?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Website URL */
  website?: string;
  /** Star rating (0–5) */
  rating?: number;
  /** Review count */
  reviewCount?: number;
  /** Category */
  category?: string;
  /** Tags array */
  tags?: string[];
  /** External source identifier */
  sourceId?: string;
  /** Logo URL */
  logoUrl?: string;
  /** Dynamic attributes */
  attributes?: Attribute[];
}

/**
 * Input for creating a new lead.
 */
export interface CreateLeadInput {
  /** Lead name (required) */
  name: string;
  /** Lead source (required) */
  source: string;
  /** Description */
  description?: string;
  /** Street address */
  address?: string;
  /** City */
  city?: string;
  /** State / province */
  state?: string;
  /** Country */
  country?: string;
  /** Postal code */
  postalCode?: string;
  /** Latitude */
  latitude?: number;
  /** Longitude */
  longitude?: number;
  /** Phone number */
  phone?: string;
  /** Email address */
  email?: string;
  /** Website URL */
  website?: string;
  /** Star rating (0–5) */
  rating?: number;
  /** Review count */
  reviewCount?: number;
  /** Category */
  category?: string;
  /** Tags array */
  tags?: string[];
  /** External source identifier */
  sourceId?: string;
  /** Logo URL */
  logoUrl?: string;
  /** Dynamic attributes */
  attributes?: Attribute[];
}

/**
 * Input for updating an existing lead. All fields are optional.
 */
export type UpdateLeadInput = Partial<Omit<CreateLeadInput, "name" | "source">> & {
  name?: string;
  source?: string;
};

/**
 * Response from a create-lead request.
 */
export interface CreateResponse {
  /** ID of the created or merged lead */
  id: string;
  /** Human-readable message */
  message: string;
  /** Unix timestamp of creation */
  createdAt: number;
  /** True if an existing lead was merged (deduplication hit) */
  duplicate?: boolean;
  /** ID of a potential low-confidence duplicate */
  potentialDuplicateId?: string;
}

/**
 * A page of leads returned by the list endpoint.
 */
export interface LeadPage {
  /** Leads in this page */
  leads: Lead[];
  /** Opaque cursor to fetch the next page (pass as `cursor` in the next call) */
  nextCursor?: string;
  /** True if more pages exist */
  hasMore: boolean;
  /** Number of leads in this page */
  count: number;
}

/**
 * Options for listing leads.
 */
export interface ListOptions {
  /** Filters to apply (AND / OR logic per filter) */
  filters?: CompiledFilter[];
  /** Field to sort by */
  sortBy?: SortField;
  /** Sort direction */
  sortOrder?: "asc" | "desc";
  /** Maximum number of results per page (default 50, max 1000) */
  limit?: number;
  /** Pagination cursor from a previous response */
  cursor?: string;
}

/**
 * Options for exporting leads.
 */
export interface ExportOptions {
  /** Filters to apply */
  filters?: CompiledFilter[];
  /** Field to sort by */
  sortBy?: SortField;
  /** Sort direction */
  sortOrder?: "asc" | "desc";
}

/**
 * One item in a batch-create result.
 */
export interface BatchCreatedItem {
  /** Zero-based index in the input array */
  index: number;
  /** Created lead ID */
  id: string;
  /** Unix timestamp */
  createdAt: number;
}

/**
 * One error in a batch-create result.
 */
export interface BatchErrorItem {
  /** Zero-based index in the input array */
  index: number;
  /** Error description */
  message: string;
}

/**
 * Response from a batch-create request.
 */
export interface BatchCreateResult {
  /** Successfully created items */
  created: BatchCreatedItem[];
  /** Failed items */
  errors: BatchErrorItem[];
  /** Total number of inputs */
  total: number;
  /** Number of successes */
  success: number;
  /** Number of failures */
  failed: number;
}

/**
 * One item in a batch-update or batch-delete result.
 */
export interface BatchResultItem {
  /** Zero-based index in the input array */
  index: number;
  /** Lead ID */
  id: string;
  /** True if the operation succeeded */
  success: boolean;
  /** Error description (only present when success is false) */
  message?: string;
}

/**
 * Response from a batch-update or batch-delete request.
 */
export interface BatchResult {
  /** Per-item results */
  results: BatchResultItem[];
  /** Total number of inputs */
  total: number;
  /** Number of successes */
  success: number;
  /** Number of failures */
  failed: number;
}

/**
 * Input for a batch-update request.
 */
export interface BatchUpdateInput {
  /** IDs of leads to update */
  ids: string[];
  /** Partial update to apply to all specified leads */
  data: UpdateLeadInput;
}

/**
 * A note attached to a lead.
 */
export interface Note {
  /** Unique note identifier (format: "note_...") */
  id: string;
  /** ID of the parent lead */
  leadId: string;
  /** Note content */
  content: string;
  /** Unix timestamp of creation */
  createdAt: number;
  /** Unix timestamp of last update */
  updatedAt: number;
}

/**
 * Response from a list-notes request.
 */
export interface NoteListResult {
  /** Notes for the lead */
  notes: Note[];
}

/**
 * A scoring rule object.
 */
export interface ScoringRule {
  /** Unique rule identifier */
  id: string;
  /** Rule name */
  name: string;
  /** Expression evaluated per lead */
  expression: string;
  /** Priority (lower = higher priority) */
  priority: number;
  /** Unix timestamp of creation */
  createdAt: number;
  /** Unix timestamp of last update */
  updatedAt: number;
}

/**
 * Input for creating a scoring rule.
 */
export interface CreateScoringRuleInput {
  /** Rule name */
  name: string;
  /** Scoring expression */
  expression: string;
  /** Priority (lower = higher priority, defaults to 0) */
  priority?: number;
}

/**
 * Input for updating a scoring rule. All fields are optional.
 */
export type UpdateScoringRuleInput = Partial<CreateScoringRuleInput>;

/**
 * Response from a list-scoring-rules request.
 */
export interface ScoringRuleListResult {
  /** All scoring rules for this account */
  rules: ScoringRule[];
}

/**
 * Response from a recalculate-score request.
 */
export interface RecalculateScoreResult {
  /** Lead ID */
  id: string;
  /** New calculated score */
  score: number;
}

/**
 * Supported webhook event types.
 */
export type WebhookEvent = "lead.created" | "lead.updated" | "lead.deleted";

/**
 * A webhook subscription object.
 */
export interface Webhook {
  /** Unique webhook identifier */
  id: string;
  /** Destination URL */
  url: string;
  /** Subscribed event types */
  events: WebhookEvent[];
  /** Whether the webhook is active */
  active: boolean;
  /** ISO timestamp of creation */
  createdAt: string;
}

/**
 * Input for creating a webhook.
 */
export interface CreateWebhookInput {
  /** Destination URL (required) */
  url: string;
  /** Event types to subscribe to */
  events?: WebhookEvent[];
  /** Optional signing secret */
  secret?: string;
}

/**
 * Response from a list-webhooks request.
 */
export interface WebhookListResult {
  /** All webhooks for this account */
  webhooks: Webhook[];
}

/**
 * Options for the Klozeo client.
 */
export interface KlozeoOptions {
  /** Override the API base URL (default: "https://app.klozeo.com/api/v1") */
  baseUrl?: string;
  /** Per-request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Maximum number of retries on 429 / 5xx (default: 3) */
  maxRetries?: number;
  /** Custom fetch implementation (defaults to global fetch) */
  fetch?: typeof fetch;
}

/**
 * Rate limit state updated from response headers.
 */
export interface RateLimitState {
  /** Maximum requests per window */
  limit: number;
  /** Remaining requests in the current window */
  remaining: number;
}
