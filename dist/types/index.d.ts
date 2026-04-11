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
export { Klozeo } from "./client";
export type { Attribute, AttributeType, AttributeValue, CompiledFilter, SortField, Lead, CreateLeadInput, UpdateLeadInput, CreateResponse, LeadPage, ListOptions, ExportOptions, BatchCreatedItem, BatchErrorItem, BatchCreateResult, BatchResultItem, BatchResult, BatchUpdateInput, Note, NoteListResult, ScoringRule, CreateScoringRuleInput, UpdateScoringRuleInput, ScoringRuleListResult, RecalculateScoreResult, WebhookEvent, Webhook, CreateWebhookInput, WebhookListResult, KlozeoOptions, RateLimitState, } from "./types";
export { ExportFormat } from "./types";
export { KlozeoError, NotFoundError, UnauthorizedError, ForbiddenError, RateLimitedError, BadRequestError, } from "./errors";
export { textAttr, numberAttr, boolAttr, listAttr, objectAttr, } from "./attribute-helpers";
//# sourceMappingURL=index.d.ts.map