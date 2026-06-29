---
title: Filtering 100k Invoices Efficiently in JavaScript
description: "Why Map is not magically faster than filter, and how to make filtering 100k invoices by year and month genuinely fast with indexing."
date: 2026-06-29 12:05:00
tags: ["JavaScript", "TypeScript", "React", "Performance", "Indexing", "Filtering"]
---

# Filtering 100k Invoices Efficiently in JavaScript

In frontend interviews, performance questions often sound simple at first:

> "You have a global array of 100k invoices. Write a function to filter invoices by `year`, and optionally by `month`. How would you make it fast?"

A primitive answer may jump straight into `array.filter`. A slightly better answer may say "use `Map` because it is faster." But a good answer is more careful:

> `Map` is not magically faster than `filter`. It becomes faster when we use it to avoid scanning the whole array repeatedly.

Let's break this down properly.

## The Problem
Assume we have invoices like this:

```typescript
type Invoice = {
	id: string;
	date: string;
	amount: number;
}

const invoices: Invoice[] = [
	{ id: "INV-1", date: "2026-01-15", amount: 1200 },
	{ id: "INV-2", date: "2026-02-10", amount: 800 },
	{ id: "INV-3", date: "2025-01-21", amount: 500 },
];
```

We need a function like:

```typescript
filterInvoices(2026);
filterInvoices(2026, 1);
```

Where:
- `year` is required number
- `month` is optional number
- returns an array of invoices
- invoice array may contain 100k+ invoices
- filtering may happen repeatedly in the UI

## The Simple Approach
The most direct solution is:
```typescript
function filterInvoices(year: number, month?: number): Invoice[] {
	return invoices.filter(invoice => {
		const date = new Date(invoice.date);
		const invoiceYear = date.getFullYear();
		const invoiceMonth = date.getMonth() + 1;
		return invoiceYear === year && (!month || invoiceMonth === month);
	});
}
```

This works. For a one-time operation, it may even be perfectly fine.

But there are two issues:
1. It scans all invoices every time.
2. It parses the date on every filter call.

For 100k records, this may still be acceptable once. But if the user often changes filters, searches repeatedly, switches months, or the component re-renders frequently, this becomes wasteful.

## The Real Performance Question
The real question is not:

> Is `filter` slower than `Map`?

The better question is:

> Can we avoid scanning 100k invoices every time?

That is where indexing helps.

## Better Approach: Pre-index by Year and Month
If invoices are filtered repeatedly, we can build an index only once.

A useful structure is:

```typescript
Map<year, Map<month, Invoice[]>>
```
Example:
```typescript
const invoiceIndex = new Map<number, Map<number, Invoice[]>>();
```
This gives us buckets like:
```text
2026 -> 1 -> [all invoices in 2026-01]
2026 -> 2 -> [all invoices in 2026-02]
2025 -> 1 -> [all invoices in 2025-01]
```

Now filtering by year and month becomes a direct lookup.

### Building the Index
```typescript
function buildInvoiceIndex(invoices: Invoice[]) {
	const index = new Map<number, Map<number, Invoice[]>>();
	for (const invoice of invoices) {
		const date = new Date(invoice.date);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		
		if (!index.has(year)) {
			index.set(year, new Map())
		}
		
		const monthMap = index.get(year)!;
		
		if (!monthMap.has(month)) {
			monthMap.set(month, []);
		}
		monthMap.get(month)!.push(invoice);
	}
	return index;
}
```

### Filtering with the index
```typescript
function filterInvoices(year: number, month?: number): Invoice[] {
	const monthMap = invoiceIndex.get(year);
	if (!monthMap) {
		return [];
	}
	if (!!month) {
		return monthMap.get(month) ?? [];
	}
	return Array.from(monthMap.values()).flat();
}
```

Now:

```typescript
filterInvoices(2026, 2);
```
Does not scan 100k records. It directly retries the February 2026 bucket.

## Complexity Comparison

