<script lang="ts" setup>
import ToolBar from "@/components/home/ToolBar.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import Footer from "@/components/Footer.vue";
import SideBar from "@/components/home/SideBar.vue";
</script>
<template>
	<v-card variant="flat" class="home">
		<v-card
			variant="elevated"
			elevation="12"
			class="home--container"
			max-width="1200"
		>
			<ToolBar />
			<div class="home--content">
				<SideBar />
				<router-view />
			</div>
		</v-card>
		<ScrollTop />
		<Footer class="mt-10" />
	</v-card>
</template>
<style lang="scss">
@import "@/styles/home.scss";
</style>
