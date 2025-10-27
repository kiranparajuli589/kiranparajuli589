import {useRouter} from "vue-router"

export default function useScrollTo() {
	const router = useRouter()
	function toWorks() {
		const works: HTMLElement = document.getElementById("works") as HTMLElement
		if (works) {
			works.scrollIntoView({behavior: "smooth"})
		}
	}
	function works():void {
		if (router.currentRoute.value.name !== "Home") {
			router.push({name: "Home"})
				.then(() => toWorks())
				.catch(err => console.error(err))
		} else {
			toWorks()
		}
	}

	function top():void {
		window.scrollTo({top: 0, behavior: "smooth"})
	}
	return {works, top}
}
