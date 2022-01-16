import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		drawer: null
	},
	getters: {
		drawerState: state => state.drawer
	},
	mutations: {
		SET_DRAWER: (state, value) => state.drawer = value
	},
	actions: {
		setDrawer({commit}, value) {
			commit("SET_DRAWER", value)
		}
	},
	modules: {
	}
})
