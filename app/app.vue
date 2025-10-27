<template>
  <UApp>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import { useAppStore, isDarkThemeSelected } from '~/composables/useAppStore'

const appStore = useAppStore()

onMounted(() => {
  handleTheme()
})

function handleTheme() {
  const isDark = isDarkThemeSelected()
  appStore.updateTheme(isDark)
  if (import.meta.client) {
    document.body.classList.toggle('dark', isDark)
  }
}
</script>

