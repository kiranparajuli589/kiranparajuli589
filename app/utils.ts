export const getAssetUrl = (
	name: string,
	category?: "company" | "projects" | "tech",
): string => {
	if (category) {
		return `/${category}/${name}`;
	}
	return `/${name}`;
};
