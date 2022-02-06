<template>
	<view>
		<view class="infolist">
			<u-cell-group :border="false">
				<u-cell-item  v-for="(item,index) in info" :title="item.key" :value="item.value"  :title-style="titlestyle" :arrow="false">				
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="license">
			<view class="title" >{{picName}}</view>
				<image width="650rpx" height="600rpx" border-radius="10rpx" :src="business_license"></image>
		</view>
	</view>
</template>

<script>
	import {
		getInfo
	} from "../../network/user.js"
	import {
		getEnterpriseDetail,		
	} from "../../network/enterprise.js"
	import{
		formateDate
	}from "../../utils/util.js"
	export default {
		data() {
			return {
				info:[				
					{
						'key':'联系方式',
						'value':''
					},
					{
						'key':'电子邮件',
						'value':''
					},														
				],
				basic_info:[
					{
						'key':'企业名称',
						'value':''
					},					
					{
						'key':'用户名',
						'value':''
					},
					{
						'key':'邮箱',
						'value':''
					},
					{
						'key':'电话',
						'value':''
					},
					{
						'key':'注册时间',
						'value':''
					},		
				],
				detail_info:[
					{
						'key':'企业名称',
						'value':''
					},					
					{
						'key':'机构代码',
						'value':''
					},
					{
						'key':'企业地址',
						'value':''
					},
					{
						'key':'注册时间',
						'value':''
					},	
				],
				titlestyle:{
					'font-size':'30rpx',				
					'font-weight':'520',
					'color' :'#000000'
				},
				business_license:'',
				picName:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let id = option.enterpriseId			
			let params = {
				token: getApp().globalData.user_token
			}
			if(id){
				getEnterpriseDetail(params,id).then(res =>{
					if(res.data.code ==1){
						this.detail_info[0].value = res.data.data.info.enterprise_name
						this.detail_info[1].value = res.data.data.info.institution_code
						this.detail_info[2].value = res.data.data.info.enterprise_add								
						this.detail_info[3].value = formateDate(res.data.data.info.auth_time)		
						this.business_license = res.data.data.info.business_license
						this.info = this.detail_info
						this.picName = "企业执照"
					}
				})
			}
			else{
				getInfo(params).then(res=>{
					console.log(res)
					this.basic_info[0].value = res.data.data.basic_info.nickname
					this.basic_info[1].value = res.data.data.basic_info.passport
					this.basic_info[2].value = res.data.data.basic_info.email	
					this.basic_info[3].value = res.data.data.basic_info.phone
					this.basic_info[4].value = formateDate(res.data.data.basic_info.register_time)	
					this.business_license = res.data.data.basic_info.cover
					this.info = this.basic_info
					this.picName = "用户头像"
				})
			}
		}
	}
</script>

<style>
.u-border-bottom::after{
		border-bottom-width: 2px;
}
.infolist{
	margin-top: 20rpx;
}
.license .title{
		font-size: 30rpx;
		font-weight:520;
		font-family: "微软雅黑";
		color: #000000;
		margin:40rpx 30rpx;
}
.license image{
	margin-top: 20rpx;
	margin-left: 50rpx;
}
</style>
