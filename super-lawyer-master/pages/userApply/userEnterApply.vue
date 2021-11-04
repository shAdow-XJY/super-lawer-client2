<template>
	<view >
		<view class="root">
			<view class="top">用户注册</view>
			<view class="info">
				<u-form :model="form">
					<u-form-item label="企业营业执照" label-width="200">
						<u-upload :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess" ></u-upload>
					</u-form-item>
					<u-form-item label="企业名称" label-width="200">
						<u-input v-model="form.name"></u-input>
					</u-form-item>
					<u-form-item label="企业地址" label-width="200">
						<u-input v-model="form.address"></u-input>
					</u-form-item>
					<u-form-item label="企业代码" label-width="200">
						<u-input v-model="form.code"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="login-box" @click="registerButton">
				<text>提交</text>
				<text class="right-icon">→</text>
			</view>
			<u-toast :title="result" :type="resultType" ref="tip"/>
		</view>
	</view>	
</template>

<script>
	import {enterpriseApply} from "../../network/user.js"
	export default {
		data() {
			return {
				form:{
					name:"",
					address:"",
					code:"",
				},
				linkImg:"",
				action:"http://112.74.166.85:9000/v1/file/upload?module=enterprise-license",
				
				result:"",
				resultType:"",				
			}
			
		},
		methods: {
			onSuccess(data){
				console.log(data);
				this.linkImg=data.data.url
				console.log(this.linkImg)
			},
		    registerButton(){
				let all = true;
				this.resultType = "success";
				
				if(this.form.name==""){
					this.result = "企业名称为空";
					all = false;
				}
				if(this.form.address==""){
					this.result = "企业地址为空";
					all = false;
				}
				if(this.form.code==""){
					this.result = "企业代码为空";
					all = false;
				}
				if(this.linkImg==""){
					this.result = "企业营业执照为空";
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
						business_license_url: this.linkImg,
						enterprise_name: this.form.name,
						enterprise_add: this.form.address,
						institution_code: this.form.code,
						token: getApp().globalData.user_token
					}
					console.log("business_license_url")
					console.log(params);
					
					enterpriseApply(params).then(res=>{
							console.log(res.data);
							if(res.data.code==1)
							{
								this.$refs.tip.show({
									title:"提交成功，待审核",
									type:"success",						
								})
								
								setTimeout(()=>{
									uni.navigateBack({
										delta: 1
									})
								},1500)
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
	
	},
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
