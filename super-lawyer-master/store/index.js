import Vue from 'vue'
import Vuex from 'vuex'

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
    actions: {}
})
export default store