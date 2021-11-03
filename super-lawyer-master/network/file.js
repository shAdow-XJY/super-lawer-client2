import request from "./config.js"
//!!!!未写！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
// uploadFile
export function upLoadFile(params)
{
	return request({
		url:"/v1/msg/contacts",
		header:{
			token: params.token
		}
	})
}