<template>
	<v-card flat tile
		color="transparent"
		min-height="100vh"
		class="name-preview"
	>
		<the-app-bar/>
		<v-card-text>
			<div class="author-name">
				Kiran Parajuli
			</div>
		</v-card-text>
		<v-card-text>
			<div class="author-bio">
				<div class="letter-qa">QA</div>
				<div class="char-pipe" />
				<div class="full-stack">Full Stack Software Engineer</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default {
	name: "NamePreview",
	components: {
		TheAppBar: () => import("@/components/TheAppBar")
	},
	mounted() {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".name-preview",
				pin: true,   // pin the trigger element while active
				start: "top top", // when the top of the trigger hits the top of the viewport
				end: "+=100", // end after scrolling 500px beyond the start
				scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
			}
		})
			.from(".letter-qa", {
				x: -50,
				duration: .75,
				opacity: 0
			})
			.from(".char-pipe", {
				rotate: 360,
				duration: 1,
				ease: "back",
				opacity: 0,
				marginLeft: "30px"
			})
			.from(".full-stack", {
				scale: 0,
				opacity: 0,
				ease: "ease",
				duration: .75,
			})
	}
}
</script>

<style scoped lang="scss">
.author-name {
	padding-top: 10vh;
	text-align: center;
	font-size: 4rem;
	line-height: 4.2rem;
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
		margin: 0 5px;
	}
}
</style>
