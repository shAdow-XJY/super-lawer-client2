<template>
	<view class="wrap">
		<!-- prop 指定校验的规则，否则无法进行判断 -->
		<u-form :model="formData" ref="uform" :rules="rules" :errorType="['message']">
			<u-form-item label="项目名称" prop="project_name"><u-input v-model="formData.project_name" /></u-form-item>
			<u-form-item label="项目类型" prop="project_type">
				<u-radio-group v-model="formData.project_type" @change="projectTyepChange">
					<u-radio v-for="(item,index) in projectTypes" :key="index" :name="item.name">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="服务方案" prop="service_id">
				<u-radio-group v-model="formData.service_id" @change="serviceChange">
					<u-radio v-for="(item,index) in serviceList" :key="index" :name="item.id">
						{{item.price + "/月   " + item.service_name + "    " + item.service_content}} 
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="结束日期" prop="end_time">
				<u-input type="select"  v-model="formData.end_time" placeholder="请选择结束日期" @click="show = true"></u-input>
			</u-form-item>
			<u-form-item label="咨询内容" label-position="top" prop="project_content">
				<u-input type="textarea" border="true" height="100" autoHeight v-model="formData.project_content"></u-input>
			</u-form-item>
			<u-calendar v-model="show" mode ="date" @change="timeChange" max-date="2099-12-31"></u-calendar>
			<u-button @click="submit" type="success">提交</u-button>
		</u-form>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import{
		getServiceFangan
	}from"../../network/service.js"
	import{
		createProject
	}from "../../network/project.js"
	export default {
		data() {
			return {
				show:false,
				projectTypes:[
					{
						name:"法律咨询"
					},
					{
						name:"法律诉讼"
					}
				],
				serviceList:[],
				formData:{
					end_time:'',
					project_content:'',
					project_name: '',
					project_type:'',
					service_id: '',
				},	
				rules:{
					project_name:[{
						required:true,
						message:'请输入项目名称',
						trigger: 'blur',
					}],
					end_time:[{
						required:true,
						message:'请选择结束时间',
						trigger: 'blur',
					}],
					service_id:[{
						required:true,
						type:"number",
						message:'请选择服务类型',
						trigger: 'blur',
					}],
					project_type:[{
						required:true,
						message:'请选择项目类型',
						trigger: 'blur',
					}]
				}
				
			}
		},
		methods: {
			timeChange(e){
				console.log(e)
				let date = new Date(e.result)
				this.formData.end_time = date
			},
			projectTyepChange(e){
				console.log(e)
			},
			serviceChange(e){
				console.log(e)
			},
			submit(){
				var that = this
				this.$refs.uform.validate(valid=>{
					console.log(valid)
					if(valid){
						let params ={
							token:getApp().globalData.user_token
						}
						console.log(that.formData)
						
						createProject(params,that.formData).then(res=>{
							console.log(res)
							if(res.data.code ===1){
								that.$refs.uToast.show({
									title: res.data.message,
									type: 'success',
									duration: 1000
								})
								
							}
							// setTimeout(()=>{
							// 	uni.switchTab({
							// 		url:"../task/taskList"
							// 	})
							// },1000)
						})
					}else{
						console.log("验证不通过")
					}
				})
			}
		},
		onLoad(){
			let params = {
				token: getApp().globalData.user_token
			}
			getServiceFangan(params).then(res =>{
				console.log(res)
				if(res.data.code ==1){
					this.serviceList = res.data.data.services
				}
			})
		},
		onReady(){
			console.log(this.$refs.uform)
			//注意有坑：
			//1.此处的ref为小写，即使上面写的是大写
			//2.此处需要对ref进行规则绑定，否则无法进行校验
			this.$refs.uform.setRules(this.rules);
		}
	}
</script>

<style>
	.wrap {
		padding: 30rpx;
	}
	.u-border-bottom::after{
		border-bottom-width: 5rpx !important;
	 }
	 .u-form-item--left{
	 	flex:0 0 190rpx !important
	 }
	 .u-upload{
	 	padding-left: 350rpx;
	 }
	 .u-form-item--left__content__label{
	 	font-size: 30rpx;
	 	font-family: "微软雅黑";
	 	font-weight: 600
	 }
</style>
