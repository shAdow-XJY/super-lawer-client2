<template>
	<view class="wrap">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="['message']">
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120" :label-position="labelPosition" label="姓名" prop="name">
				<u-input  placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="sex">
				<u-input  type="select" :select-open="actionSheetShow" v-model="model.sex" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="所在地区" prop="regionText" label-width="150">
				<u-input  type="select" :select-open="pickerShow" v-model="model.regionText" placeholder="请选择地区" @click=" pickerShow = true"></u-input>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" :label-position="labelPosition" label="联系号码" prop="phone" label-width="150">
				<u-input  placeholder="请输入手机号" v-model="model.phone" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="验证码" prop="code" label-width="150">
				<u-input  placeholder="请输入验证码" v-model="model.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="学位" prop="qualification" label-width="150" >
				<u-input type="select" :select-open="selectShow" v-model="model.qualification" placeholder="请选择学位" @click="selectShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="开始从业时间" prop="workDate" label-width="150" >
				<u-input  type="select" :select-open="timePickerShow" v-model="model.workDate" placeholder="请选择从业起始时间" @click="timePickerShow = true" ></u-input>
			</u-form-item>
			<view class="fileTxt">资料上传</view>			
			<u-form-item :label-position="labelPosition" label="身份证正面照" prop="positiveIdCard"  label-width="150">
				<u-button slot="right" size="mini" @click="chooseFile($event,0)"><u-icon name="photo" size="30" margin-right="8rpx" label="上传文件" label-size="25"></u-icon></u-button>				
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="身份证背面照" prop="negativeIdCard" label-width="150">
				<u-button slot="right" size="mini" @click="chooseFile($event,1)" ><u-icon name="photo" size="30" margin-right="8rpx" label="上传文件" label-size="25"></u-icon></u-button>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="律师执照" prop="lawyerLicense" label-width="150">
				<u-button slot="right" size="mini" @click="chooseFile($event,2)"><u-icon name="photo" size="30" margin-right="8rpx;" label="上传文件" label-size="25"></u-icon></u-button>
			</u-form-item>			
		</u-form>
		<u-button @click="submit" type="success">提交</u-button>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" ></u-picker>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="qualificationConfirm" ></u-select>
		<u-picker mode="time" :params="params" v-model="timePickerShow" @confirm="timeConfirm" :end-year="nowdate.getFullYear()"></u-picker>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>	
	</view>
</template>

