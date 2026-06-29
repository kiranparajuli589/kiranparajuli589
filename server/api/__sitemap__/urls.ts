import { parseSummary, slugFromKey } from "../../utils/blog";

// Feeds dynamic blog routes to @nuxtjs/sitemap. Static routes are
// auto-discovered by the module from the app's pages.
export default defineSitemapEventHandler(async () => {
	const siteUrl = useRuntimeConfig().public.siteUrl;
	const storage = useStorage("assets:server");

	const keys = (await storage.getKeys("blogBase")).filter((key) =>
		key.endsWith(".md"),
	);

	const urls = [];
	for (const key of keys) {
		const raw = await storage.getItem<string>(key);
		if (typeof raw !== "string") continue;
		const summary = parseSummary(slugFromKey(key), raw, siteUrl);
		if (!summary.title) continue;
		const lastmod = new Date(summary.date);
		urls.push({
			loc: `/blog/${summary.slug}`,
			...(Number.isNaN(lastmod.getTime())
				? {}
				: { lastmod: lastmod.toISOString() }),
		});
	}

	return urls;
});
