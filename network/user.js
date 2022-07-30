import request from "./config.js"

export function postLogin(params){
	return request({
		url: "/v1/user/login?passport=" + params.passport+"&pwd="+params.pwd,
		method:"POST"
	})
}

export function register(params)
{
	return request({
		url:"/v1/user/register",
		method:"POST",
		data:params
	})
}

export function sendCheckCode(params)
{
	return request({
		url:"/v1/user/check-code/send?mail="+params.mail,
		method:"POST"
	})
}

export function getInfo(params)
{
	return request({
		url:"/v1/user/info",
		header:{
			token: params.token,
			'content-type': 'application/json'
		},		
	})
}

export function enterpriseApply(params)
{
	return request({
		url:"/v1/user/auth/enterprise",
		method:"POST",
		data:params,
		header:{
			token: params.token,
			'content-type': 'application/json'
		}
	})
}

export function authList(params)
{
	return request({
		url:"/v1/user/auth/list",
		header:{
			token:params.token
		}
	})
	
}

export function getAuthDetail(params,data){
	return request({
		url:"/v1/user/auth/info/detail",
		data,
		header:{
			token:params.token
		}
	})
}

export function confirm(params,data){
	return request({
		url:"/v1/user/auth",
		data,
		method:'POST',
		header:{
			token:params.token,
			'content-type': 'application/x-www-form-urlencoded'
		}
	})
}


export function getAuthStatus(params){
	return request({
		url:"/v1/user/auth/info",
		header:{
			token:params.token,
		}
	})
}