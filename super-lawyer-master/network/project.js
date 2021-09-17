import request from "./config.js"

export function getProject(params,projectId){
	return request({
		url:'/v1/projects/' + projectId,
		header:{
			token:params.token
		}
	})
}