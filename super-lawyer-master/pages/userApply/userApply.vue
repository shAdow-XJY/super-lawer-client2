<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="['message']">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="真实姓名" prop="real_name">
				<u-input  placeholder="请输入真实姓名" v-model="model.real_name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="身份证号" prop="id_number">
				<u-input  placeholder="请输入真实姓名" v-model="model.id_number" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input  type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学位" prop="degree" label-width="150" >
				<u-input type="select" :select-open="selectShow" v-model="model.degree" placeholder="请选择学位" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="工作时长" prop="working_time" label-width="150" >
				<u-input  placeholder="请输入工作时长" v-model="model.working_time" type="text"></u-input>
			</u-form-item>
			<view class="fileTxt">资料上传</view>			
			<u-form-item :label-position="labelPosition" label="身份证正面照" prop="idcard_front_url"  label-width="150">
				<u-upload ref="UploadCf" :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess1" :auto-upload="false"></u-upload>				
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="身份证背面照" prop="idcard_back_url" label-width="150">
				<u-upload ref="UploadCb" :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess2" :auto-upload="false"></u-upload>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="律师执照" label-width="150">
				<u-upload ref="UploadL" :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess3" :auto-upload="false"></u-upload>
			</u-form-item>			
		</u-form>
		<u-button @click="submit" type="success">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="qualificationConfirm" ></u-select>	
		<u-toast :title="result" :type="resultType" ref="tip"/>
	</view>
</template>

<script>
import {ApplyLawyer} from '../../network/lawyer.js'
	
export default {
	data() {
		let that = this;
		return {			
			action:"http://112.74.166.85:9000/v1/file/upload?module=user-cover",
			model: {
				  "business_license_url": "",
				  "degree": "",
				  "id_number": "545615615156",
				  "idcard_back_url": "",
				  "idcard_front_url": "",
				  "real_name": "阿梓从小就很可爱",
				  "sex": '',
				  "working_time": ''
			},	
			selectList: [
				{
					value: '学士',
					label: '学士'
				},
				{
					value: '硕士',
					label: '硕士'
				},
				{
					value: '博士',
					label: '博士'
				},
				{
					value: '其他',
					label: '其他'
				}
			],
			rules: {
				real_name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
				],
				sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change',
					},
				],																				
				degree: [
						{
							required: true,
							message: '请选择学位',
							trigger: 'change',
						},
					],
				working_time:[
					{
						required: true,
						message: '请输入就业时长',
						trigger: 'change',
					}
				], 	
				idcard_front_url:[
					{
						required: true,	
						message: '请上传身份证正面照',
						trigger: 'change',

					},
				],
				idcard_back_url:[
					{
						required: true,	
						message: '请上传身份证反面照',
						trigger: 'change',

					},
				],							
			},
			check: false,
			selectStatus: 'close',
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
			],		
			actionSheetShow: false,
			pickerShow: false,
			selectShow: false,
			labelPosition: 'left',
		};
	},
	
		
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		},
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},	
		qualificationConfirm(e){
			this.model.degree = e[0].label;
			this.model.degree =  e[0].value;
			console.log(this.model.degree )
		},
	 submit(){		
			var that = this;
			this.$refs.UploadCf.upload()	
			
		},
	onSuccess1(data){
		console.log(data)
		this.model.idcard_front_url= data.data.url	
		this.$refs.UploadCb.upload()
		
	},
	onSuccess2(data){
		console.log(data)
		this.model.idcard_back_url= data.data.url
		this.$refs.UploadL.upload()	
	},
  	onSuccess3(data){
		console.log(data)
		var that = this
		this.model.business_license_url= data.data.url
		if(this.model.business_license_url != null){
			this.$refs.uForm.validate(valid => {
				if(valid){	
					console.log('验证通过')				
				    let params = {
						token:getApp().globalData.user_token
					}
				   this.model.sex = this.model.sex =="男"?1:0;
			       ApplyLawyer(params,this.model).then(res =>{
						console.log(res)
						if(res.data.code==1)
						{
							this.$refs.tip.show({
								title:"已提交认证信息，请等待管理员审核！",
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
					
				}else {
					console.log(this.model)
					console.log('验证失败');
				}
			});
		}		
	},
	
	
}
};
</script>

<style lang="scss">
	page{
		background-color: #ffffff;
	}
	.wrap {
		padding: 30rpx;
	}
	.u-border-bottom::after{
		border-bottom-width: 5rpx !important;
	 }
	.fileTxt{
		padding: 20rpx 0rpx;
		font-size: 42rpx;
		font-weight: bold;
		font-family: "微软雅黑";
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