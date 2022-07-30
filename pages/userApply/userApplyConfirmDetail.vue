<template>
	<view>
		<u-cell-group>
			<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value" v-if="item.value !=''" :arrow="false"></u-cell-item>
		</u-cell-group>
		<view class="idCard" v-if="userType =='lawer'">
			<view class="title" >身份证正面照</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="idcard_front"></image>
			<view class="title" >身份照背面照</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="idcard_back"></image>
		</view>	
		<view class="license">
			<view class="title" >{{userType == 'lawer'?'律师营业执照':'企业营业执照'}}</view>
			<image width="650rpx" height="600rpx" border-radius="10rpx" :src="business_license"></image>
		</view>
		
		<view class="btn">
			<u-row gutter="12">
				<u-col span="5" >
					<u-button type="primary" @click="confirm(1)">同意</u-button>
				</u-col>
				<u-col span="5" offset="2">
					<u-button type="error" @click="confirm(0)">拒绝</u-button>
				</u-col>
			</u-row>		
		</view>
		
		<u-toast :title="result" :type="resultType" ref="tip"/>
	</view>
</template>

<script>
	
	import {getAuthDetail,confirm} from "../../network/user.js"
	import {formateDate} from "../../utils/util.js"
	export default {
		data() {
			return {
				info:[
					{
						'key':'认证类型', //0
						'value':''
					},
					{
						'key':'真实姓名', //1
						'value':''
					},
					{
						'key':'身份证号', //2
						'value':''
					},
					{
						'key':'性别', //3
						'value':''
					},
					{
						'key':'学位',  //4
						'value':''
					},
					{
						'key':'认证提交时间', //5
						'value':''
					},
					{
						'key':'工作时间',  //6
						'value':''
					},
					{
						'key':'企业名称',  //7
						'value':''
					},
					{
						'key':'企业地址',  //8
						'value':''
					},
					{
						'key':'注册时间', //9
						'value':''
					},	
					{
						'key':'企业编号', //10
						'value':''
					}
				],
				idcard_front:'',
				idcard_back:'',
				business_license:'',
				userType:'',
				confirmData:{
					id:0,
					authType:'',
					result:0
				},
				
			}
		},
		methods: {
			confirm(index){			
				let params = {
					token: getApp().globalData.user_token
				}		
			   
				this.confirmData.result = index
				console.log(this.confirmData)
				confirm(params,this.confirmData).then(res =>{
					console.log(res)
					if(res.data.code ==1){
						this.$refs.tip.show({
							title:res.data.message,
							type:"success",
							duration:1500,	
							callback:function(){
								uni.navigateBack({
									
								})
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
	async onLoad(option) {
			this.userType = option.auth_type;
			let data = {
				authType: option.auth_type,
				id:option.id
			}		    
			let params = {
				token:getApp().globalData.user_token
			}			
			await getAuthDetail(params,data).then(res =>{
				console.log(res)
				if(res.data.code == 1){
					this.confirmData.id = res.data.data.auth_info.auth_info.id;
					this.confirmData.authType = res.data.data.auth_info.auth_type;
					this.info[0].value = res.data.data.auth_info.auth_type;
					if(this.info[0].value == "lawer"){
						this.info[2].value = res.data.data.auth_info.auth_info.id_number;
						this.info[1].value = res.data.data.auth_info.auth_info.real_name;						
						this.info[3].value = res.data.data.auth_info.auth_info.sex;
						this.info[4].value = res.data.data.auth_info.auth_info.degree;
						this.info[5].value = formateDate(res.data.data.auth_info.auth_info.auth_time);
						this.info[6].value = res.data.data.auth_info.auth_info.working_time;
						this.info[9].value = formateDate(res.data.data.auth_info.auth_info.create_time);
						this.idcard_front = res.data.data.auth_info.auth_info.idcard_front
						this.idcard_back = res.data.data.auth_info.auth_info.idcard_back
						this.business_license = res.data.data.auth_info.auth_info.business_license
					}						
					else if(this.info[0].value == "enterprise"){
						this.info[7].value = res.data.data.auth_info.auth_info.enterprise_name;
						this.info[8].value = res.data.data.auth_info.auth_info.enterprise_add;
						this.info[9].value = res.data.data.auth_info.auth_info.institution_code;
						this.info[5].value = formateDate(res.data.data.auth_info.auth_info.auth_time);
						this.info[9].value = formateDate(res.data.data.auth_info.auth_info.create_time);
						this.business_license = res.data.data.auth_info.auth_info.business_license
					}
				}
			})
			
		}
	}
</script>

<style>
	.idCard .title,.license .title{
			font-size: 40rpx;
			font-weight:800;
			font-family: "微软雅黑";
			text-align: center;
			color: #000000;
			margin:40rpx 30rpx;
	}
	.idCard image,.license image{
		text-align: center;
		margin-top: 20rpx;
		margin-left: 50rpx;
	}
	.btn{
		height: 80rpx;
		margin: 80rpx 0;
		padding: 0 30rpx;
	}
</style>
