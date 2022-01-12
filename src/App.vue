<template>
	<v-app>
		<side-bar />
		<v-main>
			<home-content />
		</v-main>
		<scroll-top />
	</v-app>
</template>

<script>
import SideBar from "@/components/SideBar"
import HomeContent from "@/views/HomeContent"
import ScrollTop from "@/components/ScrollTop"
export default {
	name: "App",

	components: {
		SideBar,
		HomeContent,
		ScrollTop,
	}
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');
* {
  box-sizing: border-box;
  font-family: 'PT Sans', sans-serif;
}
</style>
