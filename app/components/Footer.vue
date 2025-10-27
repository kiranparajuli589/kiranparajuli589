<template>
	<footer class="w-full">
		<UCard class="max-w-5xl mx-auto" variant="subtle" :ui="{root: 'rounded-b-none'}">
			<div class="first-row flex items-center justify-between pb-5 flex-wrap">
				<div class="my-name text-xl uppercase font-bold">Kiran</div>
				<div class="btn-grp flex flex-wrap gap-4 pl-16">
					<button class="btn cursor-pointer" @click="scrollTo.works()">Works</button>
					<button class="btn cursor-pointer" @click="navigateTo('/resume')">Resume</button>
					<button class="btn cursor-pointer" @click="navigateTo('/blogs')">Blog</button>
				</div>
				<div class="copyright text-sm">
					© {{ new Date().getFullYear() }} Kiran. All rights reserved.
				</div>
			</div>
			<div class="second-row flex h-3">
				<div class="red flex-1 bg-red-500 rounded-l" />
				<div class="orange flex-1 bg-orange-500" />
				<div class="light-orange flex-1 bg-orange-300" />
				<div class="indigo flex-1 bg-indigo-500 rounded-r" />
			</div>
		</UCard>
	</footer>
</template>
<script setup lang="ts">
import { useScrollTo } from '~/composables/scrollTo'

const scrollTo = useScrollTo()
</script>
