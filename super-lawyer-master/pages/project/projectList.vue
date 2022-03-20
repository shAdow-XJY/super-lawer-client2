<template>
	<view v-if="update">
		<u-subsection :list="admin_projectList" :current="current" @change="changeProject" v-if="user_type == '管理员'"></u-subsection>
		<!-- <u-subsection :list="lawyer_projectList" :current="current" @change="changeProject" v-if="user_type == '律师用户'"></u-subsection> -->
		<u-cell-group>
			<u-cell-item v-for="task in taskList" :title="task.project_name" :value="task.commit_time" icon="file-text" @click="toTaskDetail(task.project_id)" :key = "task.project_id"></u-cell-item>
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
				admin_projectList:[
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
				//此处逻辑可优化
				lawyer_projectList:[
					{
						name:'全部项目'
					},
					{
						name:'未同意项目'
					}
				],
				current:0
			}
		},
		methods: {
			toTaskDetail(project_Id){
				//注意：无法转跳到tabbar页！！				
				if(getApp().globalData.user_type =="管理员"){
					uni.navigateTo({
						url:"../project/projectDetail?project_Id=" + project_Id
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
					url:"../project/createNewProject"
				})
			},
		async updateProjectsList(){
			let params = {
				token : getApp().globalData.user_token,			
			}
			 this.current = 0
			 await getProjects(params).then(res=>{
					// console.log(res)
					console.log(res.data.data.projects)
					if(res.data.code ===1){
						this.taskList.splice(0,this.taskList.length)
						this.taskList.push(...res.data.data.projects)
						for(let i = 0; i < this.taskList.length;i++){		
							this.$set(this.taskList[i],"commit_time",formateDate(this.taskList[i].commit_time));
							this.$set(this.taskList[i],"end_time",formateDate(this.taskList[i].commit_time))
						}					
					}
				})
		},
		async changeProject(index){
				this.current = index
				let params = {
					token : getApp().globalData.user_token,			
				};			
				if(index == 0)
				{
					await getProjects(params).then(res=>{
						if(res.data.code ===1){
							this.taskList.splice(0,this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for(let i = 0; i < this.taskList.length;i++){	
								this.$set(this.taskList[i],"commit_time",formateDate(this.taskList[i].commit_time));
								this.$set(this.taskList[i],"end_time",formateDate(this.taskList[i].commit_time))					
							}								
						}
					})
				}
				else if(index == 1){
					await getNotAllowcateProject(params).then(res =>{
						console.log(res)
						if(res.data.code ===1){
							console.log(res)
							this.taskList.splice(0,this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for(let i = 0; i < this.taskList.length;i++){	
								this.$set(this.taskList[i],"commit_time",formateDate(this.taskList[i].commit_time));
								this.$set(this.taskList[i],"end_time",formateDate(this.taskList[i].commit_time))				
							}	
						}
					})
				}
				else if(index == 2){
					await getFeeProject(params).then(res =>{
						console.log(res)
						if(res.data.code ===1){
							this.taskList.splice(0,this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for(let i = 0; i < this.taskList.length;i++){	
								this.$set(this.taskList[i],"commit_time",formateDate(this.taskList[i].commit_time));
								this.$set(this.taskList[i],"end_time",formateDate(this.taskList[i].commit_time))					
							}	
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
	   onLoad(){
			this.user_type = getApp().globalData.user_type
			this.updateProjectsList()
		}
	}
</script>

<style>

</style>
