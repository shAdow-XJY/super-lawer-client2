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
			authLists:[
				{
					name:'企业认证'
				},
				{
					name:'律师认证'
				}
			]
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