<template>
	<v-card variant="flat" class="home--intro">
		<div class="left-panel">
			<div class="full-name">{{personalInfo.name}}</div>
			<div class="title">{{ personalInfo.role }}</div>
			<div class="subtitle">
				{{personalInfo.bio}}
			</div>
			<a class="lets-talk" v-ripple :href="'mailto:' + personalInfo.email">
				<span class="lets">let's</span>
				<span class="talk">talk</span>
			</a>
		</div>
		<div class="right-panel">
			<v-avatar
				size="300" color="teal" variant="elevated" class="elevation-10"
				image="@/assets/avatar.webp"
			/>
		</div>
	</v-card>
</template>
<script setup lang="ts">
import Resume from "@/resume"
const personalInfo = Resume.personalInfo
</script>
