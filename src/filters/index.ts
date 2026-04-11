import type { CompiledFilter } from "../types";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function makeFilter(
  logic: "and" | "or",
  operator: string,
  field: string,
  value = ""
): CompiledFilter {
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
  constructor(
    private readonly field: string,
    private readonly logic: "and" | "or"
  ) {}

  /** Field equals value (case insensitive) */
  eq(value: string): CompiledFilter {
    return makeFilter(this.logic, "eq", this.field, value);
  }

  /** Field not equals value */
  neq(value: string): CompiledFilter {
    return makeFilter(this.logic, "neq", this.field, value);
  }

  /** Field contains substring */
  contains(value: string): CompiledFilter {
    return makeFilter(this.logic, "contains", this.field, value);
  }

  /** Field does not contain substring */
  notContains(value: string): CompiledFilter {
    return makeFilter(this.logic, "not_contains", this.field, value);
  }

  /** Field is null or empty */
  isEmpty(): CompiledFilter {
    return makeFilter(this.logic, "is_empty", this.field);
  }

  /** Field has a value */
  isNotEmpty(): CompiledFilter {
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
  constructor(
    private readonly field: string,
    private readonly logic: "and" | "or"
  ) {}

  /** Field equals value */
  eq(value: number): CompiledFilter {
    return makeFilter(this.logic, "eq", this.field, String(value));
  }

  /** Field not equals value */
  neq(value: number): CompiledFilter {
    return makeFilter(this.logic, "neq", this.field, String(value));
  }

  /** Field greater than value */
  gt(value: number): CompiledFilter {
    return makeFilter(this.logic, "gt", this.field, String(value));
  }

  /** Field greater than or equal to value */
  gte(value: number): CompiledFilter {
    return makeFilter(this.logic, "gte", this.field, String(value));
  }

  /** Field less than value */
  lt(value: number): CompiledFilter {
    return makeFilter(this.logic, "lt", this.field, String(value));
  }

  /** Field less than or equal to value */
  lte(value: number): CompiledFilter {
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
  constructor(private readonly logic: "and" | "or") {}

  /** Tags array contains value */
  contains(value: string): CompiledFilter {
    return makeFilter(this.logic, "array_contains", "tags", value);
  }

  /** Tags array does not contain value */
  notContains(value: string): CompiledFilter {
    return makeFilter(this.logic, "array_not_contains", "tags", value);
  }

  /** Tags array is empty */
  isEmpty(): CompiledFilter {
    return makeFilter(this.logic, "array_empty", "tags");
  }

  /** Tags array has items */
  isNotEmpty(): CompiledFilter {
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
  constructor(private readonly logic: "and" | "or") {}

  /**
   * Within `km` kilometres of the given coordinates.
   * @param lat - Latitude
   * @param lng - Longitude
   * @param km - Radius in kilometres
   */
  withinRadius(lat: number, lng: number, km: number): CompiledFilter {
    return makeFilter(this.logic, "within_radius", "location", `${lat},${lng},${km}`);
  }

  /** Location coordinates are set */
  isSet(): CompiledFilter {
    return makeFilter(this.logic, "is_set", "location");
  }

  /** Location coordinates are not set */
  isNotSet(): CompiledFilter {
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
  private readonly field: string;

  constructor(name: string, private readonly logic: "and" | "or") {
    this.field = `attr:${name}`;
  }

  /** Attribute equals text value (case insensitive) */
  eq(value: string): CompiledFilter {
    return makeFilter(this.logic, "eq", this.field, value);
  }

  /** Attribute not equals text value */
  neq(value: string): CompiledFilter {
    return makeFilter(this.logic, "neq", this.field, value);
  }

  /** Attribute contains substring */
  contains(value: string): CompiledFilter {
    return makeFilter(this.logic, "contains", this.field, value);
  }

  /** Attribute equals numeric value */
  eqNumber(value: number): CompiledFilter {
    return makeFilter(this.logic, "eq", this.field, String(value));
  }

  /** Attribute greater than value */
  gt(value: number): CompiledFilter {
    return makeFilter(this.logic, "gt", this.field, String(value));
  }

  /** Attribute greater than or equal to value */
  gte(value: number): CompiledFilter {
    return makeFilter(this.logic, "gte", this.field, String(value));
  }

  /** Attribute less than value */
  lt(value: number): CompiledFilter {
    return makeFilter(this.logic, "lt", this.field, String(value));
  }

  /** Attribute less than or equal to value */
  lte(value: number): CompiledFilter {
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
  name(): TextFilter {
    return new TextFilter("name", "or");
  }

  /** OR filter on the `city` field */
  city(): TextFilter {
    return new TextFilter("city", "or");
  }

  /** OR filter on the `country` field */
  country(): TextFilter {
    return new TextFilter("country", "or");
  }

  /** OR filter on the `state` field */
  state(): TextFilter {
    return new TextFilter("state", "or");
  }

  /** OR filter on the `category` field */
  category(): TextFilter {
    return new TextFilter("category", "or");
  }

  /** OR filter on the `source` field */
  source(): TextFilter {
    return new TextFilter("source", "or");
  }

  /** OR filter on the `email` field */
  email(): TextFilter {
    return new TextFilter("email", "or");
  }

  /** OR filter on the `phone` field */
  phone(): TextFilter {
    return new TextFilter("phone", "or");
  }

  /** OR filter on the `website` field */
  website(): TextFilter {
    return new TextFilter("website", "or");
  }

  /** OR filter on the `rating` field */
  rating(): NumberFilter {
    return new NumberFilter("rating", "or");
  }

  /** OR filter on the `review_count` field */
  reviewCount(): NumberFilter {
    return new NumberFilter("review_count", "or");
  }

  /** OR filter on the `tags` array field */
  tags(): TagsFilter {
    return new TagsFilter("or");
  }

  /** OR filter on the `location` field */
  location(): LocationFilter {
    return new LocationFilter("or");
  }

  /** OR filter on a custom attribute */
  attr(name: string): AttrFilter {
    return new AttrFilter(name, "or");
  }
}

// ---------------------------------------------------------------------------
// Top-level factory functions (AND logic by default)
// ---------------------------------------------------------------------------

/** Filter on the lead `name` field (AND logic) */
export const name = (): TextFilter => new TextFilter("name", "and");

/** Filter on the `city` field (AND logic) */
export const city = (): TextFilter => new TextFilter("city", "and");

/** Filter on the `country` field (AND logic) */
export const country = (): TextFilter => new TextFilter("country", "and");

/** Filter on the `state` field (AND logic) */
export const state = (): TextFilter => new TextFilter("state", "and");

/** Filter on the `category` field (AND logic) */
export const category = (): TextFilter => new TextFilter("category", "and");

/** Filter on the `source` field (AND logic) */
export const source = (): TextFilter => new TextFilter("source", "and");

/** Filter on the `email` field (AND logic) */
export const email = (): TextFilter => new TextFilter("email", "and");

/** Filter on the `phone` field (AND logic) */
export const phone = (): TextFilter => new TextFilter("phone", "and");

/** Filter on the `website` field (AND logic) */
export const website = (): TextFilter => new TextFilter("website", "and");

/** Filter on the `rating` field (AND logic) */
export const rating = (): NumberFilter => new NumberFilter("rating", "and");

/** Filter on the `review_count` field (AND logic) */
export const reviewCount = (): NumberFilter => new NumberFilter("review_count", "and");

/** Filter on the `tags` array field (AND logic) */
export const tags = (): TagsFilter => new TagsFilter("and");

/** Filter on the `location` (coordinates) field (AND logic) */
export const location = (): LocationFilter => new LocationFilter("and");

/**
 * Filter on a custom dynamic attribute (AND logic).
 * @param name - Attribute name (e.g. "industry")
 */
export const attr = (name: string): AttrFilter => new AttrFilter(name, "and");

/**
 * Start an OR-logic filter chain.
 * @example
 * or().city().eq("Paris")
 */
export const or = (): OrBuilder => new OrBuilder();
