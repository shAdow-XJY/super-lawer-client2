import tabbar from "../../utils/tabbar.js"
const tabBar = {
	state:{
		role:'',
		tabBarList:[]
	},
	mutations:{
		setRole(state,role){
			let r = ";"
			state.role = role;
			switch(state.role){
				case '管理员': {
					r = 'admin'
					break
				}
				case '律师用户':{
					r = 'lawyer'
					break
				} 
				case '企业用户':{
					r = 'enterprise'
					break
				} 
			}
			state.tabBarList = tabbar[r]
		}
	}
}
export default tabBar