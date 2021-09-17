<template>
	<view>
		<view class="tabList">
			<u-subsection :list="tablist" :current="0" mode="subsection" active-color="#0076ff" height="55"></u-subsection>
		</view>
		<view class="infoList">
			<u-cell-group :border="false">
				<u-cell-item v-for="(item,index) in info" :title="item.key" :value="item.value" :arrow="item.value ===''?true:false" :hover-class="item.value ===''?'cell-hover-class':'none'"  :title-style="titlestyle">				
				</u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
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
						"key":"状态",
						"value":"待选择律师"
					}				
				],				
				tablist:[
					{
						name:'基本信息'
					},
					{
						'name':'项目文档'
					},
					{
						'name':'文档模板'
					}
				],
				titlestyle:{
					'font-size':'30rpx',				
					'font-weight':'550',
					'font-color' :'#000000'
				}
			}
		},
		methods: {
			
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
