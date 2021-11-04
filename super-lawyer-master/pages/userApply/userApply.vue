<template>
	<view>
		<u-subsection :list="authLists" :current="current" @change="changeAuth"></u-subsection>
		<view class="wrap" v-if="current == 1">
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
		
		<view class="root" v-if="current == 0">
			<view class="info">
				<u-form :model="form">
					<u-form-item label="企业营业执照" label-width="200" style="padding: 40rpx;">
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
import {ApplyLawyer} from '../../network/lawyer.js'
import {mapState,mapMutations} from 'vuex';
export default {
	data() {
		let that = this;
		return {			
			action:"http://112.74.166.85:9000/v1/file/upload?module=user-cover",
			//律师认证信息
			model: {
				  "business_license_url": "",
				  "degree": "",
				  "id_number": "",
				  "idcard_back_url": "",
				  "idcard_front_url": "",
				  "real_name": "",
				  "sex": '',
				  "working_time": ''
			},	
			//企业认证信息
			form:{
				name:"",
				address:"",
				code:"",
			},
			
			//律师表单
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
			//企业表单
			form:{
					name:"",
					address:"",
					code:"",
				},
				linkImg:"",							
				result:"",
				resultType:"",
				current:0,										
		};
	},
		
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		},
		...mapState({
			authLists: state => state.authLists
		})
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
	
	//企业表单认证
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
					bussiness_license_url: this.linkImg,
					enterprise_name: this.form.name,
					enterprise_add: this.form.address,
					institution_code: this.form.code,
					token: getApp().globalData.user_token
				}
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
	
	changeAuth(index){
		this.current = index;
	}
	
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
	
	.root{
			padding: 30rpx;
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