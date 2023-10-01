<template>
	<div class="item-list">
		<ul v-for="(list, listIndex) in dividedItems" :key="listIndex">
			<li v-for="(item, index) in list" :key="index" v-html="item" />
		</ul>
	</div>
</template>
<script setup lang="ts">
import {computed} from "vue"
import {Tool} from "@/customTypes"

interface Props {
	items: string[],
	noSplit?: boolean,
	maxItemsInAColumn?: number
}

const props = withDefaults(defineProps<Props>(), {
	noSplit: false,
	maxItemsInAColumn: 4
})

const dividedItems = computed(() => {
	if (props.noSplit) return [props.items]
	const maxItems = props.maxItemsInAColumn
	if (props.items && props.items.length <= maxItems) {
		return [props.items]
	} else if (props.items) {
		const dividedItems = []
		for (let i = 0; i < props.items.length; i += maxItems) {
			dividedItems.push(props.items.slice(i, i + maxItems))
		}
		return dividedItems
	} else {
		return []
	}
})
</script>
<style lang="scss">
.item-list {
	display: flex;
	gap: 1rem;
	ul {
		li {
			margin-left: 1.5rem;
			width: fit-content;
		}
	}
}
</style>
