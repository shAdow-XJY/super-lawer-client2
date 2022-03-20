<template>
	<view class="root">
		<view class="top">用户注册</view>
		<view class="info">
			<u-form :model="form">
				<u-form-item label="头像" label-width="200">
					<u-upload ref="uUpload" :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess" :auto-upload="false"></u-upload>
				</u-form-item>
				<u-form-item label="用户名" label-width="200">
					<u-input v-model="form.passport"></u-input>
				</u-form-item>
				<u-form-item label="密码" label-width="200">
					<u-input v-model="form.password"></u-input>
				</u-form-item>
				<u-form-item label="昵称" label-width="200">
					<u-input v-model="form.username"></u-input>
				</u-form-item>
				<u-form-item label="Phone" label-width="200">
					<u-input v-model="form.phone"></u-input>
				</u-form-item>
				<u-form-item label="Email" label-width="200">
					<u-input v-model="form.email"></u-input>
				</u-form-item>
				<u-form-item label="验证码" label-width="200">
					<view class="row">
						<u-input class="half" v-model="form.check_code"></u-input>
						<view class="send-code" @click="sendCode">发送验证码</view>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="login-box" @click="registerButton">
			<text>注册</text>
			<text class="right-icon">→</text>
		</view>
		<u-toast :title="result" :type="resultType" ref="tip"/>
	</view>
</template>

<script>
	import {register,sendCheckCode} from "../../network/user.js"
	import {isNull,checkStr} from "../../js_sdk/mineking-tool/tool.js"
	export default {
		data() {
			return {
				form:{
					passport:"",
					password:"",
					username:"",
					phone:"",
					email:"",
					check_code:""
				},
				linkImg:"",
				action:"http://112.74.166.85:9000/v1/file/upload?module=user-cover",
				
				result:"",
				resultType:"",
			}
			
		},
		methods: {
			onSuccess(data){
				console.log(data);
				let all = true;
				this.linkImg=data.data.url
				console.log(this.linkImg)
				this.resultType = "success";
				if(this.form.check_code==""){
					this.result = "验证码为空";
					all = false;
				}
				if(this.form.email==""){
					this.result = "邮箱为空";
					all = false;
					if(!checkStr(this.form.email,'email')){
						this.result = "邮箱错误";
						all = false;
					}
				}
				if(this.form.phone==""){
					this.result = "手机号为空";
					all = false;
				}
				else{
					if(!checkStr(this.form.phone,'phone')){
						this.result = "手机号错误";
						all = false;
					}
				}
				if(this.form.username==""){
					this.result = "昵称为空";
					all = false;
				}
				if(this.form.pwd==""){
					this.result = "密码为空";
					all = false;
				}
				if(this.form.passport==""){
					this.result = "用户名为空";
					all = false;
				}
				if(this.linkImg==""){
					this.result = "头像为空";
					all = false;
				}
				if(!all){
					setTimeout(()=>{
						this.$refs.tip.show({
							title:this.result,
							type:"error",							
						})
					},600);		
					return;
				}
				else{
					let params = {
						check_code:this.form.check_code,
						cover:this.linkImg,
						email:this.form.email,
						passport:this.form.passport,
						password:this.form.password,
						phone:this.form.phone,
						username:this.form.username
					}
					console.log(params);	
					register(params).then(res=>{											
							if(res.data.code==1)
							{
								this.$refs.tip.show({
									title:"注册成功",
									type:"success",
									duration:1500,
									callback:function(){
										uni.navigateBack({})
									}
								})						       								
							}
							else{
								this.$refs.tip.show({
									title:res.data.message,
									type:"error",						
								})
							}
							
					})			
				}
			},
			sendCode(){
				console.log('this.form.email')
				console.log(this.form.email)
				console.log()
				if(!this.form.email==""){
					if(checkStr(this.form.email,'email')){
						let params = {
							mail:this.form.email
						}
						sendCheckCode(params).then(res=>{
							console.log(res.data.data);
							if(res.data.code==1)
							{
								this.result = "验证码发送成功";
								this.resultType = "success";
							}
							else{
								this.result = "验证码发送失败";
								this.resultType = "error";
							}
						})
					}
					else{
						this.result = "邮箱错误";
						this.resultType = "error";
					}
				}
				else{
					this.result = "邮箱为空";
					this.resultType = "error";
				}
				
				setTimeout(()=>{
					this.$refs.tip.show({
						title:this.result,
						type:this.resultType,							
					})
				},1300)
			},
		  async registerButton(){			
				await this.$refs.uUpload.upload()	
			}			
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
		
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 120rpx;
			margin-top: 70rpx;
		
			.half {
				width: 280rpx;
			}
		
			.send-code {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 220rpx;
				height: 100%;
				background-color: #000000;
				color: #e5e5e5;
				box-shadow: 0 0 0 1rpx #a5a5a5, 0 0 0 5rpx #ffffff inset;
				font-size: 28rpx;
			}
		}
		
		.login-box {
			position: relative;
			margin-top: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 120rpx;
			background-color: #000000;
			color: #e5e5e5;
			box-shadow: 0 0 0 1rpx #a5a5a5, 0 0 0 5rpx #ffffff inset;
			color: #FFFFFF;
		
			.right-icon {
				position: absolute;
				top: 40rpx;
				right: 50rpx;
				color: #e5e5e5;
			}
		}
	}
</style>
