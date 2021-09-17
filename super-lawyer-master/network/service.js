import request from "./config.js"
export function getServiceFangan(params){
	return request({
		"url":'/v1/service/',
		'header':{
			token:params.token
		}
	})
}