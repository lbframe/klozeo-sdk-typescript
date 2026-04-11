/**
 * @klozeo/sdk — Official TypeScript SDK for the Klozeo API.
 *
 * @example
 * ```typescript
 * import { Klozeo, ExportFormat } from "@klozeo/sdk";
 * import { city, rating, or } from "@klozeo/sdk/filters";
 *
 * const client = new Klozeo("sk_live_your_api_key");
 *
 * const page = await client.leads.list({
 *   filters: [city().eq("Berlin"), rating().gte(4.0)],
 *   sortBy: "rating",
 *   sortOrder: "desc",
 * });
 * ```
 */

// Main client
export { Klozeo } from "./client";

// Types
export type {
  Attribute,
  AttributeType,
  AttributeValue,
  CompiledFilter,
  SortField,
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  CreateResponse,
  LeadPage,
  ListOptions,
  ExportOptions,
  BatchCreatedItem,
  BatchErrorItem,
  BatchCreateResult,
  BatchResultItem,
  BatchResult,
  BatchUpdateInput,
  Note,
  NoteListResult,
  ScoringRule,
  CreateScoringRuleInput,
  UpdateScoringRuleInput,
  ScoringRuleListResult,
  RecalculateScoreResult,
  WebhookEvent,
  Webhook,
  CreateWebhookInput,
  WebhookListResult,
  KlozeoOptions,
  RateLimitState,
} from "./types";

// Enum (value, not just type)
export { ExportFormat } from "./types";

// Error classes
export {
  KlozeoError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  RateLimitedError,
  BadRequestError,
} from "./errors";

// Attribute helpers
export {
  textAttr,
  numberAttr,
  boolAttr,
  listAttr,
  objectAttr,
} from "./attribute-helpers";
