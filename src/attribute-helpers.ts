import type { Attribute } from "./types";

/**
 * Create a text attribute.
 * @example textAttr("industry", "Software")
 */
export function textAttr(name: string, value: string): Attribute {
  return { name, type: "text", value };
}

/**
 * Create a numeric attribute.
 * @example numberAttr("employees", 500)
 */
export function numberAttr(name: string, value: number): Attribute {
  return { name, type: "number", value };
}

/**
 * Create a boolean attribute.
 * @example boolAttr("verified", true)
 */
export function boolAttr(name: string, value: boolean): Attribute {
  return { name, type: "bool", value };
}

/**
 * Create a list attribute.
 * @example listAttr("products", ["CRM", "ERP"])
 */
export function listAttr(name: string, value: string[]): Attribute {
  return { name, type: "list", value };
}

/**
 * Create an object attribute.
 * @example objectAttr("social", { linkedin: "https://linkedin.com/company/acme" })
 */
export function objectAttr(name: string, value: Record<string, unknown>): Attribute {
  return { name, type: "object", value };
}
