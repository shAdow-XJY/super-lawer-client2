<template>
	<u-cell-group title="基本信息" :border="false"
		:title-style="{'font-size':'50rpx','color':'#000000','font-weight':'bold','padding-bottom':'20rpx'}">
		<u-cell-item class="uitem" v-for="(item,index) in info" :title="item.key" :key="item.key" :value="item.value"
			:arrow="false" :title-style="itemTitleStyle" :value-style="itemValueStyle">
			<u-icon slot="right-icon" size="32"></u-icon>
		</u-cell-item>
		<u-cell-item title="认证状态" :value="user_type" :arrow="false" :title-style="itemTitleStyle"
			:value-style="itemValueStyle">
		</u-cell-item>
		<u-cell-item title="认证时间" :value="register_time" :arrow="false" :title-style="itemTitleStyle"
			:value-style="itemValueStyle">
		</u-cell-item>
	</u-cell-group>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
						"key": "姓名",
						"value": ""
					},					
					{
						"key": "联系方式",
						"value": ""
					},
					{
						"key": "邮箱",
						"value": ""
					},
					{
						"key": "从业时长",
						"value": "0"
					}
				],

				user_type: '',
				register_time: '',

				itemTitleStyle: {
					'font-size': '35rpx',
					'color': '#000000',
					'font-weight': 'normal',
				},
				itemValueStyle: {
					'font-size': '35rpx',
				}
			}
		},
		onLoad() {
			let user_Info=getApp().globalData.user_info
			
			this.info[0].value = user_Info.nickname,
			// this.info[2].value = res.data.userLawyer.sex == 0 ? "女" : "男",		
			this.info[1].value = user_Info.phone,
			this.info[3].value = user_Info.email,
			this.info[4].value = user_Info.register_time,			
			this.user_type = getApp().globalData.user_type,
			this.register_time = user_Info.register_time

			console.log(info)
			// var that = this;
			// //判断是否认证通过
			// if(options.certificationStatus != null){
			//   var status = "";
			//   switch(options.certificationStatus){
			//     case "0" : 
			//       status = "未认证";
			//       wx.showModal({
			//         title : "提示",
			//         content : "您还未认证。",
			//         showCancel : false,
			//         success : function(res){
			//           if(res.confirm){
			//             wx.navigateBack({
			//               delta: 1,
			//             })
			//           }
			//         }
			//       })
			//       break;
			//     case "1" :
			//       status = "审核中";
			//       break;
			//     case "2" : 
			//       status = "认证通过";
			//       break;
			//     case "3":
			//       status = "认证失败";
			//       break;
			//   }
			//  this.certificationStatus = status
			// }		
			// uni.request({
			//   url: getApp().globalData.baseUrl + '/api/user/lawyer/info/account/' +  JSON.parse(options.accountId),
			//   method : 'GET',
			//   header : {
			//     'cookie' : uni.getStorageSync("sessionid")
			//   },
			//   success: function(res){
			//    that.info[0].value = res.data.userLawyer.name,
			//    that.info[2].value = res.data.userLawyer.sex == 0? "女":"男",
			//    that.info[1].value = res.data.userLawyer.phoneNumber,
			//    that.info[3].value = res.data.userLawyer.degree == 0? "学士":(res.data.userLawyer.degree == 1? "硕士":(res.data.userLawyer == 2? "博士":"其他")),
			//    that.info[4].value = res.data.userLawyer.workTime,
			//    that.certificationTime = getApp().formatDate(res.data.userLawyer.certificationTime)
			//   },
			//   fail(err){
			// 	  console.log(err)
			//   }
			// })
			// if(options!= null){
			// 	that.info[0]
			// }
		}
	}
</script>
<style>
	.u-border-bottom::after {
		border-bottom-width: 2px;
	}
</style>
