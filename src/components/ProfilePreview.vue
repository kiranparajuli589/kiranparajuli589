<template>
	<div class="profile-preview">
		<div class="center-content top-section">
			<div class="section-header teal--text">
				Profile
			</div>
		</div>
		<div class="full-height">
			<div class="center-content py-6">
				<div class="profile-picture">
					<img :src="picture" alt="profile">
				</div>
			</div>
			<div class="center-content">
				<div class="profile-info">
					<div
						v-for="(item, index) in profileItems"
						:key="index"
						class="profile-item d-flex align-center"
					>
						<div class="key">
							{{ item.key }}
						</div>
						<div class="separator" />
						<div class="value">
							{{ item.value }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
.profile-preview  {
	background-color: #3aa7a7;
	color: white;
	min-height: 100vh;
}
.top-section {
	min-height: 200px;
	background-color: #7ed7d7
}
.profile-picture {
	border: 4px solid white;
	background-color: white;
	height: 300px;
	width: 300px;
	border-radius: 50%;
	overflow: hidden;
	img {
		height: 100%;
		width: 100%;
	}
}

.profile-info {
	.profile-item {
		padding: 10px 0;
		color: #015b5b;

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
			background-color: #c3f4f4;
		}
	}
}
</style>
