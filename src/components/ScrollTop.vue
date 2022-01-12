<template>
	<v-fab-transition>
		<v-btn
			v-show="fab"
			id="to-top"
			v-scroll="onScroll"
			fab dark
			fixed bottom
			right medium
			max-height="45"
			max-width="45"
			:color="color"
			@click="scrollToTop"
		>
			<v-icon size="20">
				{{ icon }}
			</v-icon>
		</v-btn>
	</v-fab-transition>
</template>

<script>
export default {
	name: "ScrollTop",
	data: () => ({
		fab:false,
		icon: "mdi-chevron-double-up",
		color: "grey darken-4"
	}),
	methods: {
		scrollToTop() {
			window.scroll({
				top: 0,
				behavior: "smooth"
			})
		},
		onScroll(e) {
			if (typeof window === "undefined") return
			const top = window.pageYOffset || e.target.scrollTop
			this.fab = top > 150
		}
	}
}
</script>
