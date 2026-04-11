"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = exports.attr = exports.location = exports.tags = exports.reviewCount = exports.rating = exports.website = exports.phone = exports.email = exports.source = exports.category = exports.state = exports.country = exports.city = exports.name = exports.OrBuilder = exports.AttrFilter = exports.LocationFilter = exports.TagsFilter = exports.NumberFilter = exports.TextFilter = void 0;
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
class TextFilter {
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
exports.TextFilter = TextFilter;
// ---------------------------------------------------------------------------
// Number filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for numeric field filters.
 */
class NumberFilter {
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
exports.NumberFilter = NumberFilter;
// ---------------------------------------------------------------------------
// Tags filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for the `tags` array field.
 */
class TagsFilter {
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
exports.TagsFilter = TagsFilter;
// ---------------------------------------------------------------------------
// Location filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for the `location` (latitude + longitude) field.
 */
class LocationFilter {
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
exports.LocationFilter = LocationFilter;
// ---------------------------------------------------------------------------
// Custom attribute filter builder
// ---------------------------------------------------------------------------
/**
 * Builder for dynamic attribute filters (`attr:<name>`).
 */
class AttrFilter {
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
exports.AttrFilter = AttrFilter;
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
class OrBuilder {
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
exports.OrBuilder = OrBuilder;
// ---------------------------------------------------------------------------
// Top-level factory functions (AND logic by default)
// ---------------------------------------------------------------------------
/** Filter on the lead `name` field (AND logic) */
const name = () => new TextFilter("name", "and");
exports.name = name;
/** Filter on the `city` field (AND logic) */
const city = () => new TextFilter("city", "and");
exports.city = city;
/** Filter on the `country` field (AND logic) */
const country = () => new TextFilter("country", "and");
exports.country = country;
/** Filter on the `state` field (AND logic) */
const state = () => new TextFilter("state", "and");
exports.state = state;
/** Filter on the `category` field (AND logic) */
const category = () => new TextFilter("category", "and");
exports.category = category;
/** Filter on the `source` field (AND logic) */
const source = () => new TextFilter("source", "and");
exports.source = source;
/** Filter on the `email` field (AND logic) */
const email = () => new TextFilter("email", "and");
exports.email = email;
/** Filter on the `phone` field (AND logic) */
const phone = () => new TextFilter("phone", "and");
exports.phone = phone;
/** Filter on the `website` field (AND logic) */
const website = () => new TextFilter("website", "and");
exports.website = website;
/** Filter on the `rating` field (AND logic) */
const rating = () => new NumberFilter("rating", "and");
exports.rating = rating;
/** Filter on the `review_count` field (AND logic) */
const reviewCount = () => new NumberFilter("review_count", "and");
exports.reviewCount = reviewCount;
/** Filter on the `tags` array field (AND logic) */
const tags = () => new TagsFilter("and");
exports.tags = tags;
/** Filter on the `location` (coordinates) field (AND logic) */
const location = () => new LocationFilter("and");
exports.location = location;
/**
 * Filter on a custom dynamic attribute (AND logic).
 * @param name - Attribute name (e.g. "industry")
 */
const attr = (name) => new AttrFilter(name, "and");
exports.attr = attr;
/**
 * Start an OR-logic filter chain.
 * @example
 * or().city().eq("Paris")
 */
const or = () => new OrBuilder();
exports.or = or;
//# sourceMappingURL=index.js.map