<template>
	<v-navigation-drawer
		v-if="drawer"
		app permanent
		width="200"
		color="rgb(255 255 255 / 60%)"
	>
		<div class="resume grey--text">Resume</div>
		<v-list dense>
			<v-list-item v-for="(item, index) in items"
				:key="index"
				@click="scrollToPreview(item.goTo)"
				class="py-1"
			>
				<v-list-item-icon>
					<v-icon color="grey darken-4">{{item.icon}}</v-icon>
				</v-list-item-icon>
				<v-list-item-title>{{item.name}}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: "SideBar",
	data: () => ({
		items: [
			{name: "Home", icon: "mdi-home", goTo: ".name-preview"},
			{name: "Profile", icon: "mdi-account", goTo: ".profile-preview"},
			{name: "Experience", icon: "mdi-compass", goTo: ".experience-preview"},
			{name: "Projects", icon: "mdi-projector-screen"},
			{name: "Technologies", icon: "mdi-powershell"},
			{name: "Education", icon: "mdi-school"},
			{name: "Connect", icon: "mdi-share-variant"},
		]
	}),
	computed: {
		drawer: {
			get(){
				return this.$store.getters.drawerState
			},
			set(v) {
				this.$store.dispatch("setDrawer", !!v)
			}
		}
	},
	methods: {
		scrollToPreview(target) {
			this.$vuetify.goTo(target)
		}
	}
}
</script>

<style scoped lang="scss">
.resume {
  font-size: 22px;
  font-weight: 600;
  padding: 20px  0 0 20px;
}
::v-deep.v-list-item__title {
  font-size: 1.2rem !important;
  line-height: 1.4rem !important;
}
</style>
