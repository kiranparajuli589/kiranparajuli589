<script setup>
import SideBar from "./components/SideBar"
import ScrollTop from "./components/ScrollTop"
import HomeContent from "./views/HomeContent"
</script>

<template>
	<div class="content">
		<side-bar />
		<div class="main">
			<home-content />
		</div>
		<scroll-top />
	</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
* {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	box-sizing: border-box;
	font-family: 'PT Sans', sans-serif;
	body {
		margin: 0;
	}
}
.content {
	display: flex;
	.drawer {}
	.main {
		width: 100%;
	}
}
</style>
