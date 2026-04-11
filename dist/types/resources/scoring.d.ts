import type { ScoringRule, ScoringRuleListResult, CreateScoringRuleInput, UpdateScoringRuleInput, RecalculateScoreResult } from "../types";
import type { HttpClient } from "../client";
/**
 * Resource class for scoring rule and lead score operations.
 */
export declare class ScoringResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * List all scoring rules for this account.
     */
    listRules(): Promise<ScoringRuleListResult>;
    /**
     * Create a new scoring rule.
     */
    createRule(input: CreateScoringRuleInput): Promise<ScoringRule>;
    /**
     * Retrieve a single scoring rule by ID.
     */
    getRule(id: string): Promise<ScoringRule>;
    /**
     * Update a scoring rule. Only the supplied fields are changed.
     */
    updateRule(id: string, input: UpdateScoringRuleInput): Promise<void>;
    /**
     * Delete a scoring rule.
     */
    deleteRule(id: string): Promise<void>;
    /**
     * Recalculate and persist the score for a single lead.
     * Returns the new score value.
     */
    recalculate(leadId: string): Promise<RecalculateScoreResult>;
}
//# sourceMappingURL=scoring.d.ts.map