<template>
	<div class="home-content full-height">
		<name-preview />
		<profile-preview />
		<experience-preview />
	</div>
</template>

<script setup>
import NamePreview from "../components/NamePreview"
import ProfilePreview from "../components/ProfilePreview"
import ExperiencePreview from "../components/ExperiencePreview"
</script>

<style scoped lang="scss">
.home-content {
	background-color: #ebebeb;
	box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
	-webkit-box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
	-moz-box-shadow: -4px 1px 19px -4px rgba(0,0,0,0.75) !important;
}
</style>
