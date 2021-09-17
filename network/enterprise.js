import request from "./config.js"
export function getEnterpriseDetail(params,id){
	return request({
		url:"/v1/enterprise/info/"+id,
		header:{
			token: params.token
		}
	})
}
