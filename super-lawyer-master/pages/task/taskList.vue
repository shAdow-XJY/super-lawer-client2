<template>
	<view v-if="update">
		<u-subsection :list="projectList" :current="current" @change="changeProject" v-if="user_type == '管理员'"></u-subsection>
		<u-cell-group>
			<u-cell-item v-for="task in taskList" :title="task.project_name" :value="task.commit_time" icon="file-text" @click="toTaskDetail(task.project_id)"></u-cell-item>
			<u-cell-item title="添加项目" :arrow="false" v-if="user_type == '企业用户'">
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
		getUnassigneded,
		getNotAllowcateProject,
		getFeeProject,
	}from '../../network/project.js'
	import{
		formateDate
	}from "../../utils/util.js"
	export default {
		data() {
			return {
				taskList:[],
				update:true,
				user_type:'',
				projectList:[
					{
						name:'全部项目'
					},
					{
						name:'未分配项目'
					},
					{
						name:'待审核已支付项目'
					}
				],
				current:0
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
			},
		async changeProject(index){
				this.taskList = [];
				this.current = index
				console.log(index)
				let params = {
					token : getApp().globalData.user_token,			
				};			
				if(index == 0)
				{
					await getProjects(params).then(res=>{
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
				else if(index == 1){
					console.log("执行到此处1了")
					await getNotAllowcateProject(params).then(res =>{
						console.log(res)
						if(res.data.code ===1){
							console.log(res)
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
				else if(index == 2){
					console.log("执行到此处0了")
					await getFeeProject(params).then(res =>{
						console.log(res)
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
			this.current = 0
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
		},
		onLoad(){
			this.user_type = getApp().globalData.user_type
			console.log(getApp().globalData.user_type)
		}
	}
</script>

<style>

</style>
