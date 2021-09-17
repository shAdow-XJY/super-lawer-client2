import request from "./config.js"

export function getMatters(params){
	return request({
		url:'/v1/matter',
		header:{
			token:params.token
		}
	})
}