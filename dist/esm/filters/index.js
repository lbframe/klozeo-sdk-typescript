// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------
function makeFilter(logic, operator, field, value = "") {
    return {
        logic,
        operator,
        field,
        value,
        toString() {
            return value !== ""
                ? `${this.logic}.${this.operator}.${this.field}.${this.value}`
                : `${this.logic}.${this.operator}.${this.field}`;
        },
    };
}
// ---------------------------------------------------------------------------
// Text filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for text field filters.
 */
export class TextFilter {
    field;
    logic;
    constructor(field, logic) {
        this.field = field;
        this.logic = logic;
    }
    /** Field equals value (case insensitive) */
    eq(value) {
        return makeFilter(this.logic, "eq", this.field, value);
    }
    /** Field not equals value */
    neq(value) {
        return makeFilter(this.logic, "neq", this.field, value);
    }
    /** Field contains substring */
    contains(value) {
        return makeFilter(this.logic, "contains", this.field, value);
    }
    /** Field does not contain substring */
    notContains(value) {
        return makeFilter(this.logic, "not_contains", this.field, value);
    }
    /** Field is null or empty */
    isEmpty() {
        return makeFilter(this.logic, "is_empty", this.field);
    }
    /** Field has a value */
    isNotEmpty() {
        return makeFilter(this.logic, "is_not_empty", this.field);
    }
}
// ---------------------------------------------------------------------------
// Number filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for numeric field filters.
 */
export class NumberFilter {
    field;
    logic;
    constructor(field, logic) {
        this.field = field;
        this.logic = logic;
    }
    /** Field equals value */
    eq(value) {
        return makeFilter(this.logic, "eq", this.field, String(value));
    }
    /** Field not equals value */
    neq(value) {
        return makeFilter(this.logic, "neq", this.field, String(value));
    }
    /** Field greater than value */
    gt(value) {
        return makeFilter(this.logic, "gt", this.field, String(value));
    }
    /** Field greater than or equal to value */
    gte(value) {
        return makeFilter(this.logic, "gte", this.field, String(value));
    }
    /** Field less than value */
    lt(value) {
        return makeFilter(this.logic, "lt", this.field, String(value));
    }
    /** Field less than or equal to value */
    lte(value) {
        return makeFilter(this.logic, "lte", this.field, String(value));
    }
}
// ---------------------------------------------------------------------------
// Tags filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for the `tags` array field.
 */
export class TagsFilter {
    logic;
    constructor(logic) {
        this.logic = logic;
    }
    /** Tags array contains value */
    contains(value) {
        return makeFilter(this.logic, "array_contains", "tags", value);
    }
    /** Tags array does not contain value */
    notContains(value) {
        return makeFilter(this.logic, "array_not_contains", "tags", value);
    }
    /** Tags array is empty */
    isEmpty() {
        return makeFilter(this.logic, "array_empty", "tags");
    }
    /** Tags array has items */
    isNotEmpty() {
        return makeFilter(this.logic, "array_not_empty", "tags");
    }
}
// ---------------------------------------------------------------------------
// Location filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for the `location` (latitude + longitude) field.
 */
export class LocationFilter {
    logic;
    constructor(logic) {
        this.logic = logic;
    }
    /**
     * Within `km` kilometres of the given coordinates.
     * @param lat - Latitude
     * @param lng - Longitude
     * @param km - Radius in kilometres
     */
    withinRadius(lat, lng, km) {
        return makeFilter(this.logic, "within_radius", "location", `${lat},${lng},${km}`);
    }
    /** Location coordinates are set */
    isSet() {
        return makeFilter(this.logic, "is_set", "location");
    }
    /** Location coordinates are not set */
    isNotSet() {
        return makeFilter(this.logic, "is_not_set", "location");
    }
}
// ---------------------------------------------------------------------------
// Custom attribute filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for dynamic attribute filters (`attr:<name>`).
 */
