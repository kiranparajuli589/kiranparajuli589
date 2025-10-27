<script setup lang="ts">
import { computed } from "vue";

interface Props {
	height?: number | string;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	height: 1,
	color: "#ababab",
});

const computedHeight = computed(() => {
	if (
		typeof props.height === "string" &&
		(props.height.endsWith("px") || props.height.endsWith("rem"))
	) {
		return props.height;
	} else {
		return `${props.height}px`;
	}
});
</script>
<template>
	<div class="divider" />
</template>
<style lang="scss">
.divider {
	height: v-bind(computedHeight);
	background-color: v-bind(color);
}
</style>