<script>
export default {
	data() {
		let that = this;
		return {			
			nowdate: new Date(),
			model: {
				name: '',
				sex: '',
				agreement: false,
				region: [],
				regionText:'',
				phone: '',
				code: '',
				remember: false,
				photo: [],
				qualification:'',
				qualificationNum:'',
				workDate:'',		
				positiveIdCard:'',
				negativeIdCard:'',
				lawyerLicense:'',
			},	
			selectList: [
				{
					value: 0,
					label: '学士'
				},
				{
					value: 1,
					label: '硕士'
				},
				{
					value: 2,
					label: '博士'
				},
				{
					value: 3,
					label: '其他'
				}
			],
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 7,
						message: '姓名长度在3到5个字符',
						trigger: ['change','blur'],
					},
					/* {
						validator: (rule, value, callback) => {							
							return this.$u.test.chinese(value);
						},
						message: '姓名必须为中文',						
						trigger: ['change','blur'],
					},	 */				
				],
				sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change',
					},
				],												
				regionText: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					},
				],		
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur']
					},
					{
						validator: (rule, value, callback) => {							
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['change','blur']
					}
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change','blur']
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change','blur']
					},
				],
				qualification: [
						{
							required: true,
							message: '请选择学位',
							trigger: 'change',
						},
					],
				workTimesRule:[
					{
						required: true,
						message: '请选择从业时间',
						trigger: 'change',
					}
				], 	
				positiveIdCard:[
					{
						required: true,	
						message: '请上传身份证正面照',
						trigger: 'change',
					},
				],
				negativeIdCard:[
					{
						required: true,	
						message: '请上传身份证反面照',
						trigger: 'change',
					},
				],
				lawyerLicense:[
					{
						required: true,	
						message: '请上传律师执照',
						trigger: 'change',
					},
				]
				
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
				{
					text: '保密'
				}
			],
			params:{
				year: true,
				month: false,
				day: false,
			},
			actionSheetShow: false,
			pickerShow: false,
			selectShow: false,
			timePickerShow:false,
			labelPosition: 'left',
			codeTips: '',
		};
	},
	
	onLoad(options) {
	  var that = this;
	  console.log(options.certificationStatus)
	  console.log(getApp().globalData.header)
	  if(options.certificationStatus == "1"){
	   uni.showModal({
	      title : "提示",
	      content : "您已提交申请，请等待系统审核。",
	      showCancel : false,
	      success(res){
	        if(res.confirm){
	         uni.navigateBack({
	            delta: 1,
	          })
	        }
	      }
	    })
	  }else{
	    if(options.certificationStatus == "2"){
	     uni.showModal({
	        title : "提示",
	        content : "您已认证通过，是否修改认证信息",
	        success(res){
	          if(res.cancel){
	           uni.navigateBack({
	              delta: 1,
	            })
	          }else{
	           uni.request({
	              url: getApp().globalData.baseUrl + "/api/user/lawyer/auth/" + getApp().globalData.userInfo.id +"/latestRecord" ,
	              method : "GET",
	              header : {
	                'cookie' :uni.getStorageSync("sessionid")
	              },
	              success : function(res){
	                if(res.data.code == 0){
	                  var item = res.data.entity
					  that.model.name = item.name;
					  that.model.phone = item.phoneNumber;
					  that.workTime = item.workTime;
					  that.model.sex = item.sex==0?'男':'女';
					  that.model.qualificationNum = item.degree;
					  that.model.positiveIdCard = item.positiveIdCard;
					  that.model.negativeIdCard = item.negativeIdCard;
					  that.model.lawyerLicense = item.lawyerLicense;
					  that.model.workdate = that.nowdate - that.workTime;
	                  that.model.qualification = parseInt(that.model.qualificationNum) == 0?"学士":
													parseInt(that.model.qualificationNum) == 1?"硕士":
																parseInt(that.model.qualificationNum) == 2?"博士":"其他";																							
	                }
	              }
	            })
	          }
	        }	
	      })
	    }
	  }
	},
		
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		},
		dateFormat(){
			return this.model.workDate.year?this.model.workDate.year + "-" + this.model.workDate.month + "-" + this.model.workDate.day:''; 
		},
		workTime(){
			return this.nowdate.getFullYear()-this.model.workDate.split("-")[0];
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.imageList = this.$refs.uUpload.lists;
	},
	methods: {
		submit() {
			var that = this;
			this.$refs.uForm.validate(valid => {
				if(valid){
					uni.request({
					  url: getApp().globalData.baseUrl + "/api/user/lawyer/auth/apply",
					  method: "POST",
					  header : {
					    'cookie' : uni.getStorageSync("sessionid")
					  },
					  data : {
					    account : getApp().globalData.userInfo.id,
					    name : that.model.name,
					    phoneNumber : that.model.phone,
					    sex : that.model.sex =="男"?0:1,
					    degree : that.model.qualificationNum,
					    workTime : that.workTime,
					    positiveIdCard : that.model.positiveIdCard,
					    negativeIdCard : that.model.negativeIdCard,
					    lawyerLicense : that.model.lawyerLicense,
					  },
					  success : function(res){
					    if(res.data.code == 0){
					      uni.showToast({
					        title: '申请成功',
					        icon : 'success',
					        duration : 1500,
					        complete : uni.navigateBack({
					          delta: 1,
					        })
					      })
					    }else{
					      console.log(res)
					      uni.showToast({
					        title: '申请失败',
					        icon : 'error',
					        duration : 1500
					      })
					    }
					  }
					})
					console.log('验证通过')
				}else {
					console.log(this.model)
					console.log('验证失败');
				}
			});
		},
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		// 选择地区回调
		regionConfirm(e) {
			this.model.regionText = e.province.label + '-' + e.city.label + '-' + e.area.label;
			this.model.region[0] = e.province.label;
			this.model.region[1] = e.city.label;
			this.model.region[2] = e.area.label;
		},
		qualificationConfirm(e){
			this.model.qualification = e[0].label;
			this.model.qualificationNum =  e[0].value;
			console.log(this.model.qualificationNum )
		},
		timeConfirm(e){
			this.model.workDate = e.year;
		},
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			if(this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		selectConfirm(e) {
			this.model.qualification = '';
			e.map((val, index) => {
				this.model.qualification += this.model.qualification == '' ? val.label : '-' + val.label;
			})
		},
		chooseFile(event,node){
		  var that = this;
		  uni.request({
		    url: getApp().globalData.baseUrl + "/oss/policy",
		    method : "GET",
		    header : {
		      'cookie' : uni.getStorageSync("sessionid")
		    },
		    success : function(res){
		      console.log(res.data.data)
		      if(res.data.code == 0){
		        var data = res.data.data
		        uni.chooseImage({
		          success : function(res){
		            const tempFilePath = res.tempFilePaths[0];
					console.log(tempFilePath)
		            var key =  "user/lawyer" + data.dir  + getApp().globalData.userInfo.id + "/"+  getApp().formatFileName(tempFilePath);
					switch(node){
						case 0: {
							that.model.positiveIdCard = key;
							// console.log(that.model.positiveIdCard)						
							break
						}
						case 1:{
							that.model.negativeIdCard = key;
							// console.log(that.model.negativeIdCard)
							break
						}
						case 2:{
							that.model.lawyerLicense = key;
							// console.log(that.model.lawyerLicense)							
							break
						}
					}
		            uni.uploadFile({
		              filePath: tempFilePath,
		              name: "file",
		              url: 'https://lawyer-sys.oss-cn-guangzhou.aliyuncs.com' ,
		              header: {
		                "Content-Type": "multipart/form-data",
		              },
		              method : "POST",
		              formData : {
		                key : key,
		                policy : data.policy,
		                OSSAccessKeyId : data.accessid,
		                signature : data.signature,
		                success_action_status:"200",
		                // callback : data.callback
		              },
		              success:function(res){
						  console.log("Success uploadFile")
		              },
		              fail(res){
		                uni.showToast({
		                  title: '上传失败',
		                  icon: 'error',
		                  duration : 1500
		                })
		              }
		            })
		          }
		        })
		      }
		    }
		  })
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
</style>