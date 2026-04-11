import type { Attribute } from "./types";
/**
 * Create a text attribute.
 * @example textAttr("industry", "Software")
 */
export declare function textAttr(name: string, value: string): Attribute;
/**
 * Create a numeric attribute.
 * @example numberAttr("employees", 500)
 */
export declare function numberAttr(name: string, value: number): Attribute;
/**
 * Create a boolean attribute.
 * @example boolAttr("verified", true)
 */
export declare function boolAttr(name: string, value: boolean): Attribute;
/**
 * Create a list attribute.
 * @example listAttr("products", ["CRM", "ERP"])
 */
export declare function listAttr(name: string, value: string[]): Attribute;
/**
 * Create an object attribute.
 * @example objectAttr("social", { linkedin: "https://linkedin.com/company/acme" })
 */
export declare function objectAttr(name: string, value: Record<string, unknown>): Attribute;
//# sourceMappingURL=attribute-helpers.d.ts.map