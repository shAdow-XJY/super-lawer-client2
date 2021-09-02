<template>
	<!--列表菜单-->
	<view class="list_menu">
		<view class="row" v-for="(item,index) in listMenu" :key="index">
			<image :src="item.icon" mode="aspectFill"></image>
			<text>{{item.name}}</text>
			<text class="footer">{{item.content}}</text>
		</view>
	</view>
	<!--列表菜单-->
	<!-- <view class="list_menu">
		<view class="row" v-for="(item,index) in listMenu" :key="index">
			<image :src="item.icon" mode="aspectFill"></image>
			<text>{{item.name}}</text>
			
			
			<view class="footer">{{item.content}}</view>
			<u-icon class="icon" name="arrow-right" color="#B6B6B6"></u-icon>

		</view>
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				
					listMenu: [
					{
						name: '头像',
						icon: '/static/person.png',
						content:'更换'
					},{
						name: '昵称',
						icon: '/static/person.png',
						content:''
					}, {
						name: '手机',
						icon: '/static/person.png',
						content:''
					}, {
						name: '邮箱',
						icon: '/static/person.png',
						content:''
					},  {
						name: '列表菜单五',
						icon: '/static/person.png',
						content:''
					}, {
						name: '列表菜单六',
						icon: '/static/person.png',
						content:''
					}]
	
			}
		},
		onLoad() {
			this.listMenu[1].content= getApp().globalData.user_info.nickname;
			this.listMenu[2].content= getApp().globalData.user_info.phone;
			this.listMenu[3].content= getApp().globalData.user_info.email;
		}
	}
</script>

<style lang="scss">
	.list_menu {
		margin: 50rpx;
	
		.row {
			font-size: 28rpx;
			letter-spacing: 1rpx;
			padding: 30rpx 5%;
			background: #FEFEFE;
			border-bottom: 5rpx solid #a9c6b6;
			overflow: hidden;
			border-radius: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
	
			text:nth-of-type(1) {
				margin-left: 20rpx;
				width: 70%;
			}
	
			image {
				width: 40rpx;
				height: 40rpx;
			}
	
			&:nth-of-type(4) {
				margin-top: 50rpx;
			}
			
			.footer{
				text-align: right;
				margin-right: 0rpx;
				white-space:nowarp;
			}
		}
	}
// .list_menu {
// 		width: 100%;
// 		display: inline-block;

// 		.row {
// 			font-size: 28rpx;
// 			letter-spacing: 1rpx;
// 			padding: 30rpx 5%;
// 			background: #FEFEFE;
// 			border-bottom: 1rpx solid #EEEEEE;
// 			overflow: hidden;
// 			box-sizing: border-box;
// 			display: flex;
// 			align-items: center;
// 			position: relative;

// 			text:nth-of-type(1) {
// 				margin-left: 20rpx;
// 				width: 30%;
// 			}
			
// 			.footer{
// 				font-size: 20rpx;
// 				float: right;
// 			}
// 			.icon{
// 				margin-left: 2rpx;
// 				float: right;
// 			}

// 			image {
// 				width: 40rpx;
// 				height: 40rpx;
// 			}

// 			&:nth-of-type(4) {
// 				margin-top: 10rpx;
// 			}
// 		}
// 	}
</style>
