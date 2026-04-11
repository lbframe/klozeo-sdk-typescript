import { deserializeScoringRule } from "../utils.js";
/**
 * Resource class for scoring rule and lead score operations.
 */
export class ScoringResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * List all scoring rules for this account.
     */
    async listRules() {
        const raw = await this.http.request("GET", "/scoring-rules");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = raw;
        return {
            rules: (r.rules ?? []).map(deserializeScoringRule),
        };
    }
    /**
     * Create a new scoring rule.
     */
    async createRule(input) {
        const raw = await this.http.request("POST", "/scoring-rules", { body: input });
        return deserializeScoringRule(raw);
    }
    /**
     * Retrieve a single scoring rule by ID.
     */
    async getRule(id) {
        const raw = await this.http.request("GET", `/scoring-rules/${encodeURIComponent(id)}`);
        return deserializeScoringRule(raw);
    }
    /**
     * Update a scoring rule. Only the supplied fields are changed.
     */
    async updateRule(id, input) {
        await this.http.request("PUT", `/scoring-rules/${encodeURIComponent(id)}`, {
            body: input,
        });
    }
    /**
     * Delete a scoring rule.
     */
    async deleteRule(id) {
        await this.http.request("DELETE", `/scoring-rules/${encodeURIComponent(id)}`);
    }
    /**
     * Recalculate and persist the score for a single lead.
     * Returns the new score value.
     */
    async recalculate(leadId) {
        const raw = await this.http.request("POST", `/leads/${encodeURIComponent(leadId)}/score`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = raw;
        return { id: r.id, score: r.score };
    }
}
//# sourceMappingURL=scoring.js.map