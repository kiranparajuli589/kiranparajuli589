<script setup lang="ts">
import Resume from "~/utils/resume";

const services = Resume.services;
</script>
<template>
	<section class="py-12">
		<h1 class="text-4xl font-bold">What can I do?</h1>
		<div class="text-sm text-gray-500">Service Offers</div>
		<div class="section-divider mb-12" />
		<div class="flex flex-wrap gap-4">
			<UCard
				v-for="(service, index) in services"
				:key="service.name"
				variant="subtle"
				class="grow w-full md:w-[calc(50%-0.5rem)] transition-all duration-200 hover:-translate-y-1"
				:class="'service-card service-' + index"
			>
				<template #header>
					<div class="flex items-center gap-2">
						<UIcon
							class="text-3xl"
							:name="'i-mdi-' + service.icon"
							:class="'text-' + service.iconColor"
						/>
						<h2 class="overflow-hidden text-ellipsis whitespace-nowrap m-0">
							{{ service.name }}
						</h2>
					</div>
				</template>

				<div class="pt-0 mb-4">
					<p class="mb-1">
						Experience:
						<span :class="'font-bold text-' + service.iconColor">{{
							service.experience
						}}</span>
						years
					</p>
				</div>

				<div class="mb-4">{{ service.description }}</div>

				<div v-if="service.types" class="mt-4">
					<div class="flex items-center gap-2 mb-3">
						<UIcon name="i-mdi-format-list-bulleted-type" class="text-xl" />
						<h3>Types:</h3>
					</div>
					{{ service.types.join(", ") }}.
				</div>
			</UCard>
		</div>
	</section>
</template>
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
		box-shadow:
			0 0 0 0.5rem var(--radiation-color-1),
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
		box-shadow:
			0 0 0 0.5rem var(--radiation-color-1),
			0 0 0 2rem var(--radiation-color-2),
			0 0 0 4rem var(--radiation-color-3);
		opacity: 1;
	}
	50% {
		box-shadow:
			0 0 0 1rem var(--radiation-color-1),
			0 0 0 3rem var(--radiation-color-2),
			0 0 0 5rem var(--radiation-color-3);
		opacity: 0.8;
	}
	100% {
		box-shadow:
			0 0 0 0.5rem var(--radiation-color-1),
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