| Approach           | First Setup       | Filter by Year/Month              | Best For                             |
|--------------------|-------------------|-----------------------------------|--------------------------------------|
| `arrary.filter`    | None              | O(n)                              | One-time or rare filtering operation |
| `Map<year, month>` | O(n) once         | Almost O(1) lookup \+ result size | Repeated filtering                   |
| Backend Filtering  | Depends on API/DB | Usually best for huge datasets    | Server backed apps                   |

## Important Optimization: Avoid Re-parsing Dates

if possible, normalize invoices when they enter the app:

```typescript
type NormalizedInvoice = {
	id: string;
	date: string;
	year: number;
	month: number;
	amount: number;
}
```
Then indexing becomes cheaper:
```typescript
function buildInvoiceIndex(invoices: NormalizedInvoice[]) {
  const index = new Map<number, Map<number, NormalizedInvoice[]>>();

  for (const invoice of invoices) {
    if (!index.has(invoice.year)) {
      index.set(invoice.year, new Map());
    }

    const monthMap = index.get(invoice.year)!;

    if (!monthMap.has(invoice.month)) {
      monthMap.set(invoice.month, []);
    }

    monthMap.get(invoice.month)!.push(invoice);
  }

  return index;
}
```
This avoids calling `new Date()` on every invoice during indexing or filtering.

## React Usage

In React, we should avoid rebuilding the index on every render.

Use `useMemo`:

```tsx
const invoiceIndex = useMemo(() => buildInvoiceIndex(invoices), [invoices]);
const filteredInvoices = useMemo(() => {
	return filterInvoices(invoiceIndex, selectedYear, selectedMonth);
}, [invoiceIndex, selectedYear, selectedMonth]);
```
And define the filter function separately (maybe even outside the component):
```typescript
function buildInvoiceIndex(invoices: NormalizedInvoice[]) {
  const index = new Map<number, Map<number, NormalizedInvoice[]>>();

  for (const invoice of invoices) {
    if (!index.has(invoice.year)) {
      index.set(invoice.year, new Map());
    }

    const monthMap = index.get(invoice.year)!;

    if (!monthMap.has(invoice.month)) {
      monthMap.set(invoice.month, []);
    }

    monthMap.get(invoice.month)!.push(invoice);
  }

  return index;
}
```

## What about Web Workers?
For large datasets, indexing is usually manageable in the main thread.

But if:
- invoices are a huge dataset
- the device is low-powered
- indexing causes UI freezing
- filtering involves expensive transformations

then a Web Worker can help move indexing/filtering off the main UI thread (not the first solution, but definitely an option to improve performance).

## What if Invoices change?
If invoices are static, build the index only once.
If invoices are updated frequently, think about the index maintenance:
- add invoice: insertion into the correct bucket
- delete invoice: removal from the correct bucket
- update invoice date: move invoice from old to correct bucket

Rebuilding the entire index every time may be fine for small changes, but incremental updates are better for large datasets.

## Conclusion

I would first clarify whether filtering happens once or repeatedly.
If it is a one-time filter, a simple array filter over 100k invoices may be acceptable after measuring.

But if users filter repeatedly by year and month, I would avoid scanning the full array every time. I would build an index once using `Map<year, Map<month, Invoice[]>>`.
Then filtering by year and optional month becomes a direct lookup instead of and O(n) scan.

I would also normalize year and month at once instead of parsing dates during every filter call. In React, I would
memoize the index with useMemo, and if building the index blocks the UI, I would consider lazy indexing or a Web Worker. Finally,
I would benchmark with the real dataset before over-optimizing.

## Key Takeaways
- `Map` is not automatically faster than `filter`.
- `Map` is powerful when it helps avoid repeated full-array scans.
- For one-time filtering, `array.filter()` is simple and often good enough.
- For repeated filtering, pre-index by year and month.
- Normalize expensive fields like date-derived year and month.
- In React, memoize derived indexes and filtered results.
- For very heavy workloads, consider Web Workers or backend filtering.
