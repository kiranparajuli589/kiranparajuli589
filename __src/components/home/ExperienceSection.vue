<script setup lang="ts">
import Resume from "@/resume";
import { getAssetUrl } from "@/helper";
import ItemList from "@/components/home/ItemList.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/app";
const experiences = Resume.experiences;

const AppStore = useAppStore();

const { isDarkTheme } = storeToRefs(AppStore);
</script>
<template>
	<div class="home--experience">
		<h1 class="section-title">My Experiences</h1>
		<div class="section-subtitle">Where I had been engaged.</div>
		<div class="section-divider" />
		<v-card v-for="exp in experiences" :key="exp.company" class="mb-8">
			<v-card-title>
				{{ exp.roles.join(", ") }}
				<span class="mx-2">|</span>
				{{ exp.startDate }} - {{ exp.endDate }}
			</v-card-title>
			<v-card-subtitle class="list">
				<v-img
					height="20"
					width="auto"
					max-width="30"
					:src="getAssetUrl(exp.companyLogo)"
				/>
				<strong class="ellipses">{{ exp.company }}</strong>
				<a target="_blank" :href="exp.companyUrl" :title="exp.company">
					<v-icon size="x-small">mdi-open-in-new</v-icon>
				</a>
			</v-card-subtitle>
			<v-card-text>
				{{ exp.description }}
			</v-card-text>
			<v-card-text>
				<h2 class="mb-4">Achievements:</h2>
				<ItemList :items="exp.achievements" no-split />
			</v-card-text>
			<v-card-text>
				<h2 class="mb-4">Projects:</h2>
				<v-card
					v-for="proj in exp.projects"
					:key="proj.name"
					class="mb-6 pt-1 pb-2"
					variant="outlined"
				>
					<v-card-title class="list">
						<h4 class="ellipses" :title="proj.name">{{ proj.name }}</h4>
						<template v-if="proj.badge">
							<v-img
								v-if="isDarkTheme"
								height="35"
								max-width="130"
								:src="proj.badge.dark || proj.badge.default"
							/>
							<v-img
								v-else
								height="35"
								max-width="130"
								:src="proj.badge.light || proj.badge.default"
							/>
						</template>
						<a
							v-if="proj.url"
							target="_blank"
							:href="proj.url"
							:title="proj.name"
						>
							<v-icon size="x-small">mdi-open-in-new</v-icon>
						</a>
					</v-card-title>
					<v-divider class="mx-4" />
					<v-card-text>{{ proj.description }}</v-card-text>
					<v-card-text>
						<h3 class="mb-3">Responsibilities:</h3>
						<ItemList :items="proj.job" no-split />
					</v-card-text>
				</v-card>
			</v-card-text>
		</v-card>
	</div>
</template>
<style lang="scss" scoped>
.home--experience {
	.v-card-subtitle.list {
		gap: 0.3rem;
	}
	.v-card-subtitle {
		opacity: 1;
	}
}
</style>
