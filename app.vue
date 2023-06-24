<template>
  <v-app :theme="theme">
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {computed, onMounted} from "vue"
import {isDarkThemeSelected} from "~/utils/helper"
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"

onMounted(() => {
  handleTheme()
})

const appStore = useAppStore()

function handleTheme() {
  const isDark = isDarkThemeSelected()
  appStore.updateTheme(isDark)
  document.body.classList.toggle("dark", isDark)
}

const {isDarkTheme} = storeToRefs(appStore)

const theme = computed(() => {
  return isDarkTheme.value ? "dark" : "light"
})
</script>
<style lang="scss">
@import "@/styles/main.scss";
</style>
