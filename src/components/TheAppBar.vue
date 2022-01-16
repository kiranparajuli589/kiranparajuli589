<template>
	<v-app-bar flat class="app-bar"
		color="rgb(255 255 255 / 90%)"
	>
		<v-spacer />
		<div class="burger" @click="handleClick">
			<div id="top-bar"></div>
			<div id="mid-bar"></div>
			<div id="bottom-bar"></div>
		</div>
	</v-app-bar>
</template>

<script>
import {mapGetters} from "vuex"

export default {
	name: "TheAppBar",
	data: () => ({
		topBarRotateClass: "rotate-top",
		bottomBarRotateClass: "rotate-bottom",
		hideClass: "hide"
	}),
	computed: {
		...mapGetters({
			drawer: "drawerState"
		}),
		mdAndUp() {
			return this.$vuetify.breakpoint.mdAndUp
		}
	},
	created() {
		this.$store.dispatch("setDrawer", this.mdAndUp)
	},
	watch: {
		drawer(v) {
			if (v) this.addRotate()
			else this.removeRotate()
		},
		"$vuetify.breakpoint.width": {
			handler(v) {
				this.$store.dispatch("setDrawer", v > 800)
			}
		}
	},
	methods: {
		handleClick() {
			this.$store.dispatch("setDrawer", !this.drawer)
		},
		addRotate() {
			const topBar = document.getElementById("top-bar")
			if (!topBar.classList.contains(this.topBarRotateClass)) {
				topBar.classList.add(this.topBarRotateClass)
			}

			const bottomBar = document.getElementById("bottom-bar")
			if (!bottomBar.classList.contains(this.bottomBarRotateClass)) {
				bottomBar.classList.add(this.bottomBarRotateClass)
			}

			const midBar = document.getElementById("mid-bar")
			if (!midBar.classList.contains(this.hideClass))  {
				midBar.classList.add(this.hideClass)
			}
		},
		removeRotate() {
			const topBar = document.getElementById("top-bar")
			if (topBar.classList.contains(this.topBarRotateClass)) {
				topBar.classList.remove(this.topBarRotateClass)
			}

			const bottomBar = document.getElementById("bottom-bar")
			if (bottomBar.classList.contains(this.bottomBarRotateClass)) {
				bottomBar.classList.remove(this.bottomBarRotateClass)
			}

			const midBar = document.getElementById("mid-bar")
			if (midBar.classList.contains(this.hideClass))  {
				midBar.classList.remove(this.hideClass)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.app-bar {
	z-index: 1;
}
.burger {
	position: relative;
	height: 21px;
	width: 21px;
	#top-bar, #mid-bar, #bottom-bar {
		position: absolute;
		height: 3px;
		width: 100%;
		background-color: grey;
		border-radius: 24px;
		transition: all .25s linear;
	}
	#top-bar  {top: 0}
	#mid-bar {top: 8px}
	#bottom-bar {top: 16px}
	.rotate-top {
		top: 9px !important;
		transform: rotate(45deg);
	}
	.rotate-bottom {
		top: 11px !important;
		transform: rotate(-45deg);
	}
	.hide {
		opacity: 0
	}
}
</style>
