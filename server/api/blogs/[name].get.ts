import { parseDetail, type BlogDetail } from "../../utils/blog";

export default defineEventHandler(async (event): Promise<BlogDetail> => {
	const name = getRouterParam(event, "name") ?? "";

	// Guard against path traversal / malformed slugs before building a key.
	if (!/^[a-z0-9_-]+$/i.test(name)) {
		throw createError({ statusCode: 404, statusMessage: "Blog not found" });
	}

	const siteUrl = useRuntimeConfig().public.siteUrl;
	const storage = useStorage("assets:server");
	const raw = await storage.getItem<string>(`blogBase/${name}.md`);

	if (typeof raw !== "string") {
		throw createError({ statusCode: 404, statusMessage: "Blog not found" });
	}

	const detail = parseDetail(name, raw, siteUrl);
	if (!detail.title) {
		throw createError({ statusCode: 404, statusMessage: "Blog not found" });
	}

	return detail;
});
