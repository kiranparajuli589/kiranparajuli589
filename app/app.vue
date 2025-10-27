<template>
  <UApp>
		<div class="py-16">
			<div class="max-w-7xl w-full mx-auto bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
				<ToolBar />
				<div class="flex relative">
					<SideBar />
					<div class="pl-24 py-8 pr-8">
						<NuxtPage />
					</div>
				</div>
				<ScrollTop />
				<Footer class="mt-10" />
			</div>
		</div>
  </UApp>
</template>

<script lang="ts" setup>
import ToolBar from '~/components/home/ToolBar.vue'
import ScrollTop from '~/components/ScrollTop.vue'
import Footer from '~/components/Footer.vue'
import SideBar from '~/components/home/SideBar.vue'
import { useAppStore, isDarkThemeSelected } from '~/composables/useAppStore'

const appStore = useAppStore()

onMounted(() => {
  handleTheme()
})

function handleTheme() {
  const isDark = isDarkThemeSelected()
  appStore.updateTheme(isDark)
  if (process.client) {
    document.body.classList.toggle('dark', isDark)
  }
}
</script>

