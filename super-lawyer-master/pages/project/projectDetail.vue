<template>
	<view>
		<view class="tabList">
			<u-subsection :list="tablist" :current="0" mode="subsection" active-color="#0076ff" height="55"></u-subsection>
		</view>
		<view class="infoList">
			<u-cell-group :border="false">
				<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value" :arrow="item.key ==='企业详情' || (item.key ==='律师'&& project_status !=1)?true:false" :hover-class="item.value ===''?'cell-hover-class':'none'"  :title-style="titlestyle" @click = "clickCell(index,item.value)">				
				</u-cell-item>
				<u-cell-item  title="支付情况" :value="!pay_picture_url?'未支付':is_payment?'已支付':'审核支付凭证中'" :arrow="project_status==2" class="cell" @click="confirmPaying()" :title-style="titlestyle">
				</u-cell-item>	
			</u-cell-group>
		</view>
		<u-picker v-model="show" mode="selector" title="请选择律师" :range="lawyers" range-key="nickname" @confirm="confirm" @cancel="cancel"></u-picker>		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import{
		getProject,
		assign
	} from "../../network/project.js"
	import{
		formateDate
	}from "../../utils/util.js"
	import {
		getLawyers
	} from '../../network/lawyer.js'
	export default {
		data() {		
			return {
				info:[
					{
						"key":"项目名称",
						"value":"服务咨询"
					},
					{
						"key":"项目信息",
						"value":""
					},
					{
						"key":"企业详情",
						"value":""
					},
					{
						"key":"咨询需求",
						"value":""
					},
					
					{
						"key":"发起时间",
						"value":"2021-5-13"
					},
					{
						"key":"服务方案",
						"value":""
					},
					{
						"key":"服务时间",
						"value":"2022-5-13"
					},
					{
						"key":"律师",
						"value":"待选择律师"
					}				
				],				
				tablist:[
					{
						name:'基本信息'
					},
					{
						'name':'项目文档'
					}
				],
				titlestyle:{
					'font-size':'30rpx',				
					'font-weight':'550',
					'font-color' :'#000000'
				},
				projectId:'',
				show:false,
				selectLawyerId:"",
				lawyers:[],
				enterprise:{},
				lawyer:{},
				project_status:"",
				update:true,
				pay_picture_url:'',
				is_payment:''
			}
		},
		watch:{
			info:{
				handler:function(newVal,oldVal){
				},
				deep:true,
				immediate: true
			}
		},
		methods: {
			clickCell(index,value){
				console.log(index +""+ value)
				switch(index){
					case 2:{
						if(value){
							uni.navigateTo({
								url:"../enterprise/enterpriseDetail?enterpriseId=" + this.enterprise.id 
							})
						}
						break
					}
					case 7:{	
						 if(this.project_status === 0){
							 this.show = true
						 }
						else if(this.project_status === 2){
							console.log(this.lawyer)
							uni.navigateTo({
								url:"../lawyer/lawyerDetail?lawyerId=" + this.lawyer.id
							})
						}
					}
				}	
			},			 				
			async confirm(value){
				console.log(value[0])
				console.log(this.lawyers[value[0]].id)
				let params = {
					token:getApp().globalData.user_token
				}
				var that = this
				await assign(this.lawyers[value[0]].id,this.projectId,params).then(res =>{
					console.log(res)
					if(res.data.code === 1){
						that.$refs.uToast.show({
							title: "分配律师成功",
							type: 'success',					
						})
					}
					this.project_status = 1
					this.info[7].value ="等待律师确认"
					this.show =	false									
				})
			},
			async getProjectDetail(projectId = this.projectId){
				let params = {
					token:getApp().globalData.user_token
				}
				await getProject(params,projectId).then(res =>{
					if(res.data.code ===1){
						let detail = res.data.data.proj_detail
						console.log(detail) //会出现状态更新不及时的bug
						this.info[0].value = detail.project_name
						this.info[1].value = detail.project_content
						this.info[2].value = detail.from_name
						this.info[3].value =  detail.project_type					
						this.info[4].value = formateDate(new Date(detail.create_time))
						this.info[5].value = detail.project_type
						this.info[6].value = formateDate(new Date(detail.end_time))
						this.project_status = detail.status
						this.info[7].value = this.project_status === 0 ? "请点击选择律师": this.project_status === 1 ? "等待律师确认": detail.to_name
						this.enterprise = detail.enterprise
						this.lawyer = detail.lawer	
						this.is_payment = detail.is_payment					
						this.pay_picture_url = detail.pay_picture_url
					}
				})
			},
			confirmPaying(){
				let url = "../paying/paying?id=" + this.projectId + "&status=" + this.project_status ;
				if(this.pay_picture_url){
					url += "&url=" +encodeURIComponent(JSON.stringify(this.pay_picture_url));
				}
				if(this.is_payment){
					url += "&is_payment=" + 1
				}
				uni.navigateTo({
					url:url
				})
			}
		},
		onShow(){
			let params = {
				token:getApp().globalData.user_token
			}
			// this.getProjectDetail(this.projectId); 
			getLawyers(params).then(res =>{
				if(res.data.code === 1){
					this.lawyers =  res.data.data.lawers
				}
			})
		},
		onLoad(option){
			this.projectId = option.project_Id
			this.getProjectDetail(this.projectId)
			// this.$watch(function(){return this.info[7].value},function(newVal,oldVal){console.log(newVal);console.log(oldVal)},{immediate:true})
		},
		destroyed(){
			let page = getCurrentPages()[0]
			if(!page)return;
			page.$vm.changeProject(page.$vm.current)
		}     
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.tabList{
		padding: 0 30rpx;		
		margin-bottom: 40rpx;
	}
	.cell-hover-class {
		background-color: #f7f8f9 !important;
	}
	
	.infoList{
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.u-border-bottom::after{
		border-bottom-width: 2px;
		
	}
</style>

