import request from "./config.js"
export function getDetail(params,id){
	return request({
		url:"/v1/projects/"+id,
		header:{
			token: params.token
		}
	})
}
