export default function useScrollTo() {
	function scrollToWorks():void {
		const works: HTMLElement = document.getElementById("works") as HTMLElement
		if (works) {
			works.scrollIntoView({behavior: "smooth"})
		}
		return
	}
	return {scrollToWorks}
}
