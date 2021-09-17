import Vue from 'vue'
import Vuex from 'vuex'
import tabBar from './modules/tabBar.js'
import getters from './getters.js'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			token: "",
			username: "",
			avatar: "",
			isLogin: false,
		},
    mutations: {
			
		},
    actions: {},
	modules:{
		tabBar
	},
	getters
})
export default store