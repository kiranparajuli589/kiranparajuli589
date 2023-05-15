<template>
	<div class="home--services">
		<h1 class="section-title">What can I do?</h1>
		<div class="section-subtitle">Service Offers</div>
		<div class="section-divider" />
		<div class="d-flex flex-wrap"  style="gap: 2rem;">
			<v-card v-for="service in services"
							:key="service.name" elevation="4"
							variant="elevated"
							max-width="460"
			>
				<v-card-title class="list home--services--title">
					<v-icon :color="service.iconColor">mdi-{{service.icon}}</v-icon>
					<h2 class="ellipses">{{service.name}}</h2>
				</v-card-title>
				<v-card-text class="pt-0 experience">
					<p class="mb-1">Experience: <span class="exp">{{service.experience}}</span> years</p>
				</v-card-text>
				<!-- eslint-disable-next-line -->
				<v-card-text v-html="service.description" />
				<v-card-text v-if="service.types">
					<div class="list mb-3">
						<v-icon size="22">mdi-format-list-bulleted-type</v-icon>
						<h3>Types:</h3>
					</div>
					{{service.types.join(', ')}}.
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script setup lang="ts">
import Resume from "@/resume"
const services = Resume.services
</script>
