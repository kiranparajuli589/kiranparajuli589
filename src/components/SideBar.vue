<template>
	<div
		v-if="drawer"
		class="drawer"
	>
		<div class="resume">
			Resume
		</div>
		<div class="k-list">
			<div
				v-for="(item, index) in items"
				:key="index"
				class="k-list-item"
				@click="scrollToPreview(item.goTo)"
			>
				<div class="k-list-item-icon">
					<mdi-home />
				</div>
				<div class="k-list-item-title">
					{{ item.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {useStore} from "vuex"

const store = useStore()
import {computed} from "vue"

const items = [
	{name: "Home", icon: "mdi-home", goTo: ".name-preview"},
	{name: "Profile", icon: "mdi-account", goTo: ".profile-preview"},
	{name: "Experience", icon: "mdi-compass", goTo: ".experience-preview"},
	{name: "Projects", icon: "mdi-projector-screen"},
	{name: "Technologies", icon: "mdi-powershell"},
	{name: "Education", icon: "mdi-school"},
	{name: "Connect", icon: "mdi-share-variant"},
]
const drawer = computed({
	get: () => store.getters.drawerState,
	set: (v) => store.dispatch("setDrawer", !!v)
})
const scrollToPreview = (target) => {
	const $el = document.querySelector(target)
	if ($el) {
		$el.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest"
		})
	}
}
</script>

<style scoped lang="scss">
.drawer {
	position: sticky;
	top: 0;
	height: 100vh;
	overflow: hidden;
	width: 16rem;
	background-color: rgb(255 255 255 / 60%);
	.resume {
		font-size: 1.6rem;
		line-height: 1.8rem;
		font-weight: 600;
		padding: 20px 0 0 20px;
		color: grey;
	}
	.k-list {
		padding: 20px 12px;
		.k-list-item {
			display: flex;
			padding: 6px 2px;
			cursor: pointer;
			&:hover {
				background-color: #c3c3c3;
			}
			.k-list-item-icon  {
				padding-right: 6px;
				color: #1f1f1f;
			}
			.k-list-item-title {
				font-size: 1.2rem;
				line-height: 1.4rem;
				color: #363636;
			}
		}
	}
}
</style>
