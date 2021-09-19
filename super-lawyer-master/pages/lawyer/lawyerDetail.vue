<template>
	<view>
		<view class="infolist">
			<u-cell-group :border="false">
				<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value"  :title-style="titlestyle" :arrow="false">				
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="license">
			<view class="title" >身份证正面</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="lawyer.idcard_front"></image>
		</view>
		<view class="license">
			<view class="title" >身份证背面</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="lawyer.idcard_back"></image>
		</view>
		<view class="license">
			<view class="title" >律师执照</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="lawyer.business_license"></image>
		</view>
		
	</view>
</template>

<script>
	import {
		getLawyerById
	} from "../../network/lawyer.js"
	import{
		formateDate
	}from "../../utils/util.js"
	export default {
		data() {
			return {
				info:[
					{
						'key':'名称',
						'value':'腾某公司'
					},					
					{
						'key':'性别',
						'value':''
					},
					{
						'key':'学位',
						'value':'12312312312'
					},
					{
						'key':'认证时间',
						'value':'2021-5-13'
					},
					{
						'key':'从业时间',
						'value':'广东省广州市中古'
					},
					{
						'key':'身份证',
						'value':''
					}				
				],
				titlestyle:{
					'font-size':'30rpx',				
					'font-weight':'520',
					'color' :'#000000'
				},
				lawyer:{}				
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let id = option.lawyerId	
			console.log(id)
			let params = {
				token: getApp().globalData.user_token
			}
			if(id){
				getLawyerById(params,id).then(res =>{
					console.log(res.data)
					if(res.data.code == 1 ){
						console.log(res.data.data)
						this.lawyer = res.data.data.info
						this.info[0].value = this.lawyer.real_name
						this.info[1].value = this.lawyer.sex ==1?"女":"男"
						this.info[2].value = this.lawyer.degree
						this.info[3].value = formateDate(this.lawyer.auth_time)
						this.info[4].value = this.lawyer.working_time
						this.info[5].value = this.lawyer.id_number
						
					}
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
