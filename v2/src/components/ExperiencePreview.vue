<template>
	<v-card flat tile
		min-height="100vh"
		color="primary lighten-2"
		class="experience-preview"
	>
		<v-card flat tile min-height="200"
			color="primary lighten-1"
			class="center-content"
		>
			<div class="section-header white--text">Experience</div>
		</v-card>
		<v-card-text>
			<div
				v-for="n in 2"
				:key="n"
				class="py-8 px-6"
			>
				<v-card elevation="8" max-width="800"
					min-height="300"
					class="d-flex justify-center align-center flex-wrap px-6 mx-auto"
				>
					<div class="py-8">
						<v-avatar color="grey" size="240" />
					</div>
					<div class="px-4"></div>
					<v-card class="px-2 pt-6 pb-12 full-height"
						max-width="400" flat
					>
						<div class="exp-title">
							<div class="company-name">Lorem Ipsum Dolar</div>
							<div class="pipe" />
							<div class="position">Met Setun</div>
						</div>
						<div class="exp-subtitle">
							Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus. Donec rutrum congue leo eget malesuada.
						</div>
					</v-card>
				</v-card>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "ExperiencePreview",
	data: () => ({}),
	computed: {},
	created() {
	},
	methods: {}
}
</script>

<style scoped lang="scss">
.exp-title {
	display: flex;
	align-items: center;
	.company-name {
		font-size: 1.4rem;
		line-height: 1.4rem;
	}
	.pipe {
		margin: 0 8px;
		height: 30px;
		width: 2px;
		background-color: darkslategrey;
	}
	.position {
		font-size: 1.4rem;
		line-height: 1.4rem;
		color: grey
	}
}
.exp-subtitle {
	padding-top: 10px;
	font-size: 1rem;
	line-height: 1.2rem;
}
.highlights {
	font-size: 1.2rem;
	line-height: 1.4rem;
}
.exp-highlight-content {
	font-size: .9rem;
	line-height: 1rem;
}
.exp-footnote {
	border-left: 3px solid #282c34;
	padding-left: 20px;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	background-color: #d4d4d4;
}
</style>
