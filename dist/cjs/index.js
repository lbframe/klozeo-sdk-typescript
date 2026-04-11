"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectAttr = exports.listAttr = exports.boolAttr = exports.numberAttr = exports.textAttr = exports.BadRequestError = exports.RateLimitedError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.KlozeoError = exports.ExportFormat = exports.Klozeo = void 0;
// Main client
var client_1 = require("./client");
Object.defineProperty(exports, "Klozeo", { enumerable: true, get: function () { return client_1.Klozeo; } });
// Enum (value, not just type)
var types_1 = require("./types");
Object.defineProperty(exports, "ExportFormat", { enumerable: true, get: function () { return types_1.ExportFormat; } });
// Error classes
var errors_1 = require("./errors");
Object.defineProperty(exports, "KlozeoError", { enumerable: true, get: function () { return errors_1.KlozeoError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return errors_1.NotFoundError; } });
Object.defineProperty(exports, "UnauthorizedError", { enumerable: true, get: function () { return errors_1.UnauthorizedError; } });
Object.defineProperty(exports, "ForbiddenError", { enumerable: true, get: function () { return errors_1.ForbiddenError; } });
Object.defineProperty(exports, "RateLimitedError", { enumerable: true, get: function () { return errors_1.RateLimitedError; } });
Object.defineProperty(exports, "BadRequestError", { enumerable: true, get: function () { return errors_1.BadRequestError; } });
// Attribute helpers
var attribute_helpers_1 = require("./attribute-helpers");
Object.defineProperty(exports, "textAttr", { enumerable: true, get: function () { return attribute_helpers_1.textAttr; } });
Object.defineProperty(exports, "numberAttr", { enumerable: true, get: function () { return attribute_helpers_1.numberAttr; } });
Object.defineProperty(exports, "boolAttr", { enumerable: true, get: function () { return attribute_helpers_1.boolAttr; } });
Object.defineProperty(exports, "listAttr", { enumerable: true, get: function () { return attribute_helpers_1.listAttr; } });
Object.defineProperty(exports, "objectAttr", { enumerable: true, get: function () { return attribute_helpers_1.objectAttr; } });
//# sourceMappingURL=index.js.map