<template>
	<div
		class="name-preview"
	>
		<the-app-bar />
		<div class="pa-4">
			<div class="author-name">
				Kiran Parajuli
			</div>
		</div>
		<div class="pa-4">
			<div class="author-bio">
				<div class="letter-qa">
					QA
				</div>
				<div class="char-pipe" />
				<div class="full-stack">
					Full Stack Software Engineer
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {onMounted} from "vue"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import TheAppBar from "./TheAppBar.vue"
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
	gsap.timeline({
		scrollTrigger: {
			trigger: ".home-content",
			pin: false,   // pin the trigger element while active
			start: "top top", // when the top of the trigger hits the top of the viewport
			end: "+=5", // end after scrolling 500px beyond the start
			scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
		}
	})
		.from(".letter-qa", {
			x: -50,
			duration: .5,
			opacity: 0
		})
		.from(".char-pipe", {
			rotate: 360 * 2,
			duration: 2,
			ease: "back",
			opacity: 0,
			x: -100
		})
		.from(".full-stack", {
			scale: 0,
			opacity: 0,
			ease: "ease",
			duration: .75,
		})
})
</script>

<style scoped lang="scss">
.name-preview {
	min-height: 100vh;
	background-color: transparent;
}
.author-name {
	padding-top: 10vh;
	text-align: center;
	font-size: 4rem;
	line-height: 4.2rem;
	font-weight: 600;
	color: #2c3e50;
}

.author-bio {
	display: flex;
	align-items: center;
	justify-content: center;

	padding-top: 2vh;
	text-align: center;
	font-size: 1.6rem;
	line-height: 1.8rem;
	.char-pipe {
		width: 2px;
		background-color: grey;
		height: 32px;
		margin: 0 15px;
	}
}
</style>
