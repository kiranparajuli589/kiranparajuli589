<template>
	<v-footer class="footer">
		<v-card max-width="1000" class="mx-auto" variant="flat">
			<div class="first-row">
				<div class="my-name">Kiran</div>
				<div class="btn-grp">
					<div v-ripple class="btn" @click="scrollTo.works()">Works</div>
					<div v-ripple class="btn" @click="router.push({name: 'Resume'})">Resume</div>
					<div v-ripple class="btn" @click="router.push({name: 'Blogs'})">Blog</div>
				</div>
				<div class="copyright">
					© {{new Date().getFullYear() }} Kiran. All rights reserved.
				</div>
			</div>
			<div class="second-row">
				<div class="red" />
				<div class="orange" />
				<div class="light-orange" />
				<div class="indigo" />
			</div>
		</v-card>
	</v-footer>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"
import { useRouter } from "vue-router"

const scrollTo = useScrollTo()
const router = useRouter()
</script>
<style lang="scss">
.footer {
	width: 100%;
	display: block !important;
	font-size: .875rem;
	.first-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 1.2rem;
		flex-wrap: wrap;
		.my-name {
			font-size: 1.2rem;
			text-transform: uppercase;
		}
		.btn-grp {
			padding-left: 8rem;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			.btn {
				cursor: pointer;
			}
		}
	}
	.second-row {
		.red {background-color: #f84c4c
		}
		.orange {background-color: orange}
		.light-orange {background-color: lightcoral}
		.indigo {background-color: #710bbc
		}
		display: flex;
		height: 12px;
		div {
			flex-basis: 25%;
		}
		div:first-child {
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}
		div:last-child {
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}

	}
}
</style>
