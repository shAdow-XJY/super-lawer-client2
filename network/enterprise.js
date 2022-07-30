import request from "./config.js"
export function getEnterpriseDetail(params,id){
	return request({
		url:"/v1/enterprise/info/"+id,
		header:{
			token: params.token
		}
	})
}

export function uploadPaying(params,id,url){
	return request({
		url:'/v1/projects/'+ id +'/fee',
		method:'POST',
		header:{
			token: params.token,
			'content-type': 'application/x-www-form-urlencoded'
		},
		data:{
			feeUrl:url
		}
	})
}

export function confirmUploadPaying(params,id,result){
	return request({
		url:'/v1/projects/'+ id +'/fee-handle',
		method:'POST',
		header:{
			token: params.token,
			'content-type': 'application/x-www-form-urlencoded'
		},
		data:{
			handleResult:result
		}
	})
}