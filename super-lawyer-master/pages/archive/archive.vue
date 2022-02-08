<template>
	<view>
		<view class="infolist">
			<u-cell-group :border="false">
				<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value"  :title-style="titlestyle" :arrow="item.arrow">				
				</u-cell-item>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	import {
		getDetail
	} from "../../network/archive.js"
	import{
		formateDate
	}from "../../utils/util.js"
	export default {
		data() {
			return {
				info:[
					{
						'key':'归档时间',
						'value':'xxx-xxxx',
						'arrow': false
					},
					{
						'key':'归档编号',
						'value':'xxxxx',
						'arrow': false
					},
					{
						'key':'企业详情',
						'value':'',
						'arrow': true
					},
					{
						'key':'服务方案',
						'value':'',
						'arrow': true
					},
					{
						'key':'开始时间',
						'value':'2018-5-13',
						'arrow': false
					},
					{
						'key':'结束时间',
						'value':'2022-5-13',
						'arrow': false
					}
				],
				titlestyle:{
					'font-size':'30rpx',				
					'font-weight':'520',
					'color' :'#000000'
				},
				business_license:''
			}
		},
		methods: {
			
		},
		onLoad(option) {
			let id = option.id	
			
			let params = {
				token: getApp().globalData.user_token
			}
			if(id){console.log(id)	
				getDetail(params,id).then(res =>{
					if(res.data.code ==1){
							
						console.log(res.data.data.info)
						this.info[0].value = formateDate(res.data.data.info.archive_time)
						this.info[1].value = res.data.data.info.archive_no
						this.info[4].value = formateDate(res.data.data.info.begin_time)		
						this.info[5].value = formateDate(res.data.data.info.end_time)
					}
				})
			}						
		}
	}
</script>

<style>
.u-border-bottom::after{
		border-bottom-width: 2px;
}
.infolist{
	margin-top: 20rpx;
}
.license .title{
		font-size: 30rpx;
		font-weight:520;
		font-family: "微软雅黑";
		color: #000000;
		margin:40rpx 30rpx;
}
.license image{
	margin-top: 20rpx;
	margin-left: 50rpx;
}
</style>
