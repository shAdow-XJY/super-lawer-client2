<template>
	<view class="root">
		<view class="top">用户注册</view>
		<view class="info">
			<u-form :model="form">
				<u-form-item label="用户名" label-width="200">
					<u-input v-model="form.passport"></u-input>
				</u-form-item>
				<u-form-item label="密码" label-width="200">
					<u-input v-model="form.password"></u-input>
				</u-form-item>
				<u-form-item label="Email" label-width="200">
					<u-input v-model="form.email"></u-input>
				</u-form-item>
				<u-form-item label="昵称" label-width="200">
					<u-input v-model="form.username"></u-input>
				</u-form-item>
				<u-form-item label="头像" label-width="200">
					<u-upload :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess" ></u-upload>
				</u-form-item>
				<u-form-item label="验证码" label-width="200">
					<u-input v-model="form.check_code"></u-input>
					<u-button type="mini">发送验证码</u-button>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
							passport:"",
							pwd:"",
							email:"",
							username:""
				},
				linkImg:"",
				action:"http://112.74.166.85:9000/v1/user/upload"
			}
			
		},
		methods: {
			onSuccess(data){
				this.linkImg=data.url
				console.log(this.linkImg)
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
	}
</style>
