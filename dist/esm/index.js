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
export { Klozeo } from "./client.js";
// Enum (value, not just type)
export { ExportFormat } from "./types.js";
// Error classes
export { KlozeoError, NotFoundError, UnauthorizedError, ForbiddenError, RateLimitedError, BadRequestError, } from "./errors.js";
// Attribute helpers
export { textAttr, numberAttr, boolAttr, listAttr, objectAttr, } from "./attribute-helpers.js";
//# sourceMappingURL=index.js.map