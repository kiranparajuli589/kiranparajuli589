<template>
	<div>
		<IntroSection />
		<ServicesSection />
		<MyWorks />
	</div>
</template>
<script lang="ts" setup>
import IntroSection from "@/components/home/IntroSection.vue"
import ServicesSection from "@/components/home/ServicesSection.vue"
import MyWorks from "@/components/home/MyWorks.vue"
</script>
<style lang="scss">
@import "@/styles/home.scss";
</style>
