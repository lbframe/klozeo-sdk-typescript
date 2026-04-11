import type { CompiledFilter } from "../types";
/**
 * Builder for text field filters.
 */
export declare class TextFilter {
    private readonly field;
    private readonly logic;
    constructor(field: string, logic: "and" | "or");
    /** Field equals value (case insensitive) */
    eq(value: string): CompiledFilter;
    /** Field not equals value */
    neq(value: string): CompiledFilter;
    /** Field contains substring */
    contains(value: string): CompiledFilter;
    /** Field does not contain substring */
    notContains(value: string): CompiledFilter;
    /** Field is null or empty */
    isEmpty(): CompiledFilter;
    /** Field has a value */
    isNotEmpty(): CompiledFilter;
}
/**
 * Builder for numeric field filters.
 */
export declare class NumberFilter {
    private readonly field;
    private readonly logic;
    constructor(field: string, logic: "and" | "or");
    /** Field equals value */
    eq(value: number): CompiledFilter;
    /** Field not equals value */
    neq(value: number): CompiledFilter;
    /** Field greater than value */
    gt(value: number): CompiledFilter;
    /** Field greater than or equal to value */
    gte(value: number): CompiledFilter;
    /** Field less than value */
    lt(value: number): CompiledFilter;
    /** Field less than or equal to value */
    lte(value: number): CompiledFilter;
}
/**
 * Builder for the `tags` array field.
 */
export declare class TagsFilter {
    private readonly logic;
    constructor(logic: "and" | "or");
    /** Tags array contains value */
    contains(value: string): CompiledFilter;
    /** Tags array does not contain value */
    notContains(value: string): CompiledFilter;
    /** Tags array is empty */
    isEmpty(): CompiledFilter;
    /** Tags array has items */
    isNotEmpty(): CompiledFilter;
}
/**
 * Builder for the `location` (latitude + longitude) field.
 */
export declare class LocationFilter {
    private readonly logic;
    constructor(logic: "and" | "or");
    /**
     * Within `km` kilometres of the given coordinates.
     * @param lat - Latitude
     * @param lng - Longitude
     * @param km - Radius in kilometres
     */
    withinRadius(lat: number, lng: number, km: number): CompiledFilter;
    /** Location coordinates are set */
    isSet(): CompiledFilter;
    /** Location coordinates are not set */
    isNotSet(): CompiledFilter;
}
/**
 * Builder for dynamic attribute filters (`attr:<name>`).
 */
export declare class AttrFilter {
    private readonly logic;
    private readonly field;
    constructor(name: string, logic: "and" | "or");
    /** Attribute equals text value (case insensitive) */
    eq(value: string): CompiledFilter;
    /** Attribute not equals text value */
    neq(value: string): CompiledFilter;
    /** Attribute contains substring */
    contains(value: string): CompiledFilter;
    /** Attribute equals numeric value */
    eqNumber(value: number): CompiledFilter;
    /** Attribute greater than value */
    gt(value: number): CompiledFilter;
    /** Attribute greater than or equal to value */
    gte(value: number): CompiledFilter;
    /** Attribute less than value */
    lt(value: number): CompiledFilter;
    /** Attribute less than or equal to value */
    lte(value: number): CompiledFilter;
}
/**
 * OR logic builder. Produces the same filter factories as the top-level
 * functions but with logic = "or".
 *
 * @example
 * or().city().eq("Paris")   // → "or.eq.city.Paris"
 */
export declare class OrBuilder {
    /** OR filter on the `name` field */
    name(): TextFilter;
    /** OR filter on the `city` field */
    city(): TextFilter;
    /** OR filter on the `country` field */
    country(): TextFilter;
    /** OR filter on the `state` field */
    state(): TextFilter;
    /** OR filter on the `category` field */
    category(): TextFilter;
    /** OR filter on the `source` field */
    source(): TextFilter;
    /** OR filter on the `email` field */
    email(): TextFilter;
    /** OR filter on the `phone` field */
    phone(): TextFilter;
    /** OR filter on the `website` field */
    website(): TextFilter;
    /** OR filter on the `rating` field */
    rating(): NumberFilter;
    /** OR filter on the `review_count` field */
    reviewCount(): NumberFilter;
    /** OR filter on the `tags` array field */
    tags(): TagsFilter;
    /** OR filter on the `location` field */
    location(): LocationFilter;
    /** OR filter on a custom attribute */
    attr(name: string): AttrFilter;
}
/** Filter on the lead `name` field (AND logic) */
export declare const name: () => TextFilter;
/** Filter on the `city` field (AND logic) */
export declare const city: () => TextFilter;
/** Filter on the `country` field (AND logic) */
export declare const country: () => TextFilter;
/** Filter on the `state` field (AND logic) */
export declare const state: () => TextFilter;
/** Filter on the `category` field (AND logic) */
export declare const category: () => TextFilter;
/** Filter on the `source` field (AND logic) */
export declare const source: () => TextFilter;
/** Filter on the `email` field (AND logic) */
export declare const email: () => TextFilter;
/** Filter on the `phone` field (AND logic) */
export declare const phone: () => TextFilter;
/** Filter on the `website` field (AND logic) */
export declare const website: () => TextFilter;
/** Filter on the `rating` field (AND logic) */
export declare const rating: () => NumberFilter;
/** Filter on the `review_count` field (AND logic) */
export declare const reviewCount: () => NumberFilter;
/** Filter on the `tags` array field (AND logic) */
export declare const tags: () => TagsFilter;
/** Filter on the `location` (coordinates) field (AND logic) */
export declare const location: () => LocationFilter;
/**
 * Filter on a custom dynamic attribute (AND logic).
 * @param name - Attribute name (e.g. "industry")
 */
export declare const attr: (name: string) => AttrFilter;
/**
 * Start an OR-logic filter chain.
 * @example
 * or().city().eq("Paris")
 */
export declare const or: () => OrBuilder;
//# sourceMappingURL=index.d.ts.map