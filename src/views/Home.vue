<template>
	<div class="home">
		<v-card variant="elevated" elevation="12" class="home--container"
			max-width="1200"
		>
			<ToolBar />
			<div class="home--content">
				<SideBar />
				<IntroSection />
				<ServicesSection />
				<MyWorks />
			</div>
		</v-card>
	</div>
</template>
<script lang="ts" setup>

import ToolBar from "@/components/home/ToolBar.vue"
import SideBar from "@/components/home/SideBar.vue"
import IntroSection from "@/components/home/IntroSection.vue"
import ServicesSection from "@/components/home/ServicesSection.vue"
import MyWorks from "@/components/home/MyWorks.vue"
</script>
<style lang="scss">
@import "@/styles/home.scss";
</style>
