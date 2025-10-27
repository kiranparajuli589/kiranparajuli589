<template>
	<div class="home--services">
		<h1 class="section-title">What can I do?</h1>
		<div class="section-subtitle">Service Offers</div>
		<div class="section-divider"/>
		<div class="service-card--wrapper">
			<v-card
				v-for="(service, index) in services"
				:key="service.name" elevation="4"
				variant="elevated"
				:class="'service-card service-' + index"
			>
				<v-card-title class="list home--services--title">
					<v-icon :color="service.iconColor">mdi-{{ service.icon }}</v-icon>
					<h2 class="ellipses">{{ service.name }}</h2>
				</v-card-title>
				<v-card-text class="pt-0 experience">
					<p class="mb-1">Experience: <span class="exp">{{ service.experience }}</span> years</p>
				</v-card-text>
				<!-- eslint-disable-next-line -->
				<v-card-text v-html="service.description"/>
				<v-card-text v-if="service.types">
					<div class="list mb-3">
						<v-icon size="22">mdi-format-list-bulleted-type</v-icon>
						<h3>Types:</h3>
					</div>
					{{ service.types.join(", ") }}.
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script setup lang="ts">
import Resume from "@/resume"

const services = Resume.services
</script>
<style lang="scss" scoped>
.service-card {
	--radiation-pos: -0.7rem;
	flex-grow: 1;
	width: 100%;
	transition: transform 0.2s ease;

	@media only screen and (min-width: 768px) {
		width: calc(50% - 1rem);
	}

	&--wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	&::before {
		position: absolute;
		height: 3rem;
		aspect-ratio: 1/1;
		content: "";
		background-color: var(--radiation-color-1);
		border-radius: 50%;
		box-shadow: 0 0 0 0.5rem var(--radiation-color-1),
		0 0 0 2rem var(--radiation-color-2),
		0 0 0 4rem var(--radiation-color-3);
		transition: all 0.5s ease;
		z-index: -1;
	}

	// Adding hover effect
	&:hover {
		transform: translateY(-3px);

		&::before {
			animation: radiate 2s infinite ease-out;
		}
	}

	&.service-0 {
		--radiation-color-1: rgb(117, 117, 203, 1);
		--radiation-color-2: rgba(117, 117, 203, 0.4);
		--radiation-color-3: rgba(180, 180, 215, 0.4);

		&::before {
			right: var(--radiation-pos);
			bottom: var(--radiation-pos);
		}
	}

	&.service-1 {
		--radiation-color-1: rgb(41, 41, 166);
		--radiation-color-2: rgba(41, 41, 166, 0.8);
		--radiation-color-3: rgba(41, 41, 166, 0.4);

		&::before {
			top: var(--radiation-pos);
			right: var(--radiation-pos);
		}
	}

	&.service-2 {
		--radiation-color-1: rgb(17, 150, 17);
		--radiation-color-2: rgba(17, 150, 17, 0.5);
		--radiation-color-3: rgba(17, 150, 17, 0.4);

		&::before {
			right: var(--radiation-pos);
			top: var(--radiation-pos);
		}
	}

	&.service-3 {
		--radiation-color-1: rgba(138, 138, 141, 0.27);
		--radiation-color-2: rgba(138, 138, 141, 0.4);
		--radiation-color-3: rgba(138, 138, 141, 0.4);

		&::before {
			right: var(--radiation-pos);
			bottom: var(--radiation-pos);
		}
	}
}

// Radiation animation keyframes
@keyframes radiate {
	0% {
		box-shadow: 0 0 0 0.5rem var(--radiation-color-1),
		0 0 0 2rem var(--radiation-color-2),
		0 0 0 4rem var(--radiation-color-3);
		opacity: 1;
	}
	50% {
		box-shadow: 0 0 0 1rem var(--radiation-color-1),
		0 0 0 3rem var(--radiation-color-2),
		0 0 0 5rem var(--radiation-color-3);
		opacity: 0.8;
	}
	100% {
		box-shadow: 0 0 0 0.5rem var(--radiation-color-1),
		0 0 0 2rem var(--radiation-color-2),
		0 0 0 4rem var(--radiation-color-3);
		opacity: 1;
	}
}

// Add hover styles for better UX
.list {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.home--services--title {
	h2 {
		margin-bottom: 0;
	}
}

.experience {
	.exp {
		font-weight: bold;
		color: var(--radiation-color-1);
	}
}
</style>
