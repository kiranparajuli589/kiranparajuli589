<template>
	<nav class="app-bar">
		<div class="burger" @click="handleClick">
			<div id="top-bar" />
			<div id="mid-bar" />
			<div id="bottom-bar" />
		</div>
	</nav>
</template>

<script setup>
import {computed, watch, onMounted} from "vue"
import {useStore} from "vuex"
const store = useStore()

const topBarRotateClass = "rotate-top"
const bottomBarRotateClass = "rotate-bottom"
const hideClass = "hide"

const drawer = computed(() => {
	return store.getters.drawerState
})

const vw = computed(()  => {
	return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
})

const mdAndUp = computed(() => {
	return vw.value > 800
})
watch(drawer, (v) => {
	if (v) addRotate()
	else removeRotate()
})
watch(vw, () => {
	store.dispatch("setDrawer", mdAndUp.value)
})

onMounted(() => {
	console.log(vw.value, mdAndUp.value)
	store.dispatch("setDrawer", mdAndUp.value)
})

const handleClick  = () => {
	store.dispatch("setDrawer", !drawer.value)
}
const addRotate = ()  => {
	const topBar = document.getElementById("top-bar")
	if (!topBar.classList.contains(topBarRotateClass)) {
		topBar.classList.add(topBarRotateClass)
	}

	const bottomBar = document.getElementById("bottom-bar")
	if (!bottomBar.classList.contains(bottomBarRotateClass)) {
		bottomBar.classList.add(bottomBarRotateClass)
	}

	const midBar = document.getElementById("mid-bar")
	if (!midBar.classList.contains(hideClass))  {
		midBar.classList.add(hideClass)
	}
}
const removeRotate    = () => {
	const topBar = document.getElementById("top-bar")
	if (topBar.classList.contains(topBarRotateClass)) {
		topBar.classList.remove(topBarRotateClass)
	}

	const bottomBar = document.getElementById("bottom-bar")
	if (bottomBar.classList.contains(bottomBarRotateClass)) {
		bottomBar.classList.remove(bottomBarRotateClass)
	}

	const midBar = document.getElementById("mid-bar")
	if (midBar.classList.contains(hideClass))  {
		midBar.classList.remove(hideClass)
	}
}
</script>

<style scoped lang="scss">
.app-bar {
	background-color: rgb(255 255 255 / 90%);
	z-index: 2;
	height: 3.6rem;
	padding: 5px 20px;
	display: flex;
	justify-content: end;
	align-items: center;
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
}
</style>
