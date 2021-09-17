<template>
	<view>
		<view class="header">
			<view class="info">
				<view class="title">
					事项内容
				</view>
				<view class="message">
					系统为您分配了一个新的项目,请决定是否承接
				</view>
				<view class="date">
					<u-icon size="50rpx" color="#fce100" name="warning" style="margin-right: 10rpx; float: left"></u-icon>					
					<view style="font-size: 30rpx; float: left;margin-top: 8rpx;">请在2021-5-16前完成操作</view>
				</view>
			</view>
		</view>
		<view class="pro_bt">
			<u-row style="margin: 50rpx;">
				<u-col span="6">	
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="企业详情" label="查看企业信息" :title-style="titlestyle" :label-style="labelstyle" center @click="clickCompanyInfo()">
						<u-icon name="bangonglou" custom-prefix="custom-icon" slot="right-icon" size="70"></u-icon>
					</u-cell-item>								
				</u-col>				
				<u-col span="6">
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="咨询需求" label="查看需求详情" :title-style="titlestyle" :label-style="labelstyle" center @click="clcikDemandInfo()">
						<u-icon name="pdf" custom-prefix="custom-icon" slot="right-icon" size="70"></u-icon>
					</u-cell-item>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="6">	
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="个人信息" label="查看个人信息" :title-style="titlestyle" :label-style="labelstyle" center @click="clickServerInfo()">
						<u-icon name="xinhao" custom-prefix="custom-icon" slot="right-icon" size="50"></u-icon>
					</u-cell-item>								
				</u-col>				
				<u-col span="6">
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="服务时间" label="2021-5-20至2022-5-20" :title-style="{'font-size':'26rpx','font-weight':'bold','font-family':'微软雅黑','padding-top':'30rpx'}" :label-style="labelstyle" center>
						<u-icon name="clock" slot="right-icon" size="70"></u-icon>
					</u-cell-item>
				</u-col>
			</u-row>
			<view class="bt">
				<button class="button" type="default" style="background-color: #1aad19;" hover-class="s-bg-light" @click="clickButton($event,0)"><text class="txt">同意</text></button>
				<button class="button" type="default" style="background-color: #c64128;" hover-class="w-bg-light" @click="clickButton($event,1)"><text class="txt">拒绝并申述</text></button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titlestyle:{
					'font-size':'26rpx',
					'font-weight':'bold',
					'font-family':'微软雅黑',
					},
				labelstyle:{
					'font-size':'24rpx',
					'font-family':'微软雅黑',
					'margin-top':'0rpx'
				},
				
			}
		},
		methods: {
			clickCompanyInfo(){
				uni.navigateTo({
					url:"/pages/CompanyDetail/CompanyDetail"
				})
			},
			clcikDemandInfo(){
				uni.navigateTo({
					url:"/pages/DemandDetail/DemandDetail"
				})
			},
			clickServerInfo(){
				
			},
			clickButton(e,type){
				switch(type){
					case 0:{
						//同意
					};
					case 1:{
						//拒绝
					}
				};
				uni.redirectTo({
					url:"/pages/My/My"
				})
			},
			onload(){
				
			}
		}
	}
</script>
	
<style lang="scss">
	page{
		background-color: #efeff4;
	}
	
	.header{
		padding-bottom: 30rpx;
		padding-top: 20rpx;
		background: repeating-linear-gradient(to bottom right, rgba(240, 240, 240, 1.0), rgba(250, 250, 250, 1.0));
		height: 430rpx;
		border-bottom:#d7d6e0 solid 4rpx;
		border-bottom-left-radius: 50rpx;
		border-bottom-right-radius:50rpx ;
		padding-left: 30rpx;
		.info{
			height: 280rpx;
			margin-bottom: 35rpx;
			margin-top: 20rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			border:2rpx;
			width: 95%;
			.title{
				font-size: 40rpx;
				font-weight: bold;
				padding-top: 50rpx;
				padding-left: 30rpx;
				margin-bottom: 10rpx;
			}
			.message{		
				text-align: center;
				height: 100rpx;
				padding-top: 30rpx;
				font-size: 30rpx;
				font-weight: 500;
				font-family:"微软雅黑";
						
			}
			.date{
				padding-left: 20rpx;
				float: left;
				font-weight: 550;
				font-family:"微软雅黑";
			}
		}
	}
	.pro_bt{
		padding: 50rpx 10rpx;
		.u-cell{
			border-radius: 10rpx;
			height: 165rpx;
		}
		.bt{
			margin-top: 250rpx;
			display: flex;
			.button{
				 width:280rpx; 
				 height: 76rpx;
				 text-align: center;
				 vertical-align:middle;
				 line-height: 35px;
				 align-items: center;
				 .txt{
				 	font-size: 35rpx;
				 	font-weight: normal;
					font-family:"微软雅黑";
				 	color: #FFFFFF;
					}
				 }
			}
	}
	
	.s-bg-light{
		background-color:#189d16 !important
	}
	.w-bg-light{
		background-color:#b13823 !important
	}
</style>
