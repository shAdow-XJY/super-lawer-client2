<template>
	<view class="center">
		<view class="center_top"></view>
		<!--头部用户信息-->
		<view class="avatar_box">
			<image class="avatar" :src="coverUrl" mode="aspectFill"></image>
			<text class="nickname">{{nickname}}</text>
		</view>
		<view class="center_box_bg">
			<!--主菜单-->
			<view class="profily">
				<view class="home_menu">
					<view class="cell" v-for="(item,index) in homeMenu" :key="index">
						<image class="img" :src="item.img" mode="aspectFill"></image>
						<text :class="index==1?'special':''">{{item.name}}</text>
					</view>
				</view>
			</view>
			<!--两边圆弧-->
			<view class="arc">
				<view class="within_arc"></view>
			</view>
			<!--列表菜单-->
			<view class="list_menu">
				<view class="row" v-for="(item,index) in listMenu" :key="index">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
					
					<view @click="clickNavigator(index)" style="display: inline-block;margin-right: 5rpx;">
					<text class="footer">{{item.content}}</text>
					<u-icon name="arrow-right" color="#B6B6B6"></u-icon>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getInfo} from "../../network/user.js"
	export default {
		data() {
			return {
				coverUrl:'/static/person.png',
				nickname:'/static/person.png',
				
				homeMenu: [{
						name: '企业',
						img: '/static/person.png',
					}, {
						name: '律师',
						img: '/static/person.png',
					}, {
						name: '管理员',
						img: '/static/person.png',
					}],
				
					listMenu: [{
						name: '账号资料',
						icon: '/static/person.png',
						content:'点击修改'
					}, {
						name: '列表菜单二',
						icon: '/static/person.png',
						content:'点击修改'
					}, {
						name: '列表菜单三 ',
						icon: '/static/person.png',
						content:'点击修改'
					}, {
						name: '列表菜单四',
						icon: '/static/person.png',
						content:'点击修改'
					}, {
						name: '列表菜单五',
						icon: '/static/person.png',
						content:'点击修改'
					}, {
						name: '列表菜单六',
						icon: '/static/person.png',
						content:'点击修改'
					}]

			}
		},
		onLoad() {
			// let params={token:getApp().globalData.user_token}
			getInfo({token:getApp().globalData.user_token}).then(res=>{
				console.log(res)
				if(res.data.code==1)
				{
					getApp().globalData.user_info=res.data.data.basic_info;
					this.coverUrl=res.data.data.basic_info.cover;
					this.nickname=res.data.data.basic_info.nickname;
				}
			})
		},
		computed: {
			
		},
		methods: {
			clickNavigator(index)
			{
				console.log(index);
				
				if(index == 0){
					uni.navigateTo({
						url:"/pages/user/userInfo",
						success: () => {
							console.log("sucess")
						},
						fail: () => {
							console.log("fail")
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 20rpx;
	}

	.center {
		height: 100%;

		&_top {
			height: 400rpx;
			background-color: $uni-bg-color;
			background-size: cover;
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				margin: 0 auto;
				top: -100rpx;
				left: 5%;
				background: #FEFEFE;
				padding: 35rpx;
				box-sizing: border-box;
				box-shadow: 1rpx 2rpx 16rpx 1rpx rgba(107, 107, 107, 0.1);
			}
		}
	}

	.avatar_box {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		top: 70rpx;
		left: 275rpx;
		width: 200rpx;
		height: 200rpx;
	
		.avatar {
			height: 120rpx;
			width: 120rpx;
			background-size: 100%;
			border: 5rpx solid #000000;
			border-radius: 50%;
			overflow: hidden;
		}
	
		.nickname {
			color: #000000;
			padding-top: 10rpx;
			font-size: 34rpx;
			font-family: KaiTi;
		}
	
	}

	.home_menu {
		position: relative;
		display: flex;
		justify-content: space-around;

		.cell {
			width: 250rpx;
			font-size: 24rpx;
			text-align: center;
			display: flex;
			flex-direction: column;

			.img {
				width: 80rpx;
				height: 80rpx;
				margin: 0 auto;
				margin-bottom: 5rpx;
			}

			text {
				line-height: 20rpx;
				margin-top: 20rpx;
			}

			.special {
				border-left: 3rpx solid #CCCCCC;
				border-right: 3rpx solid #CCCCCC;
			}
		}
	}

	.arc {
		background-color: $uni-bg-color;
		height: 100rpx;
	}

	.within_arc {
		background-color: #FFFFFF;
		border-top-left-radius: 20%;
		border-top-right-radius: 20%;
		height: 100rpx;
	}

	.list_menu {
		width: 100%;
		display: inline-block;

		.row {
			font-size: 28rpx;
			letter-spacing: 1rpx;
			padding: 30rpx 5%;
			background: #FEFEFE;
			border-bottom: 1rpx solid #EEEEEE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;

			text:nth-of-type(1) {
				margin-left: 20rpx;
				width: 65%;
			}
			
			.footer{
				font-size: 20rpx;
			}

			image {
				width: 40rpx;
				height: 40rpx;
			}

			&:nth-of-type(4) {
				margin-top: 10rpx;
			}
		}
	}
</style>

