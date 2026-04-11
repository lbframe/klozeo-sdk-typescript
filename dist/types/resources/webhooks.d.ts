import type { Webhook, WebhookListResult, CreateWebhookInput } from "../types";
import type { HttpClient } from "../client";
/**
 * Resource class for webhook subscription operations.
 */
export declare class WebhooksResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all webhooks for this account.
     */
    list(): Promise<WebhookListResult>;
    /**
     * Create a new webhook subscription.
     * The `secret` field (if provided) is used only for payload signing and
     * is never returned by the API.
     */
    create(input: CreateWebhookInput): Promise<Webhook>;
    /**
     * Delete a webhook subscription permanently.
     * @param id - UUID of the webhook to delete
     */
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=webhooks.d.ts.map