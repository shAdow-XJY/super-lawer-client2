<template>
	<view>		
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<text class="name">{{user.nickname}}</text>				
						<view class="avator">
							<u-avatar class="pic" :src="RoleImage" size="200"></u-avatar>
						</view>
					</view>
					<view class="info">
						<u-row>
							<u-col span="6">
								<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false"
									title="认证状态" :label="user_type" :title-style="titlestytle" :label-style="labelstyle"
									>									
								</u-cell-item>
							</u-col>
							<u-col span="6">
								<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false"
									:title="user_type === '未认证用户'?'注册时间':'认证时间'" :label="user.register_time" :title-style="titlestytle" :label-style="labelstyle"
									>									
								</u-cell-item>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
		</view>
		<view class="operation">
			<view class="txt">常用操作</view>
			<view class="op_bt">
				<u-row>
					<u-col span="6" v-if="user_type != '管理员'" >
						<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false"
							title="个人信息" label="查看个人信息" :title-style="titlestytle" :label-style="labelstyle"
							@click="clickInfo()">
							<u-icon name="setting" slot="right-icon" size="75"></u-icon>
						</u-cell-item>
					</u-col>
					<u-col span="6">
						<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false"
							title="认证申请" label="进行身份的认证" :title-style="titlestytle" :label-style="labelstyle"
							@click="clickApply()" v-if="user_type != '管理员'">
							<u-icon name="order" slot="right-icon" size="70"></u-icon>
						</u-cell-item>
						<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false"
							title="管理认证申请" label="审核认证信息" :title-style="titlestytle" :label-style="labelstyle"
							@click="clickApply()" v-if="user_type == '管理员'">
							<u-icon name="order" slot="right-icon" size="70"></u-icon>
						</u-cell-item>
					</u-col>
				</u-row>
				<button class="exit_bt" @click="exit">退出登录</button>
			</view>
		</view>
		<u-tabbar :list="tabBarList"></u-tabbar>
		<u-toast :title="result" :type="resultType" ref="tip"/>
	</view>
</template>


<script>
	import {
		getInfo
	} from "../../network/user.js"
	import{
		formateDate
	}from "../../utils/util.js"
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				user_type: '',
				user: {},
				titlestytle: {
					'font-size': '30rpx',
					'font-weight': 'bold'
				},
				labelstyle: {
					'font-size': '25rpx',
					'letter-spacing': '2rpx'
				},
				RoleImage:""
			};
		},
		onLoad() {
			let params = {
				token: getApp().globalData.user_token
			}
			getInfo(params).then(res => {
				console.log(res)
				if (res.data.code == 1) {
					this.user_type = getApp().globalData.user_type;
					this.user = res.data.data.basic_info;
					getApp().globalData.user_info = this.user;
					this.user.register_time = formateDate(this.user.register_time)				
					this.RoleImage = this.user.cover
					console.log(this.RoleImage)
				
				}

			})

		},
		methods: {
			clickInfo() {
				if(this.user_type == "企业用户"){
					uni.navigateTo({
						url: '/pages/enterprise/enterpriseDetail'
					})					
				}
				else if(this.user_type =="律师用户"){
					uni.navigateTo({
						url: '/pages/lawyer/lawyerDetail'
					})		
				}
				else{
					this.$refs.tip.show({
						title:"您还未认证！",
						type:"warning",
						duration:1500,
						callback:function(){
							uni.navigateBack({})
						}
					})
				}
			},
			clickApply() {	
				if(this.user_type == "管理员"){
					uni.navigateTo({
						url: '/pages/userApply/userApplyConfirm'
					})
				}
				else if(this.user_type == "未认证用户"){
					uni.navigateTo({
						url: '/pages/userApply/userApply'
					})
				}
				else{
					this.$refs.tip.show({
						title:"您已经认证！",
						type:"success",
						duration:1500,
						callback:function(){
							uni.navigateBack({})
						}
					})
				}
				
			},
			exit(){
				uni.reLaunch({
					url:"../login/login"
				})
			}
		},
		computed:{
			...mapGetters([
				'tabBarList'
			])
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #efeff4;
		font-size: 30rpx;
	}

	.header {
		background: repeating-linear-gradient(to bottom right, rgba(240, 240, 240, 1.0), rgba(250, 250, 250, 1.0));
		height: 430rpx;
		padding-bottom: 110rpx;
		border-radius: 50rpx;
		border-bottom: #d7d6e0 solid 2rpx;

		.bg {
			width: 100%;
			height: 200rpx;
			padding-top: 60rpx;
			background: repeating-linear-gradient(to top right, rgba(240, 240, 240, 1.0), rgba(250, 250, 250, 1.0));
		}
	}

	.box {
		width: 650rpx;
		height: 330rpx;
		border-radius: 20rpx;
		margin: 0 auto;
		background: #fff;

		.box-hd {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-end;
			padding-right: 50rpx;

			.name {
				font-weight: bold;
				flex: 2;
				padding-top: 50rpx;
				padding-left: 80rpx;
				font-size: 45rpx;
			}

			.avator {
				position: relative;
				width: 200rpx;
				height: 200rpx;
				background: #fff;
				border: 5rpx solid #fff;
				border-radius: 100%;
				margin-top: -60rpx;
				overflow: hidden;

				.pic{
					position: absolute;
					left: -10rpx;
				}
			}
		}

		.info {

			border-bottom: 2rpx;
			border-radius: 20rpx;
		}
	}

	.list-content {
		background: #fff;
	}

	.list {
		width: 100%;
		border-bottom: 15rpx solid #f1f1f1;
		background: #fff;

		&:last-child {
			border: none;
		}

		.li {
			width: 92%;
			height: 100rpx;
			padding: 0 4%;
			border-bottom: 1px solid rgb(243, 243, 243);
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50rpx;
				height: 50rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.text {
				padding-left: 20rpx;
				width: 100%;
				color: #666;
			}

			.to {
				flex-shrink: 0;
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.u-border-bottom::after {
		border-bottom-width: 2px;
	}

	.operation {
		.txt {
			font-weight: 600;
			padding: 20rpx 20rpx;
			font-size: 28rpx;
			font-family: "微软雅黑";
		}

		.op_bt {
			padding: 10rpx 10rpx;

			.u-cell {
				border-radius: 10rpx;
				height: 120rpx;
			}
		}

		.exit_bt {
			color: #f96654;
			text-align: center;
			font-weight: normal;
			font-family: "微软雅黑";
			font-size: 25rpx;
			vertical-align: middle;
			line-height: 40px;


			background-color: #ffffff;
			width: 650rpx;
			height: 75rpx;

			position: absolute;
			left: 50rpx;
			bottom: 250rpx;
		}
	}
</style>
