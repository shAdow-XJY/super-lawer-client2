<template>
	<view>		
		<view class="serviceTitle">
			{{title}}
		</view>
		<view class="serivceList">
			<u-cell-group :border="false">
				<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value" :arrow="item.value?false:true" :hover-class="item.value ===''?'cell-hover-class':'none'"  :title-style="titlestyle">
				</u-cell-item>	
				<u-cell-item title="服务摘要" :border-bottom="false" :arrow="false"></u-cell-item>
			</u-cell-group>
			<textarea :value="brief" placeholder="" />
			
		</view>
	</view>
</template>

<script>
	import{
		getServiceFangan
	}from "../../network/service.js"
	
	export default {
		data() {
			return {
				title:"服务方案",
				info:[
					{
						"key":"服务名称",
						"value":"子服务方案"				
					},
					{
						"key":"服务等级",
						"value":"1"			
					},
					{
						"key":"收费标准",
						"value":"1000/月"				
					},
					{
						"key":"文件模板下载",
						"value":""			
					}
				],
				brief:""
				
			}
		},
		methods: {
			
		},
		onLoad(option){
			console.log(getApp().globalData.user_token)
			console.log(option)
			let serviceId = option.serviceId;
			let params ={
				'token':getApp().globalData.user_token
			}
			getServiceFangan(params).then(res =>{
				if(res.data.code ==1){
					console.log(res.data.data.services)
					res.data.data.services.forEach((ele,index)=>{
						if(ele.id == serviceId){
							this.info[0].value = ele.service_name
							this.info[1].value = ele.rank
							this.info[2].value = ele.price + "/月"
							this.brief = ele.service_content
						}
					})
					
				}
			})
			
		}
	}
</script>

<style>

.cell-hover-class {
		background-color: #f7f8f9 !important;
		}
.serviceTitle{
	font-size: 60rpx;
	font-weight: bold;
	padding: 20rpx;
	border-bottom:  3rpx solid #e4e7ed;
}
.serviceList{
		padding-left: 20rpx;
		padding-right: 20rpx;
		
}
.u-border-bottom::after{
	border-bottom-width: 2px;
		
}
body{
	padding: 0 5rpx;
}
textarea{
	width: 90%;
	margin:0 20rpx;
	padding-top: 10rpx;
	padding-left: 10rpx;
	border: 2rpx solid #ccc;
}
</style>
