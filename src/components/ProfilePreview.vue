<template>
	<v-card flat tile
		color="teal darken-3" dark
		min-height="100vh"
		class="profile-preview"
	>
		<v-card flat tile height="300"
			color="teal darken-4"
			class="center-content"
		>
			<div class="section-header">Profile</div>
		</v-card>
		<div class="full-height">
			<div class="center-content py-6">
				<v-avatar size="300"
					class="profile-picture"
					color="white"
				>
					<v-img :src="picture"/>
				</v-avatar>
			</div>
			<div class="center-content">
				<div class="profile-info">
					<div class="profile-item d-flex align-center"
						v-for="(item, index) in profileItems"
						:key="index"
					>
						<div class="key">{{ item.key }}</div>
						<div class="separator" />
						<div class="value">{{ item.value }}</div>
					</div>
				</div>
			</div>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "ProfilePreview",
	data: () => ({
		picture: "https://avatars.githubusercontent.com/u/39373750?v=4",
		profileItems: [
			{key: "Name", value: "Kiran Parajuli"},
			{key: "Birthday", value: "November 12, 1998"},
			{key: "Titles", value: "Software Developer"},
			{key: "Location", value: "Pokhara, Nepal"},
		]
	}),
}
</script>
<style scoped lang="scss">
.profile-picture {
  border: 4px solid white;
}
.profile-info {
  .profile-item {
    padding: 10px 0;
    .key {
      font-size: 1rem;
      line-height: 1.2rem;
      width: 200px;
      text-align: right;
    }
    .value {
      font-size: 1.4rem;
      line-height: 1.6rem;
      width: 200px;
    }
    .separator {
      margin: 0 14px;
      height: 40px;
      width: 1px;
      background-color: white;
    }
  }
}
</style>
