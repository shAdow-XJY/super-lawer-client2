<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="man-add" v-for="(item,index) in authLists" 
			:title="item.auth_type=='lawer'?'律师认证':'企业认证'"
			:value="'提交时间：'+item.auth_time"
			:label="item.nick_name"	
			@click="gotoDetail(index,item.id,item.auth_type)"
			></u-cell-item>
		</u-cell-group>
		<u-toast :title="result" :type="resultType" ref="tip"/>
	</view>
</template>

<script>
	import {authList} from "../../network/user.js"
	import {formateDate} from "../../utils/util.js"
	export default {
		data() {
			return {
				authLists:[]
			}
		},
		methods: {
			gotoDetail(index,id,auth_type){
				uni.navigateTo({
					url:"./userApplyConfirmDetail?id="+id+"&auth_type="+auth_type
				})
			}
		},
		computed:{			
		},
	async onShow(){
			let params = {
				token:getApp().globalData.user_token
			}
			await authList(params).then(res =>{	
				console.log(res);
				if(res.data.code ==1){
					this.authLists = res.data.data.authers
					for(let i = 0; i < this.authLists.length;i++){
						this.authLists[i].auth_time = formateDate(this.authLists[i].auth_time)									
					}	
				}					
				else{
					this.$refs.tip.show({
						title:"获取权限审核列表失败！",
						type:"error",
						duration:1500,						
					})	
				}
			})
		}
		
	}
</script>

<style>

</style>
