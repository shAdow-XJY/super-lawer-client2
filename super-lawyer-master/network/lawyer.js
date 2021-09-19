import request from "./config.js"

export function getLawyers(params){
	return request({
		url:'/v1/user/lawers',
		header:{
			token:params.token
		}
	})
	
}

export function getLawyerById(params,id){
	return request({
		url:'/v1/lawer/info/'+id,
		header:{
			token:params.token,
			
		}
	})
}
