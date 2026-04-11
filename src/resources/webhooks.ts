import type {
  Webhook,
  WebhookListResult,
  CreateWebhookInput,
} from "../types";
import { deserializeWebhook } from "../utils";
import type { HttpClient } from "../client";

/**
 * Resource class for webhook subscription operations.
 */
export class WebhooksResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all webhooks for this account.
   */
  async list(): Promise<WebhookListResult> {
    const raw = await this.http.request("GET", "/webhooks");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = raw as any;
    return {
      webhooks: (r.webhooks ?? []).map(deserializeWebhook),
    };
  }

  /**
   * Create a new webhook subscription.
   * The `secret` field (if provided) is used only for payload signing and
   * is never returned by the API.
   */
  async create(input: CreateWebhookInput): Promise<Webhook> {
    const raw = await this.http.request("POST", "/webhooks", { body: input });
    return deserializeWebhook(raw as Record<string, unknown>);
  }

  /**
   * Delete a webhook subscription permanently.
   * @param id - UUID of the webhook to delete
   */
  async delete(id: string): Promise<void> {
    await this.http.request("DELETE", `/webhooks/${encodeURIComponent(id)}`);
  }
}
