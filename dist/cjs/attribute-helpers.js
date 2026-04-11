"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textAttr = textAttr;
exports.numberAttr = numberAttr;
exports.boolAttr = boolAttr;
exports.listAttr = listAttr;
exports.objectAttr = objectAttr;
/**
 * Create a text attribute.
 * @example textAttr("industry", "Software")
 */
function textAttr(name, value) {
    return { name, type: "text", value };
}
/**
 * Create a numeric attribute.
 * @example numberAttr("employees", 500)
 */
function numberAttr(name, value) {
    return { name, type: "number", value };
}
/**
 * Create a boolean attribute.
 * @example boolAttr("verified", true)
 */
function boolAttr(name, value) {
    return { name, type: "bool", value };
}
/**
 * Create a list attribute.
 * @example listAttr("products", ["CRM", "ERP"])
 */
function listAttr(name, value) {
    return { name, type: "list", value };
}
/**
 * Create an object attribute.
 * @example objectAttr("social", { linkedin: "https://linkedin.com/company/acme" })
 */
function objectAttr(name, value) {
    return { name, type: "object", value };
}
//# sourceMappingURL=attribute-helpers.js.map