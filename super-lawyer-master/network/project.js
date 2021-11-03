import request from "./config.js"

export function getProject(params,projectId){
	return request({
		url:'/v1/projects/' + projectId,
		header:{
			token:params.token
		}
	})
}

export function getProjects(params){
	return request({
		url:"/v1/projects",
		header:{
			token:params.token
		}
	})
}

export function getUnassigneded(params){
	return request({
		url:"/v1/projects/unassigned",
		header:{
			token:params.token
		}
	})
}

export function assign(lawyerId,projectId,params){
	//url拼接 否则参数传不过去
	return request({
		url:'/v1/projects/assign?lawyerId=' + lawyerId +'&projectId=' + projectId,
		method:'POST',
		header:{
			token:params.token,
			// ContentType:"application/json"
		}		
	})
}

export function agree(handleResult,projectId,params){
	return request({
		url:'/v1/projects/' + projectId + "?handleResult=" + handleResult,
		method:'POST',
		header:{
			token:params.token
		}
	})
}

export function createProject(params,projectDetail){
	console.log(projectDetail)	
	return request({
		url:'/v1/projects/commit',
		method:'POST',
		data:projectDetail,
		header:{
			'token':params.token,
			'content-type': 'application/json'
		},
		
	})
}