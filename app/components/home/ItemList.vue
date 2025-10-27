<script setup lang="ts">
import { computed } from "vue";

interface Props {
	items: string[];
	noSplit?: boolean;
	maxItemsInAColumn?: number;
}

const props = withDefaults(defineProps<Props>(), {
	noSplit: false,
	maxItemsInAColumn: 3,
});

const dividedItems = computed(() => {
	if (props.noSplit) return [props.items];
	const maxItems = props.maxItemsInAColumn;
	if (props.items && props.items.length <= maxItems) {
		return [props.items];
	} else if (props.items) {
		const dividedItems = [];
		for (let i = 0; i < props.items.length; i += maxItems) {
			dividedItems.push(props.items.slice(i, i + maxItems));
		}
		return dividedItems;
	} else {
		return [];
	}
});
</script>
<template>
	<div class="item-list flex gap-4">
		<ul v-for="(list, listIndex) in dividedItems" :key="listIndex">
			<li v-for="(item, index) in list" :key="index">{{ item }}</li>
		</ul>
	</div>
</template>
<style scoped>
.item-list ul li {
	margin-left: 1.5rem;
	width: fit-content;
}
</style>
