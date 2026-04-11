# @klozeo/sdk

Official TypeScript SDK for the [Klozeo](https://klozeo.com) API.

## Installation

```bash
npm install @klozeo/sdk
# or
pnpm add @klozeo/sdk
# or
yarn add @klozeo/sdk
```

**Requires:** Node.js 18+ or any modern browser (uses global `fetch`).

## Quick Start

```typescript
import { Klozeo, ExportFormat, textAttr, numberAttr } from "@klozeo/sdk";
import { city, rating, tags, or } from "@klozeo/sdk/filters";

const client = new Klozeo("sk_live_your_api_key");

// Create a lead
const resp = await client.leads.create({
  name: "Acme Corporation",
  source: "website",
  city: "San Francisco",
  email: "contact@acme.com",
  rating: 4.5,
  tags: ["enterprise", "saas"],
  attributes: [
    textAttr("industry", "Software"),
    numberAttr("employees", 500),
  ],
});
console.log(`Created: ${resp.id}${resp.duplicate ? " (merged)" : ""}`);

// List with filters
const page = await client.leads.list({
  filters: [city().eq("Berlin"), rating().gte(4.0)],
  sortBy: "rating",
  sortOrder: "desc",
  limit: 20,
});

// Iterate all pages automatically
for await (const lead of client.leads.iterate({ filters: [tags().contains("enterprise")] })) {
  console.log(lead.name);
}

// Export as CSV
const blob = await client.leads.export(ExportFormat.CSV, {
  filters: [city().eq("Paris")],
});
```

## Client Options

```typescript
const client = new Klozeo("sk_live_your_api_key", {
  baseUrl: "https://custom.api.com",  // default: https://app.klozeo.com/api/v1
  timeout: 30_000,                    // ms, default 30000
  maxRetries: 3,                      // retries on 429/5xx, default 3
  fetch: customFetch,                 // optional custom fetch
});
```

## Filters

Import filter helpers from `@klozeo/sdk/filters`:

```typescript
import { city, country, rating, reviewCount, tags, location, attr, or } from "@klozeo/sdk/filters";

// Text fields: name, city, country, state, category, source, email, phone, website
city().eq("Berlin")
city().contains("New")
email().isNotEmpty()

// Number fields: rating, reviewCount
rating().gte(4.0)
reviewCount().gt(100)

// Array field: tags
tags().contains("vip")
tags().isEmpty()

// Location
location().withinRadius(52.52, 13.405, 50)  // within 50 km

// Custom attributes
attr("industry").eq("Software")
attr("employees").gte(100)

// OR logic
or().city().eq("Paris")
or().city().eq("Berlin")
```

## Error Handling

```typescript
import { KlozeoError, NotFoundError, RateLimitedError, ForbiddenError } from "@klozeo/sdk";

try {
  await client.leads.get("cl_nonexistent");
} catch (err) {
  if (err instanceof NotFoundError) {
    console.log("Lead not found");
  } else if (err instanceof RateLimitedError) {
    console.log(`Retry after ${err.retryAfter}s`);
  } else if (err instanceof ForbiddenError) {
    console.log("Leads limit reached — upgrade your plan");
  } else if (err instanceof KlozeoError) {
    console.log(`HTTP ${err.statusCode} [${err.code}] ${err.message}`);
  }
}
```

## Resources

| Resource | Methods |
|---|---|
| `client.leads` | `create`, `get`, `update`, `delete`, `list`, `iterate`, `export`, `batchCreate`, `batchUpdate`, `batchDelete` |
| `client.notes` | `create`, `list`, `update`, `delete` |
| `client.scoring` | `listRules`, `createRule`, `getRule`, `updateRule`, `deleteRule`, `recalculate` |
| `client.webhooks` | `list`, `create`, `delete` |

## Rate Limit State

```typescript
const state = client.rateLimitState();
// { limit: 100, remaining: 87 } or null before first request
```

## Links

- API docs: https://docs.klozeo.com
- Dashboard: https://app.klozeo.com
