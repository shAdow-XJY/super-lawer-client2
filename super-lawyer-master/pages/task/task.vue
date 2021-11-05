<template>
	<view v-if="update">	
		<view class="header">
			<view class="info">
				<view class="title">
					项目内容
				</view>
				<view class="message">
					<view v-if="buttonShow">
						系统为您分配了一个新的项目,请决定是否承接
						<u-cell-group :border="false">
							<u-cell-item  bg-color="#ffffff" title="项目名称" :value="project_detail.project_name" :arrow="false" class="cell"></u-cell-item>
						</u-cell-group>
					</view>					
					<u-cell-group v-else>
						<u-cell-item  bg-color="#ffffff" title="项目名称" :value="project_detail.project_name" :arrow="false" class="cell"></u-cell-item>
						<u-cell-item  bg-color="#ffffff" title="项目类型" :value="project_detail.project_type" :arrow="false" class="cell"></u-cell-item>
						<u-cell-item  bg-color="#ffffff" title="支付情况" :value="!project_detail.pay_picture_url?'未支付':project_detail.is_payment?'已支付':'审核支付凭证中'" :arrow="project_detail.status==2" class="cell" @click="project_detail.status==2?uploadPaying():''"></u-cell-item>
					</u-cell-group>
					
				</view>
				<view class="date" v-if="buttonShow">
					<u-icon size="50rpx" color="#fce100" name="warning" style="margin-right: 10rpx; float: left"></u-icon>					
					<view style="font-size: 30rpx; float: left;margin-top: 8rpx;">请在{{project_detail.end_time}}前完成操作</view>
				</view>
			</view>
		</view>
		<view class="pro_bt">
			<u-row style="margin: 50rpx;">
				<u-col span="6">	
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" :title="party+'详情'" :label="'查看'+party+'信息'" :title-style="titlestyle" :label-style="labelstyle" center @click="clickCompanyInfo()">
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
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="服务方案" label="查看服务方案" :title-style="titlestyle" :label-style="labelstyle" center @click="clickServerInfo()">
						<u-icon name="xinhao" custom-prefix="custom-icon" slot="right-icon" size="50"></u-icon>
					</u-cell-item>								
				</u-col>				
				<u-col span="6">
					<u-cell-item class="u-cell" :border-bottom="false" bg-color="#ffffff" :arrow="false" title="服务时间" :label="project_detail.commit_time+'至'+project_detail.end_time" :title-style="{'font-size':'26rpx','font-weight':'bold','font-family':'微软雅黑','padding-top':'30rpx'}" :label-style="labelstyle" center>
						<u-icon name="clock" slot="right-icon" size="70"></u-icon>
					</u-cell-item>
				</u-col>
			</u-row>
			<view class="bt" v-if="buttonShow">
				<button class="button" type="default" style="background-color: #1aad19;" hover-class="s-bg-light" @click="clickButton($event,1)"><text class="txt">同意</text></button>
				<button class="button" type="default" style="background-color: #c64128;" hover-class="w-bg-light" @click="clickButton($event,2)"><text class="txt">拒绝并申述</text></button>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-toast :title="result" :type="resultType" ref="tip"/>
		<u-modal v-model="modelShow" :content="content"></u-modal>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import{
		getProject,
		agree
	}from '../../network/project.js'
	import{
		formateDate
	}from '../../utils/util.js'
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
				project_detail:{},	
				modelShow:false,
				update:true
			}
			
		},
		methods: {
			clickCompanyInfo(){
				console.log(this.party)
				if(this.party == "企业"){
					if(this.project_detail)
					uni.navigateTo({
						url:"../enterprise/enterpriseDetail?enterpriseId=" + this.project_detail.enterprise.id
					})
				}else{
					if(this.project_detail.status == 2){
						uni.navigateTo({
							url:"../lawyer/lawyerDetail?lawyerId=" + this.project_detail.lawer.id
						})
					}
					else{
						let message = this.project_detail.status == 0?"尚未分配律师，请联系管理员分配律师!":"已分配律师，请等待律师确认!"
						this.$refs.tip.show({
							title:message,
							type:"warning",
							duration:1500,							
						})	
					}
										
				}
				
			},
			clcikDemandInfo(){
				uni.navigateTo({
					url:""
				})
			},
			clickServerInfo(){
				uni.navigateTo({
					url:"../service/serviceFangan?serviceId=" + this.project_detail.service.id
				})
			},
		 async clickButton(e,type){
					var that = this
					that.model = true
					let params ={
						token: getApp().globalData.user_token
					}
				 await agree(type,this.project_detail.id,params).then(res=>{
						console.log(res)
						if(res.data.code ===1){
							that.$refs.uToast.show({
								title: "操作成功",
								type: 'success',
								duration: 1000
							})
							console.log("type = " + type)
							setTimeout(()=>{
								if(type === 2){
									uni.switchTab({
										url:"./taskList"
									})								
								}
							},2000)
							
						}						
					})	
				if(type ===1){
					await getProject(params,this.project_detail.id).then(res=>{
						if(res.data.code ===1){
							console.log(res.data.data.proj_detail)
							this.project_detail = res.data.data.proj_detail
							this.project_detail.commit_time = formateDate(this.project_detail.commit_time)
							this.project_detail.create_time = formateDate(this.project_detail.create_time)
							this.project_detail.end_time = formateDate(this.project_detail.end_time)
							this.update = false						
							this.$nextTick(()=>{
								this.update = true							
							})																										
						}
					})
				}	 
				},	
			uploadPaying(){
				console.log(this.project_detail)
				console.log(this.project_detail.pay_picture_url)
				
				uni.navigateTo({
					url:"../paying/paying?id=" + this.project_detail.id + "&status=" + this.project_detail.status +" &url=" + encodeURIComponent(JSON.stringify(this.project_detail.pay_picture_url))
				})
			}
		},
		
		computed:{
			...mapGetters([
				'tabBarList'
			]),
			buttonShow(){
				switch(getApp().globalData.user_type){
					case "律师用户":{
						return this.project_detail.status !=2?true:false
						break
					}
					case "企业用户":{
						return false
						break
					}
				}
			},
			party(){
				if(getApp().globalData.user_type== "律师用户"){
					return "企业"
				}else{
					return "律师"
				}
			}
		},
		onShow(){
			//模拟获取数据			
			let params = {
				token : getApp().globalData.user_token
			}
			getProject(params,this.projectId).then(res=>{
				console.log(res.data.data.proj_detail)
				if(res.data.code ===1){
					this.project_detail = res.data.data.proj_detail
					this.project_detail.commit_time = formateDate(this.project_detail.commit_time)
					this.project_detail.create_time = formateDate(this.project_detail.create_time)
					this.project_detail.end_time = formateDate(this.project_detail.end_time)					
				}
			})
		},
		onLoad(option){
			this.projectId = option.project_Id;
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
		height: 550rpx;
		border-bottom:#d7d6e0 solid 4rpx;
		border-bottom-left-radius: 50rpx;
		border-bottom-right-radius:50rpx ;
		padding-left: 30rpx;
		.info{
			height: 400rpx;
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
				margin-top: 110rpx;
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
	.cell{
		height: 30rpx !important ;
	}
</style>
