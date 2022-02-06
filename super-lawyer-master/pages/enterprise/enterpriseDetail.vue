<template>
	<view>
		<view class="infolist">
			<u-cell-group :border="false">
				<u-cell-item  v-for="(item,index) in info" :title="item.key" :value="item.value"  :title-style="titlestyle" :arrow="false" v-if="item.value !=''">				
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="license">
			<view class="title" >营业执照</view>
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
						'key':'企业名称',
						'value':''
					},
					{
						'key':'联系方式',
						'value':''
					},
					{
						'key':'电子邮件',
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
				business_license:''
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
						// console.log(res.data.data)
						// console.log(res.data.data.info)
						this.info[0].value = res.data.data.info.enterprise_name
						this.info[3].value = res.data.data.info.institution_code
						this.info[4].value = res.data.data.info.enterprise_add								
						this.info[5].value = formateDate(res.data.data.info.auth_time)		
						this.business_license = res.data.data.info.business_license
					}
				})
			}
			else{
				getInfo(params).then(res=>{
					console.log(res)
					this.info[0].value = res.data.data.basic_info.passport
					this.info[1].value = res.data.data.basic_info.phone
					this.info[2].value = res.data.data.basic_info.email						
					this.info[5].value = formateDate(res.data.data.basic_info.register_time)		
					this.business_license = res.data.data.basic_info.cover
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
