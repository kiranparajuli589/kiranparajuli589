<script setup>
import {computed, ref} from "vue"
import  {useStore}  from "vuex"

const store = useStore()

const drawer = computed(() => {
	return store.getters.drawerState
})

// eslint-disable-next-line no-undef
defineProps({
	msg: {
		type: String,
		default: ""
	}
})

const count = ref(0)
</script>

<template>
	<h1>{{ msg }}</h1>

	<div>
		---{{ drawer }}--
	</div>

	<i-mdi-account-box style="font-size: 2em; color: red" />

	<p>
		Recommended IDE setup:
		<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
		+
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
	</p>

	<p>
		<a href="https://vitejs.dev/guide/features.html" target="_blank">
			Vite Documentation
		</a>
		|
		<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
	</p>

	<button type="button" @click="increment">
		count is: {{ count }}
	</button>
	<p>
		Edit
		<code>components/HelloWorld.vue</code> to test hot module replacement.
	</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
