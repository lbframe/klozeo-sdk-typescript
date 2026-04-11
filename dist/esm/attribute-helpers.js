/**
 * Create a text attribute.
 * @example textAttr("industry", "Software")
 */
export function textAttr(name, value) {
    return { name, type: "text", value };
}
/**
 * Create a numeric attribute.
 * @example numberAttr("employees", 500)
 */
export function numberAttr(name, value) {
    return { name, type: "number", value };
}
/**
 * Create a boolean attribute.
 * @example boolAttr("verified", true)
 */
export function boolAttr(name, value) {
    return { name, type: "bool", value };
}
/**
 * Create a list attribute.
 * @example listAttr("products", ["CRM", "ERP"])
 */
export function listAttr(name, value) {
    return { name, type: "list", value };
}
/**
 * Create an object attribute.
 * @example objectAttr("social", { linkedin: "https://linkedin.com/company/acme" })
 */
export function objectAttr(name, value) {
    return { name, type: "object", value };
}
//# sourceMappingURL=attribute-helpers.js.map