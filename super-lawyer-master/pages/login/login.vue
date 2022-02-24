<template>
	<view class="content">
		<view class="login-tip">
			<view class="title">SuperLawyer</view>
		</view>
		<view class="login-form">
			<view class="item">
				<view class="icon left">
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/account.png?sign=f21501c858525ade84a4a93a8edcabc1&t=1597715417"
					 mode="widthFix"></image>
				</view>
				<input type="text" v-model="passport" placeholder="请输入账号" maxlength="20" placeholder-class="input-placeholder" />
			</view>
			<view class="item">
				<view class="icon left">
					<image src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/password.png?sign=75c81d1e4948d454b7bdac0a49e387f5&t=1597715443"
					 mode="widthFix"></image>
				</view>
				<input type="text" v-model="password" placeholder="请输入密码" maxlength="20" placeholder-class="input-placeholder"
				 :password="passwordShow" />
				<view class="icon right">
					<image v-if="passwordShow" src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/hide-password.png?sign=6ca6b422427dfa98097ff9009e0121d3&t=1597715458"
					 mode="widthFix" @click="passwordStatus"></image>
					<image v-else src="https://6e69-niew6-1302638010.tcb.qcloud.la/denglu/show-password.png?sign=57e79fa5ecc90b1a2dab421361361b9f&t=1597715470"
					 mode="widthFix" @click="passwordStatus"></image>
				</view>
			</view>
		</view>
		
		<view class="btn-box">
			<view class="forget-pass">忘记密码?</view>
			<view class="btn-box">
				<view class="login-btn" @click="login">登 录</view>
				<view class="register-btn" @click="register">注册</view>
			</view>
		</view>
		
		<u-toast ref="tip"/>
	</view>
</template>
<script>
	import {postLogin} from "../../network/user.js"
	import {mapState,mapMutations} from 'vuex'
	export default{	
		data(){
			return{				
				//lawyer
				passport:"510",
				password:"123456",
				
				passwordShow: true,
					
			}
		},
		methods:{
			login(){
				let params={
					passport:this.passport,
					pwd:this.password
				};			
				postLogin(params).then(res=>{
					 console.log(res)
					if(res.data.code==1)
					{
						getApp().globalData.user_type=res.data.data.user_type;
						getApp().globalData.user_token=res.data.data.token;
						console.log(getApp().globalData.user_type)
						this.setRole(getApp().globalData.user_type)
						uni.setStorage({
							key:"loginUser",
							data:{
								user_type:res.data.data.user_type,
								token:res.data.data.token,
							}
						})						
						this.$refs.tip.show({
							title:"登录成功",
							type:"success",		
												
						})
						setTimeout(()=>{
							uni.switchTab({
									url:"../user/user"
							})
						},1500)					
					}
					
				})
			},
			...mapMutations(['setRole']),
			
			//密码状态 隐藏/显示
			passwordStatus() {
				this.isPassword = !this.isPassword
				this.passwordShow = !this.passwordShow
			},
			register(){
				setTimeout(()=>{
					uni.navigateTo({
						url:"../register/register"
					})
				},100)
			}		
		},
		created() {
			const userlogin = uni.getStorageSync("loginUser")
			if(userlogin){
				getApp().globalData.user_type=userlogin.user_type;
				getApp().globalData.user_token=userlogin.token;
				this.setRole(getApp().globalData.user_type)
				uni.switchTab({
						url:"../user/user"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 350rpx;
			font-size: 80rpx;
		}

		.login-form {
			width: 550rpx;
			margin: auto;
		
			.item {
				width: 550rpx;
				height: 80rpx;
				border-radius: 50rpx;
				margin-bottom: 30rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background-color: #ffffff;
				border: 1rpx solid #000000;
			}
		
			input {
				color: #000000;
				width: 350rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
			}
		
			text {
				height: 30rpx;
				font-family: PingFang-SC-Regular;
				font-size: 30rpx;
				font-weight: bold;
				font-stretch: normal;
				line-height: 40rpx;
				letter-spacing: 3rpx;
				color: #000000;
			}
		
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100rpx;
		
				image {
					width: 40rpx;
					height: 40rpx;
				}
		
			}

		}
		
		.input-placeholder {
			color: #a5a5a5;
			line-height: 80rpx;
			height: 80rpx;
			font-size: 28rpx;
			margin: auto;
		}
	
	    .btn-box {
	    	margin: 20rpx;

	    	.forget-pass {
	    		padding-right: 30rpx;
	    		display: flex;
	    		justify-content: flex-end;
	    		font-size: 26rpx;
	    		letter-spacing: 5rpx;
	    	}
	    
	    	.btn-box {
	    		display: flex;
	    		justify-content: center;
	    		align-items: center;
	    		flex-direction: column;
	    
	    		.login-btn {
	    			width: 350rpx;
	    			height: 80rpx;
	    			background-color: #ffffff;
	    			display: flex;
	    			justify-content: center;
	    			align-items: center;
	    			border-radius: 50rpx;
	    			font-size: 40rpx;
	    			margin: 50rpx 0;
	    			box-shadow: 0rpx 10rpx 20rpx #000000;
	    		}
	    
	    		.register-btn {
	    			height: 100rpx;
	    			width: 100%;
	    			display: flex;
	    			justify-content: center;
	    			align-items: center;
	    		}
	    	}
	    }
}
</style>
<!-- <template>
	<view class="root">
		<view class="top">
			SuperLawyer
		</view>
		<view class="info">
			<u-form :model="form">
				<u-form-item label="用户名" label-width="200">
					<u-input v-model="form.passport"></u-input>
				</u-form-item>
				<u-form-item label="密码" label-width="200">
					<u-input v-model="form.password"></u-input>
				</u-form-item>
			</u-form>
		</view>
		
		<view class="btn">
				<u-button type="mini"> 注册</u-button>
				<u-button type="primary" @click="login">登录</u-button>
		</view>
		<u-toast ref="tip"/>
	</view>
</template>

<script>
	import {postLogin} from "../../network/user.js"
	import {mapState,mapMutations} from 'vuex'
	export default{
		
		data(){
			return{
				form:{
					passport:"test",
					password:"test00",
					
				}
			}
		},
		methods:{
			login(){
				let params={
					passport:this.form.passport,
					pwd:this.form.password
				};			
				postLogin(params).then(res=>{
					 console.log(res.data.data)
					if(res.data.code==1)
					{
						getApp().globalData.user_type=res.data.data.user_type;
						getApp().globalData.user_token=res.data.data.token;
						console.log(getApp().globalData.user_type)
						this.setRole(getApp().globalData.user_type)
						// console.log(res.data.data.token);
						// console.log(getApp().globalData.user_token);
						this.$refs.tip.show({
							title:"登录成功",
							type:"success",		
												
						})
						setTimeout(()=>{
							uni.switchTab({
									url:"../user/user"
							})
						},1500)
						
						
					}
					
				})
			},
			...mapMutations(['setRole']),
		}
	}
</script>

<style lang="scss">
	.root{
		padding: 10px;
		.top{
			text-align: center;
			font-weight: 700px;
			font-size: 40rpx;
		}
		.info{
			margin: 20px auto;
		}
	}
	.btn{
		display: flex;
	}
</style>
 -->