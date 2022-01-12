<template>
	<v-card class="full-height"
		flat tile
		color="#ebebeb"
	>
		<name-preview />
		<profile-preview />
	</v-card>
</template>

<script>
import ProfilePreview from "@/components/ProfilePreview.vue"
export default {
	name: "HomeContent",
	components: {
		ProfilePreview,
		NamePreview: () => import("@/components/NamePreview")
	},
	data: () => ({}),
	computed: {},
	created() {
	},
	methods: {}
}
</script>

<style scoped lang="scss">

</style>
