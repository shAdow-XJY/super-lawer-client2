import request from "./config.js"

export function postLogin(params){
	return request({
		url: "/v1/user/login?passport=" + params.passport+"&pwd="+params.pwd,
		method:"POST"
	})
}

export function register(params,data)
{
	return request({
		url:"/v1/user/register",
		data:data
	})
}

export function getInfo(params)
{
	return request({
		url:"/v1/user/info",
		header:{
			token: params.token
		}
	})
}

