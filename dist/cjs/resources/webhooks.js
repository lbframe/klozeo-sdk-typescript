"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksResource = void 0;
const utils_1 = require("../utils");
/**
 * Resource class for webhook subscription operations.
 */
class WebhooksResource {
    constructor(http) {
        this.http = http;
    }
    /**
     * List all webhooks for this account.
     */
    async list() {
        const raw = await this.http.request("GET", "/webhooks");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = raw;
        return {
            webhooks: (r.webhooks ?? []).map(utils_1.deserializeWebhook),
        };
    }
    /**
     * Create a new webhook subscription.
     * The `secret` field (if provided) is used only for payload signing and
     * is never returned by the API.
     */
    async create(input) {
        const raw = await this.http.request("POST", "/webhooks", { body: input });
        return (0, utils_1.deserializeWebhook)(raw);
    }
    /**
     * Delete a webhook subscription permanently.
     * @param id - UUID of the webhook to delete
     */
    async delete(id) {
        await this.http.request("DELETE", `/webhooks/${encodeURIComponent(id)}`);
    }
}
exports.WebhooksResource = WebhooksResource;
//# sourceMappingURL=webhooks.js.map