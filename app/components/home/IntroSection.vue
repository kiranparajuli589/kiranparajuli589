<script setup lang="ts">
import Resume from "~/utils/resume";
const personalInfo = Resume.personalInfo;
</script>
<template>
	<UCard variant="subtle" :ui="{}">
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
				<UAvatar size="300" src="/avatar.webp" alt="Kiran Parajuli" />
			</div>
		</div>
	</UCard>
</template>
