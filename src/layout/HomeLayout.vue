<template>
	<div class="home">
		<v-card variant="elevated" elevation="12"
			class="home--container" max-width="1200"
		>
			<ToolBar />
			<SideBar />
			<div class="home--content">
				<router-view />
			</div>
		</v-card>
	</div>
</template>
<script lang="ts" setup>

import ToolBar from "@/components/home/ToolBar.vue"
import SideBar from "@/components/home/SideBar.vue"
</script>
<style lang="scss">
@import "@/styles/home.scss";
</style>
