<template>
	<v-card class="home-content full-height"
		flat tile
		color="#ebebeb"
	>
		<name-preview />
		<profile-preview />
	</v-card>
</template>

<script>
export default {
	name: "HomeContent",
	components: {
		ProfilePreview: () => import("@/components/ProfilePreview"),
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
.home-content {
	box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
	-webkit-box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
	-moz-box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
}
</style>
