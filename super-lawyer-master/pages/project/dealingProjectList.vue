<template>

	<u-cell-group class="">
		<u-cell-item class="item_box" v-for="(item,index) in resultList" :arrow="true" @click="nevigateTo('projectDetail')">
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
					project_type: '咨询服务',
					company: 'xx',
					create_time: '2021-5-13'
				}],
				key: "",
				type:'running'
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
				console.log(res.data.data.proj_detail)
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


	//   /**
	//    * 生命周期函数--监听页面加载
	//    */
	//   onLoad: function (options) {
	//     if(options.fromLawyer != null){
	//       this.setData({
	//         fromLawyer : options.fromLawyer
	//       })
	//     }else{
	//       this.setData({
	//         statusList : JSON.parse(options.index)
	//       })
	//     }

	//   },

	//   /**
	//    * 生命周期函数--监听页面初次渲染完成
	//    */
	//   onReady: function () {

	//   },

	//   /**
	//    * 生命周期函数--监听页面显示
	//    */
	//   onShow: function () {
	//     var that = this;
	//     if(that.data.fromLawyer != null){
	//       this.getLawyerProjectList();
	//     }else{
	//       this.getSystemProjectList();
	//     }

	//   },
	//   getLawyerProjectList : function(){
	//     var that = this;
	//     if(that.data.fromLawyer == "新分配"){
	//       wx.request({
	//         url: app.globalData.baseUrl + "/api/project/lawyer/" + app.globalData.userInfo.id + "/newList",
	//         method : "GET",
	//         header : {
	//           'cookie' : wx.getStorageSync("sessionid")
	//         },
	//         success : function(res){
	//           if(res.data.code == 0){
	//             that.setData({
	//               resultList : res.data.list
	//             })
	//           }else{
	//             wx.showModal({
	//               title : "提示",
	//               content : "获取数据失败,请重试",
	//               showCancel : false
	//             })
	//           }
	//         }
	//       })
	//     }else{
	//       if(that.data.fromLawyer == "在办"){
	//         wx.request({
	//           url: app.globalData.baseUrl + "/api/project/lawyer/" + app.globalData.userInfo.id + "/nowList",
	//           method : "GET",
	//           header : {
	//             'cookie' : wx.getStorageSync("sessionid")
	//           },
	//           success : function(res){
	//             if(res.data.code == 0){
	//               that.setData({
	//                 resultList : res.data.list
	//               })
	//             }else{
	//               wx.showModal({
	//                 title : "提示",
	//                 content : "获取数据失败,请重试",
	//                 showCancel : false
	//               })
	//             }
	//           }
	//         }) 
	//       }else{
	//         wx.request({
	//           url: app.globalData.baseUrl + "/api/project/lawyer/" + app.globalData.userInfo.id + "/endList",
	//           method : "GET",
	//           header : {
	//             'cookie' : wx.getStorageSync("sessionid")
	//           },
	//           success : function(res){
	//             if(res.data.code == 0){
	//               that.setData({
	//                 resultList : res.data.list
	//               })
	//             }else{
	//               wx.showModal({
	//                 title : "提示",
	//                 content : "获取数据失败,请重试",
	//                 showCancel : false
	//               })
	//             }
	//           }
	//         }) 
	//       }
	//     }
	//   },
	//   getSystemProjectList : function(){
	//     var that = this;
	//     wx.request({
	//       url: app.globalData.baseUrl + '/api/project/list',
	//       method : 'GET',
	//       header : {
	//         'cookie' : wx.getStorageSync("sessionid")
	//       },
	//       data:{
	//         status : that.data.statusList,
	//         key : that.data.key
	//       },
	//       success: function(res){
	//         that.setData({
	//           resultList : res.data.list
	//         })
	//       }
	//     })
	//   },
	//   bindinput:function(e){
	//     this.setData({
	//       key : e.detail.value
	//     })
	//   },
	//   determine : function(){
	//     var that = this;
	//     wx.request({
	//       url: app.globalData.baseUrl + '/api/project/list',
	//       method : 'GET',
	//       header : {
	//         'cookie' : wx.getStorageSync("sessionid")
	//       },
	//       data:{
	//         status : that.data.statusList,
	//         key : that.data.key
	//       },
	//       success: function(res){
	//         that.setData({
	//           resultList : res.data.list
	//         })
	//       }
	//     })
	//   },
	//   goToInfo : function(event){
	//     var that = this;
	//     var data = JSON.stringify(this.data.resultList[event.currentTarget.dataset.index])
	//     if(that.data.fromLawyer == "已结束"){
	//       wx.navigateTo({
	//         url: '../workRecord/workRecord?data=' + data,
	//       })
	//     }else{
	//       if(that.data.fromLawyer == "在办"){
	//         wx.navigateTo({
	//           url: '../lawyerProjectDetail/lawyerProjectDetail?data=' + data,
	//         })
	//       }else{
	//         var statusId = this.data.statusList[0];
	//         switch(statusId){
	//           case 6:
	//             wx.navigateTo({
	//               url: '../projectInfoBefore/projectInfoBefore?data=' + data + '&status=' + statusId,
	//             })
	//             break;
	//           case 16:
	//             wx.navigateTo({
	//               url: '../projectInfoBefore/projectInfoBefore?data=' + data + '&status=' + statusId,
	//             })
	//             break;
	//           case 12:
	//             wx.navigateTo({
	//               url: '../projectInfoBefore/projectInfoBefore?data=' + data + '&status=' + statusId,
	//             })
	//             break;
	//           case 10:
	//               wx.navigateTo({
	//                 url: '../projectLawyerComplaint/projectLawyerComplaint?data=' + data + '&status=' + statusId,
	//               })
	//               break;
	//           default:
	//             wx.navigateTo({
	//               url: '../projectInfoIndex/projectInfoIndex?data=' + data + '&status=' + this.data.resultList[event.currentTarget.dataset.index].status,
	//             })
	//             break;
	//       }
	//     }

	//     }
	//   }
	// })
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
