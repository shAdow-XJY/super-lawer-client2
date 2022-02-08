<template>

	<u-cell-group class="">
		<u-cell-item class="item_box" v-for="(item,index) in resultList" :arrow="true" @click="nevigateTo('../archive/archive?id='+item.project_id)">
			<image class="item_icon" src="../../static/works/workicon_0.png"></image>
			<view class="msg">
				<view class="subTitle msg">{{item.project_type}}</view></br>
				<view class="enterprise msg">{{item.company}}公司</view></br>
				<view class="arrangementTime msg">发起时间：{{item.create_time}}</view>
			</view>
		</u-cell-item>
	</u-cell-group>


</template>

<script>
	import {
		getList
	} from '../../network/work.js'
	import {
		formateDate
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				statusList: [],
				resultList: [{
					project_id:'999',
					project_type: '咨询服务',
					company: 'xx',
					create_time: '2021-5-13'
				}],
				key: "",
				type:'end'
			}
		},

		methods: {
			nevigateTo: function(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 800,
					fail() {
						uni.switchTab({
							url: url
						});
					}
				});
			}
		},


		onLoad(option) {
			//获取数据
			let params = {
				token: getApp().globalData.user_token
			}
			
			getList(params,this.type).then(res => {
				// console.log(res.data.data.proj_detail)
				console.log(this.type)
				if (res.data.code === 1) {
					// this.resultList = res.data.data.resultList
					// this.resultList.commit_time = formateDate(this.resultList.commit_time)
					// this.resultList.create_time = formateDate(this.resultList.create_time)
					// this.resultList.end_time = formateDate(this.resultList.end_time)
				}
			})
			
		}


	}

</script>

<style>
	.item_icon {
		float: left;
		width: 100rpx;
		height: 100rpx;
		border-radius: 60rpx;
		margin-bottom: 10rpx;
		margin-top: 25rpx;
		margin-left: 10rpx;
		margin-right: 20rpx;

	}

	.item_box {
		float: left;
		flex-direction: row;
		align-items: center;
		/*图字图 在一行居中*/
		padding: 10rpx;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 20rpx;
	}

	.msg {
		float: left;

		justify-content: left;
		position: relative;
	}

	.subTitle {
		font-weight: bold;
		font-size: 35rpx;
		color: #000000;
	}

	.enterprise {

		font-size: 31rpx;

	}

	.arrangementTime {

		font-size: 31rpx;

	}
</style>
