<template>
	<div class="item-list">
		<ul v-for="(list, listIndex) in dividedItems" :key="listIndex">
			<li v-for="(item, index) in list" :key="index">{{item}}</li>
<!--			<li>{{list}}</li>-->
		</ul>
	</div>
</template>
<script setup lang="ts">
import {computed} from "vue"

const props = defineProps({
	items: {
		type: Array,
		required: true
	},
	noSplit: {
		type: Boolean,
		default: false
	},
	maxItemsInAColumn: {
		type: Number,
		default: 4
	}
})

const dividedItems = computed(() => {
	if (props.noSplit) return [props.items]
	const maxItems = props.maxItemsInAColumn
	if (props.items.length <= maxItems) {
		return [props.items]
	} else {
		const dividedItems = []
		for (let i = 0; i < props.items.length; i += maxItems) {
			dividedItems.push(props.items.slice(i, i + maxItems))
		}
		return dividedItems
	}
})
</script>
<style lang="scss">
.item-list {
	display: flex;
	gap: 1rem;
	ul {
		li {
			margin-bottom: 1rem;
			margin-left: 1.5rem;
			width: fit-content;
		}
	}
}
</style>
