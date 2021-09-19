<template>
	<view v-if="update">
		<u-cell-group>
			<u-cell-item v-for="task in taskList" :title="'项目名称: ' + task.project_name" :value=" '创建日期: '+ task.commit_time" icon="file-text" @click="toTaskDetail(task.project_id)"></u-cell-item>
			<u-cell-item title="添加项目" :arrow="false">
				<u-button slot="right-icon" type="primary" size="mini" @click="addProject"><view style="font-size: 50rpx;">+</view></u-button>
			</u-cell-item>
		</u-cell-group>
		<u-tabbar :list="tabBarList"></u-tabbar>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {
		getProject,
		getProjects,
		getUnassigneded
	}from '../../network/project.js'
	import{
		formateDate
	}from "../../utils/util.js"
	export default {
		data() {
			return {
				taskList:[],
				update:true
			}
		},
		methods: {
			toTaskDetail(project_Id){
				console.log("test")
				console.log(project_Id)
				//注意：无法转跳到tabbar页！！
				
				if(getApp().globalData.user_type =="管理员"){
					uni.navigateTo({
						url:"../file/file?project_Id=" + project_Id
					})
				}
				else{
					uni.navigateTo({
						url:"../task/task?project_Id=" + project_Id
					})
				}				
			},
			addProject(){
				uni.navigateTo({
					url:"../ProjectDetail/createNewProject"
				})
			}
			
		},
		computed:{
			...mapGetters([
				'tabBarList'
			])
		},
	 async onShow(){
			let params = {
				token : getApp().globalData.user_token,			
			}
			console.log("onshow")	
			
			this.taskList = []			
		 await getProjects(params).then(res=>{
				console.log(res)
				console.log(res.data.data.projects)
				if(res.data.code ===1){
					this.taskList = res.data.data.projects
					for(let i = 0; i < this.taskList.length;i++){	
						this.taskList[i].commit_time = formateDate(this.taskList[i].commit_time)
						this.taskList[i].end_time =  formateDate(this.taskList[i].end_time)						
					}	
					this.update = false
					this.$nextTick(()=>{
						this.update = true
					})
				}
			})
			
					
		}
	}
</script>

<style>

</style>
