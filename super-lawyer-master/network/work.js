import request from "./config.js"
// new代表新分配项目 running、end类推
export function getList(params,type){
	return request({
		url: '/v1/projects/?filter='+type,
		header:{
			token:params.token
		}
	})
}
