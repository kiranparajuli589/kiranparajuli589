export const useScrollTo = () => {
	const top = () => {
		if (import.meta.client) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const works = () => {
		return navigateTo("/works");
	};

	return { works, top };
};
