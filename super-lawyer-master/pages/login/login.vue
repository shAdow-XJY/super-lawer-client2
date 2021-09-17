<template>
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
					passport:"010",
					password:"123456"
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
