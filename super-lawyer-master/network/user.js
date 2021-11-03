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
			token: params.token
		}
	})
}

