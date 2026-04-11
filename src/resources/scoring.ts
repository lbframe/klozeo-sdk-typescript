import type {
  ScoringRule,
  ScoringRuleListResult,
  CreateScoringRuleInput,
  UpdateScoringRuleInput,
  RecalculateScoreResult,
} from "../types";
import { deserializeScoringRule } from "../utils";
import type { HttpClient } from "../client";

/**
 * Resource class for scoring rule and lead score operations.
 */
export class ScoringResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all scoring rules for this account.
   */
  async listRules(): Promise<ScoringRuleListResult> {
    const raw = await this.http.request("GET", "/scoring-rules");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = raw as any;
    return {
      rules: (r.rules ?? []).map(deserializeScoringRule),
    };
  }

  /**
   * Create a new scoring rule.
   */
  async createRule(input: CreateScoringRuleInput): Promise<ScoringRule> {
    const raw = await this.http.request("POST", "/scoring-rules", { body: input });
    return deserializeScoringRule(raw as Record<string, unknown>);
  }

  /**
   * Retrieve a single scoring rule by ID.
   */
  async getRule(id: string): Promise<ScoringRule> {
    const raw = await this.http.request("GET", `/scoring-rules/${encodeURIComponent(id)}`);
    return deserializeScoringRule(raw as Record<string, unknown>);
  }

  /**
   * Update a scoring rule. Only the supplied fields are changed.
   */
  async updateRule(id: string, input: UpdateScoringRuleInput): Promise<void> {
    await this.http.request("PUT", `/scoring-rules/${encodeURIComponent(id)}`, {
      body: input,
    });
  }

  /**
   * Delete a scoring rule.
   */
  async deleteRule(id: string): Promise<void> {
    await this.http.request("DELETE", `/scoring-rules/${encodeURIComponent(id)}`);
  }

  /**
   * Recalculate and persist the score for a single lead.
   * Returns the new score value.
   */
  async recalculate(leadId: string): Promise<RecalculateScoreResult> {
    const raw = await this.http.request(
      "POST",
      `/leads/${encodeURIComponent(leadId)}/score`
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = raw as any;
    return { id: r.id, score: r.score };
  }
}
