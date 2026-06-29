---
title: "The Day I Stopped Lying to TypeScript: Discriminated Unions"
date: 2026-06-23 10:00:00
tags: ["typescript", "discriminated-unions", "type-safety", "javascript", "frontend"]
---

I was building a simple data-fetching hook the other day when I wrote this interface:

```typescript
interface IResponse {
  status: "loading" | "error" | "success";
  error?: Error;
  data?: { id: string };
}
```

It looked clean. Three states. Optional fields where they belong. Ship it.

Then I typed this — and TypeScript said *nothing*:

```typescript
const response: IResponse = {
  status: "loading",
  error: new Error("Something went wrong"),
};
```

Wait. Why is `loading` allowed to carry an `error`?

I tried another one:

```typescript
const response: IResponse = {
  status: "error",
};
```

Also fine. An error state with no error. Useful.

And my favourite:

```typescript
const response: IResponse = {
  status: "success",
};
```

Success! …with no data. The type system was applauding.

## The Problem: One Shape, Many Invalid States

On paper, `IResponse` has **3** statuses. In practice, it allows **many more** invalid combinations:

| `status`   | `error` present? | `data` present? | Valid? |
|------------|------------------|-------------------|--------|
| `loading`  | no               | no                | ✅     |
| `loading`  | yes              | no                | ❌     |
| `loading`  | no               | yes               | ❌     |
| `error`    | yes              | no                | ✅     |
| `error`    | no               | no                | ❌     |
| `success`  | no               | yes               | ✅     |
| `success`  | no               | no                | ❌     |
| `success`  | yes              | yes               | ❌     |
| …          | …                | …                 | …      |

Optional properties (`?`) tell TypeScript *"this field might be missing."* They do **not** tell it *"this field must be missing when status is loading."*

So my UI code ended up defensive everywhere:

```typescript
if (response.status === "success" && response.data) {
  // Why do I need this extra check? I already checked success!
  console.log(response.data.id);
}
```

I wrote the types. Then I didn't trust them.

## Enter Discriminated Unions

A **discriminated union** (also called a **tagged union**) is a union of object types that share a common literal field — the **discriminant** — and each variant only allows the fields that make sense for that state.

I reformatted `IResponse` like this:

```typescript
type IResponse =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: { id: string } };
```

Same three states. Completely different guarantees.

- `loading` cannot have `error` or `data`
- `error` **must** have `error`
- `success` **must** have `data`

Now the broken examples from earlier are compile-time errors:

```typescript
// ❌ 'error' does not exist on type '{ status: "loading" }'
const a: IResponse = { status: "loading", error: new Error("nope") };

// ❌ Property 'error' is missing in type '{ status: "error" }'
const b: IResponse = { status: "error" };

// ❌ Property 'data' is missing in type '{ status: "success" }'
const c: IResponse = { status: "success" };
```

Voilà. The type now describes reality, not wishful thinking.

## The Magic: TypeScript Narrows the Type

The discriminant (`status`) is the key. When I branch on it, TypeScript **narrows** the union to exactly one variant:

```typescript
function render(response: IResponse) {
  switch (response.status) {
    case "loading":
      return "Spinner…";
    // response is { status: "loading" } here — no error, no data

    case "error":
      return response.error.message;
    // response is { status: "error"; error: Error } — error is guaranteed

    case "success":
      return response.data.id;
    // response is { status: "success"; data: { id: string } } — data is guaranteed
  }
}
```

No `response.data!`. No `if (response.error)`. The compiler knows what's on the object in each branch.

This pattern pairs well with **exhaustiveness checking**. If I add a new status later and forget to handle it in a `switch`, TypeScript will warn me (especially with a `never` fallback — more on that below).

## A Real-World Shape: API Results

Discriminated unions shine anywhere I model **mutually exclusive states**. A fetch helper might look like:

```typescript
type FetchResult<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: T };

async function loadUser(id: string): Promise<FetchResult<{ id: string; name: string }>> {
  return { status: "loading" };
  // … later: { status: "success", data: user } or { status: "error", error: err }
}
```

My components get a single type. My `switch` handles every case. The optional-chaining habit quietly retired.

## Bonus: Catch Missing Cases with `never`

I keep this helper at the bottom of a `switch` to get a compile error when a variant is unhandled:

```typescript
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function render(response: IResponse) {
  switch (response.status) {
    case "loading":
      return "Spinner…";
    case "error":
      return response.error.message;
    case "success":
      return response.data.id;
    default:
      return assertNever(response);
  }
}
```

If I add `{ status: "cancelled" }` to the union without updating `render`, TypeScript points at `assertNever(response)` and says: *"Hey, `cancelled` isn't `never`."*

## `interface` vs `type`

I started with an `interface` — that's fine for a single object shape. **Discriminated unions are almost always written with `type` and `|`**, because they compose multiple incompatible shapes into one name.

I can also model variants as separate interfaces united by a type alias:

```typescript
interface LoadingResponse {
  status: "loading";
}

interface ErrorResponse {
  status: "error";
  error: Error;
}

interface SuccessResponse {
  status: "success";
  data: { id: string };
}

type IResponse = LoadingResponse | ErrorResponse | SuccessResponse;
```

Same behaviour. Sometimes nicer for larger codebases.

## What I Took Away

The lesson wasn't "unions are cool." It was humbler than that:

**If two states shouldn't share the same fields, don't put them on the same object with optionals.**

Optional properties encode *absence*, not *exclusivity*. Discriminated unions encode *"in this state, these are the only fields that exist."*

That afternoon, I refactored a handful of `status` + optional-field types in my codebase. Each one had been lying — politely, with a question mark — about what was actually valid.

TypeScript was never the problem. My shape was.

---

*Got a `status` field and a pile of `?` properties in a type? That was my cue to reach for a discriminated union. My future self — and my `switch` statements — are glad I did.*
