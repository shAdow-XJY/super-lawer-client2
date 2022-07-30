import request from "./config.js"

//获取用户联系人列表及最近的一条消息记录
export function getMsgList(params)
{
	return request({
		url:"/v1/msg/contacts",
		header:{
			token: params.token
		}
	})
}

export function getAllMsgList(params)
{
	return request({
		url:"/v1/msg/contacts/"+params.contact_id,
		header:{
			token: params.token
		}
	})
}

export function sendMsg(params)
{
	return request({
		url: "/v1/msg/contacts/" + params.contact_id +"?content="+params.content + "&msgType=" + params.content_type,
		header:{
			token: params.token
		},
		method:"POST"
	})
	
}
