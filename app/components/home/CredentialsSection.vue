<script setup lang="ts">
import Resume from "~/utils/resume";
import { useAppStore } from "~/store/app.store";
import type { Credential } from "~/customTypes";

const props = withDefaults(
	defineProps<{
		compact?: boolean;
	}>(),
	{
		compact: false,
	},
);

const appStore = useAppStore();
const { isDarkTheme } = toRefs(appStore);
const credentials = Resume.credentials;

function getCredentialImageSrc(credential: Credential): string {
	if (credential.badge) {
		return (
			(isDarkTheme.value ? credential.badge.dark : credential.badge.light) ||
			credential.badge.default ||
			""
		);
	}

	return credential.image ?? "";
}
</script>

<template>
	<section v-if="credentials.length" :class="props.compact ? '' : 'py-12'">
		<template v-if="!props.compact">
			<h2 class="text-4xl font-bold">Recognition</h2>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Verified credentials and platform certifications.
			</div>
			<div class="section-divider mb-8" />
		</template>

		<div class="flex flex-wrap items-center gap-4">
			<component
				:is="credential.href ? 'a' : 'div'"
				v-for="credential in credentials"
				:key="credential.label"
				class="inline-flex items-center rounded-lg bg-gray-100 p-3 transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
				:class="props.compact ? 'p-2' : 'p-3'"
				:target="credential.href ? '_blank' : undefined"
				:rel="credential.href ? 'noopener noreferrer' : undefined"
				:href="credential.href"
				:title="credential.label"
			>
				<img
					class="h-auto w-auto object-contain rounded"
					loading="lazy"
					decoding="async"
					:src="getCredentialImageSrc(credential)"
					:alt="credential.label"
					:class="props.compact ? 'max-h-12' : 'max-h-16'"
				/>
			</component>
		</div>
	</section>
</template>
