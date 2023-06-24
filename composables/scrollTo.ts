export default function useScrollTo() {
	const route = useRoute()

	function toWorks() {
		const works: HTMLElement = document.getElementById("works") as HTMLElement
		if (works) {
			works.scrollIntoView({behavior: "smooth"})
		}
	}

	function works(): void {
		if (route.name !== "index") {
			navigateTo('/').then(() => {
				setTimeout(() => {
					toWorks()
				}, 500)
			})
		} else {
			toWorks()
		}
	}

	function top(): void {
		window.scrollTo({top: 0, behavior: "smooth"})
	}

	return {works, top}
}
