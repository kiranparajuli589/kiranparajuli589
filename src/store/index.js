import {createStore} from "vuex"

const store = createStore({
	state: () => ({
		drawer: null
	}),
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
	modules: {}
})

export default store