export class AttrFilter {
    logic;
    field;
    constructor(name, logic) {
        this.logic = logic;
        this.field = `attr:${name}`;
    }
    /** Attribute equals text value (case insensitive) */
    eq(value) {
        return makeFilter(this.logic, "eq", this.field, value);
    }
    /** Attribute not equals text value */
    neq(value) {
        return makeFilter(this.logic, "neq", this.field, value);
    }
    /** Attribute contains substring */
    contains(value) {
        return makeFilter(this.logic, "contains", this.field, value);
    }
    /** Attribute equals numeric value */
    eqNumber(value) {
        return makeFilter(this.logic, "eq", this.field, String(value));
    }
    /** Attribute greater than value */
    gt(value) {
        return makeFilter(this.logic, "gt", this.field, String(value));
    }
    /** Attribute greater than or equal to value */
    gte(value) {
        return makeFilter(this.logic, "gte", this.field, String(value));
    }
    /** Attribute less than value */
    lt(value) {
        return makeFilter(this.logic, "lt", this.field, String(value));
    }
    /** Attribute less than or equal to value */
    lte(value) {
        return makeFilter(this.logic, "lte", this.field, String(value));
    }
}
// ---------------------------------------------------------------------------
// OR builder
// ---------------------------------------------------------------------------
/**
 * OR logic builder. Produces the same filter factories as the top-level
 * functions but with logic = "or".
 *
 * @example
 * or().city().eq("Paris")   // → "or.eq.city.Paris"
 */
export class OrBuilder {
    /** OR filter on the `name` field */
    name() {
        return new TextFilter("name", "or");
    }
    /** OR filter on the `city` field */
    city() {
        return new TextFilter("city", "or");
    }
    /** OR filter on the `country` field */
    country() {
        return new TextFilter("country", "or");
    }
    /** OR filter on the `state` field */
    state() {
        return new TextFilter("state", "or");
    }
    /** OR filter on the `category` field */
    category() {
        return new TextFilter("category", "or");
    }
    /** OR filter on the `source` field */
    source() {
        return new TextFilter("source", "or");
    }
    /** OR filter on the `email` field */
    email() {
        return new TextFilter("email", "or");
    }
    /** OR filter on the `phone` field */
    phone() {
        return new TextFilter("phone", "or");
    }
    /** OR filter on the `website` field */
    website() {
        return new TextFilter("website", "or");
    }
    /** OR filter on the `rating` field */
    rating() {
        return new NumberFilter("rating", "or");
    }
    /** OR filter on the `review_count` field */
    reviewCount() {
        return new NumberFilter("review_count", "or");
    }
    /** OR filter on the `tags` array field */
    tags() {
        return new TagsFilter("or");
    }
    /** OR filter on the `location` field */
    location() {
        return new LocationFilter("or");
    }
    /** OR filter on a custom attribute */
    attr(name) {
        return new AttrFilter(name, "or");
    }
}
// ---------------------------------------------------------------------------
// Top-level factory functions (AND logic by default)
// ---------------------------------------------------------------------------
/** Filter on the lead `name` field (AND logic) */
export const name = () => new TextFilter("name", "and");
/** Filter on the `city` field (AND logic) */
export const city = () => new TextFilter("city", "and");
/** Filter on the `country` field (AND logic) */
export const country = () => new TextFilter("country", "and");
/** Filter on the `state` field (AND logic) */
export const state = () => new TextFilter("state", "and");
/** Filter on the `category` field (AND logic) */
export const category = () => new TextFilter("category", "and");
/** Filter on the `source` field (AND logic) */
export const source = () => new TextFilter("source", "and");
/** Filter on the `email` field (AND logic) */
export const email = () => new TextFilter("email", "and");
/** Filter on the `phone` field (AND logic) */
export const phone = () => new TextFilter("phone", "and");
/** Filter on the `website` field (AND logic) */
export const website = () => new TextFilter("website", "and");
/** Filter on the `rating` field (AND logic) */
export const rating = () => new NumberFilter("rating", "and");
/** Filter on the `review_count` field (AND logic) */
export const reviewCount = () => new NumberFilter("review_count", "and");
/** Filter on the `tags` array field (AND logic) */
export const tags = () => new TagsFilter("and");
/** Filter on the `location` (coordinates) field (AND logic) */
export const location = () => new LocationFilter("and");
/**
 * Filter on a custom dynamic attribute (AND logic).
 * @param name - Attribute name (e.g. "industry")
 */
export const attr = (name) => new AttrFilter(name, "and");
/**
 * Start an OR-logic filter chain.
 * @example
 * or().city().eq("Paris")
 */
export const or = () => new OrBuilder();
//# sourceMappingURL=index.js.map