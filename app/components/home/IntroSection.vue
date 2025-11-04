<script setup lang="ts">
import Resume from "~/utils/resume";
const personalInfo = Resume.personalInfo;
</script>
<template>
	<UCard
		variant="subtle"
		:ui="{
			root: 'dark:!bg-gray-900',
		}"
	>
		<div class="flex gap-16 flex-wrap items-center">
			<div class="left-panel flex flex-col gap-2 basis-1/3">
				<div class="full-name text-5xl font-black uppercase">
					{{ personalInfo.name }}
				</div>
				<div class="title text-2xl font-bold">{{ personalInfo.role }}</div>
				<div class="subtitle">
					{{ personalInfo.bio }}
				</div>
				<a class="lets-talk" :href="'mailto:' + personalInfo.email">
					<span class="lets">let's</span>
					<span class="talk">talk</span>
				</a>
			</div>
			<div class="right-panel flex justify-center items-center p-4">
				<UAvatar
					size="160"
					src="/avatar.webp"
					alt="Kiran Parajuli - Frontend Developer"
					loading="eager"
				/>
			</div>
		</div>
	</UCard>
</template>

<style lang="scss" scoped>
.lets-talk {
	margin-top: 3rem;
	margin-left: 2rem;
	background-color: darkorange;
	color: white;
	border-radius: 50%;
	height: 4rem;
	width: 4rem;
	position: relative;
	outline: 20px solid orange;
	overflow: visible;

	animation: heartbeat 1.5s infinite;
	@keyframes heartbeat {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
	/* Add these properties for hover state handling */
	cursor: pointer;
	transition: transform 0.3s ease;

	.lets,
	.talk {
		position: absolute;
	}

	.lets {
		top: 0.6rem;
		left: 1rem;
	}

	.talk {
		top: 1.7rem;
		left: 1.5rem;
	}

	/* Position for the ripple elements */
	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: rgba(255, 165, 0, 0.3); /* subtle orange */
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		z-index: -1;
		pointer-events: none;
	}

	/* Hover state - start the animations */
	&:hover {
		transform: scale(1.05);

		&::before {
			animation: ripple 2s infinite ease-out;
		}

		&::after {
			animation: ripple 2s infinite ease-out 1s; /* Delayed start for second ripple */
		}
	}
}
</style>
