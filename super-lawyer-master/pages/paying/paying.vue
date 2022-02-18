<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="setting-fill" title="企业支付凭证" :value="src?'已上传支付凭证':'未上传支付凭证'"></u-cell-item>
		</u-cell-group>		
		<view class="upload" v-if="projectStatus == 2 && user_type =='企业用户' && src =='' ">			
			<h3>请上传企业支付凭证:</h3>
			<u-row gutter="12" align="bottom">
				<u-col span="4" offset="4">
					<u-upload :action="action" ref="uUpload" :auto-upload="false" max-count="1" class="u" @on-Success="onSuccess"></u-upload>
				</u-col>
			</u-row>
			<u-button @click="upload" v-if="projectStatus == 2">提交</u-button>			
		</view>
			
		<view class="paying" v-if="src != ''">
			<u-image width="650rpx" height="600rpx" border-radius="10rpx" :src="src"></u-image>	
		</view>			
		<view class="btn" v-if="user_type =='管理员' && src && !is_payment">
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
	import{uploadPaying,confirmUploadPaying} from "../../network/enterprise.js"
	export default {
		data() {
			return {
				projectId:'',
				projectStatus:'',
				action:"http://112.74.166.85:9000/v1/file/upload?module=user-cover",
				linkImg:'',
				src:'',
				is_payment:''
			}
		},
		computed:{
			user_type(){
				return getApp().globalData.user_type
			}
		},
		methods: {
		 onSuccess(data){
			console.log(data);
			this.linkImg=data.data.url
			let that = this
			let params ={
				token:getApp().globalData.user_token
			}
			uploadPaying(params,this.projectId,this.linkImg).then(res=>{
				console.log(res)
				if(res.data.code == 1){
					this.$refs.tip.show({
						title:"已提交支付凭证，请等待管理员审核！",
						type:"success",
						duration:1500,
						callback:function(){
							uni.navigateBack({
								success:(res)=>{
									let pages = getCurrentPages()
									console.log(pages)
									let page = pages[pages.length - 1]
									if(!page)return;
									page.$vm.isPaying(that.linkImg)
								}
							})						
						}
					})
				}
			})	
			},
			upload(){
				this.$refs.uUpload.upload()
			},
			confirm(result){
				let params ={
					token:getApp().globalData.user_token
				}
				confirmUploadPaying(params,this.projectId,result).then(res =>{
					console.log(res)
					if(res.data.code == 1){
						this.$refs.tip.show({
							title:"操作成功",
							type:"success",
							duration:1500,
							callback:function(){
								uni.navigateBack({	
									success:(res)=>{
										let pages = getCurrentPages()
										console.log(pages)
										let page = pages[pages.length - 1]
										if(!page)return;
										page.$vm.getProjectDetail().then(res =>{
											page.$vm.is_payment = true;
										})
									}
								})
							}
						})
					}
				})
			}
		},
		onLoad(data){
			console.log(data)
			this.projectId = data.id;
			this.projectStatus = data.status;
			if(data.url){
				this.src = JSON.parse(decodeURIComponent(data.url));
			}
			if(data.is_payment){
				this.is_payment = data.is_payment;
			}
			
		}
	}
</script>

<style>
	.paying image{
		text-align: center;
		margin-top: 20rpx;
		margin-left: 50rpx;
	}
	.btn{
		height: 80rpx;
		margin: 80rpx 0;
		padding: 0 30rpx;
	}
	.upload{	
		text-align: center;		
		font-size: 40rpx;
		font-weight: bolder;
		margin-top: 20rpx;
	}	
</style>
