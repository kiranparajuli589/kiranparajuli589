<template>
	<button
		v-show="fab"
		id="to-top"
		@click="scrollToTop"
	>
		<mdi-chevron-double-up class="up-icon" />
	</button>
</template>

<script setup>
import {ref} from "vue"

const fab = ref(false)



const scrollToTop =  ()  => {
	window.scroll({
		top: 0,
		behavior: "smooth"
	})
}

const onScroll =  (e) => {
	if (typeof window === "undefined") return
	const top = window.pageYOffset || e.target.scrollTop
	fab.value = top > 150
}

window.onscroll = function (e) {
	console.log("here")
	onScroll(e)
}
</script>
<style lang="scss">
#to-top  {
	height: 45px;
	width: 45px;
	border-radius: 50%;
	color: white;
	background-color: #2e2e2e;
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	border: none;
	cursor: pointer;
	.up-icon {
		font-size: 1.1rem;
	}
}
</style>
