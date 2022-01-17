<template>
	<div class="experience-preview">
		<div class="center-content top-section">
			<div class="section-header white--text">
				Experience
			</div>
		</div>
		<div class="pa-4">
			<div
				v-for="n in 2"
				:key="n"
				class="py-8 px-6"
			>
				<div class="exp-item">
					<div class="py-8">
						<div class="org-avatar" />
					</div>
					<div class="px-4" />
					<div class="exp-content">
						<div class="exp-title">
							<div class="company-name">
								Lorem Ipsum Dolar
							</div>
							<div class="pipe" />
							<div class="position">
								Met Setun
							</div>
						</div>
						<div class="exp-subtitle">
							Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Proin eget tortor risus. Donec rutrum congue leo eget malesuada.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
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
.experience-preview {
	min-height: 100vh;
	background-color: #3aa7a7;
	.top-section {
		min-height: 200px;
		background-color: #b3cff8
	}
	.exp-item {
		//elevation="8"
		max-width: 800px;
		min-height: 300px;
		padding: 0 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto auto;
		background-color: whitesmoke;
		@media only screen and (max-width: 630px) {
			flex-wrap: wrap;
			justify-content: center;
		}
		.org-avatar {
			height: 220px;
			width: 220px;
			border-radius: 50%;
			background-color: grey;
		}
		.exp-content {
			padding: 1.5rem 1rem 2rem 1rem;
			max-width:  400px;
			height: 100%;
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

		}
	}
}
</style>
