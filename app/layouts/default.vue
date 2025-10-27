<template>
	<div class="md:px-12 md:py-16">
		<div class="max-w-7xl w-full mx-auto bg-gray-200 md:rounded-2xl overflow-hidden shadow-2xl">
			<ToolBar />
			<div class="flex relative">
				<SideBar class="md:flex hidden" />
				<div class="md:pl-28 pl-8 py-8 pr-8">
					<NuxtPage />
				</div>
			</div>
			<ScrollTop />
			<Footer class="mt-10" />
		</div>
	</div>
</template>
<script lang="ts" setup>
import ToolBar from '~/components/home/ToolBar.vue'
import ScrollTop from '~/components/ScrollTop.vue'
import Footer from '~/components/Footer.vue'
import SideBar from '~/components/home/SideBar.vue'
</script>
