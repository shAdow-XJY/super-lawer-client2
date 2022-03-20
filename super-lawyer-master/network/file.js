import request from "./config.js"
export function upLoadFile(params)
{
	return request({
		url:"/v1/msg/contacts",
		header:{
			token: params.token
		}
	})
}