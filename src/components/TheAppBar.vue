<template>
	<v-app-bar flat>
		<div class="burger" @click="addRotate">
			<div id="top-bar"></div>
			<div id="mid-bar"></div>
			<div id="bottom-bar"></div>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: "TheAppBar",
	methods: {
		addRotate() {
			const topBar = document.getElementById("top-bar")
			const topBarRotateClass = "rotate-top"
			if (topBar.classList.contains(topBarRotateClass)) {
				topBar.classList.remove(topBarRotateClass)
			} else topBar.classList.add(topBarRotateClass)

			const bottomBar = document.getElementById("bottom-bar")
			const bottomBarRotateClass = "rotate-bottom"
			if (bottomBar.classList.contains(bottomBarRotateClass)) {
				bottomBar.classList.remove(bottomBarRotateClass)
			} else bottomBar.classList.add(bottomBarRotateClass)

			const midBar = document.getElementById("mid-bar")
			const hideClass = "hide"
			if (midBar.classList.contains(hideClass))  {
				midBar.classList.remove(hideClass)
			} else midBar.classList.add(hideClass)
		}
	}
}
</script>

<style scoped lang="scss">
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
