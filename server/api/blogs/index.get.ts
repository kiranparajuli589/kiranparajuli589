import { parseSummary, slugFromKey, type BlogSummary } from "../../utils/blog";

export default defineEventHandler(async (): Promise<BlogSummary[]> => {
	const siteUrl = useRuntimeConfig().public.siteUrl;
	const storage = useStorage("assets:server");

	const keys = (await storage.getKeys("blogBase")).filter((key) =>
		key.endsWith(".md"),
	);

	const summaries: BlogSummary[] = [];
	for (const key of keys) {
		const raw = await storage.getItem<string>(key);
		if (typeof raw !== "string") continue;
		const summary = parseSummary(slugFromKey(key), raw, siteUrl);
		if (!summary.title) continue;
		summaries.push(summary);
	}

	return summaries.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
});
