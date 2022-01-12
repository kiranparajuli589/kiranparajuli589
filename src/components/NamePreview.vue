<template>
	<v-card flat tile
		color="transparent"
		min-height="100vh"
		class="name-preview"
	>
		<the-app-bar />
		<v-card-text>
			<div class="author-name">
				Kiran Parajuli
			</div>
		</v-card-text>
		<v-card-text>
			<div class="author-bio">
				QA | Full Stack Software Engineer
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "NamePreview",
	components: {
		TheAppBar: () => import("@/components/TheAppBar")
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
  padding-top: 2vh;
  text-align: center;
  font-size: 1.6rem;
  line-height: 1.8rem;
}
</style>
