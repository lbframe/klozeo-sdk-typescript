import { deserializeWebhook } from "../utils.js";
/**
 * Resource class for webhook subscription operations.
 */
export class WebhooksResource {
    http;
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
            webhooks: (r.webhooks ?? []).map(deserializeWebhook),
        };
    }
    /**
     * Create a new webhook subscription.
     * The `secret` field (if provided) is used only for payload signing and
     * is never returned by the API.
     */
    async create(input) {
        const raw = await this.http.request("POST", "/webhooks", { body: input });
        return deserializeWebhook(raw);
    }
    /**
     * Delete a webhook subscription permanently.
     * @param id - UUID of the webhook to delete
     */
    async delete(id) {
        await this.http.request("DELETE", `/webhooks/${encodeURIComponent(id)}`);
    }
}
//# sourceMappingURL=webhooks.js.map