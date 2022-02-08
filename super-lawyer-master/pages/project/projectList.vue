<template>
	<view v-if="update">
		<u-subsection :list="admin_projectList" :current="current" @change="changeProject" v-if="user_type == '管理员'"></u-subsection>
		<!-- <u-subsection :list="lawyer_projectList" :current="current" @change="changeProject" v-if="user_type == '律师用户'"></u-subsection> -->
<!-- 		<u-cell-group>
			<u-cell-item v-for="task in taskList" :title="task.project_name" :value="task.commit_time" icon="file-text"
				@click="toTaskDetail(task.project_id)" :key="task.project_id"></u-cell-item>
			<u-cell-item title="添加项目" :arrow="false" v-if="user_type == '企业用户'">
				<u-button slot="right-icon" type="primary" size="mini" @click="addProject">
					<view style="font-size: 50rpx;">+</view>
				</u-button>
			</u-cell-item>
		</u-cell-group> -->
		<view class="flex-con">
			<view class="result_bd" v-for="(item,index) in bar">
		
				<view class=" u-flex u-body-box " @tap="nevigateTo(item.url)">
					<image :src="item.src" class="sele_icon"></image>
					<span>
						<text class="subTitle">{{item.value}}</text>
						<br>
						<text class="discribeText">{{item.des}}</text>
					</span>
				</view>
			</view>
			</view>
		
		<u-tabbar :list="tabBarList"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getProject,
		getProjects,
		getUnassigneded,
		getNotAllowcateProject,
		getFeeProject,
	} from '../../network/project.js'
	import {
		formateDate
	} from "../../utils/util.js"
	export default {
		data() {
			return {
				bar: [{
					key: "新分配",
					value: "新分配项目",
					src: require("../../static/works/new.png"),
					des: "所有未经承接处理的项目",
					url: "newProjectList"
				}, {
					key: "在办",
					value: "在办项目",
					src: require("../../static/works/dealing.png"),
					des: "已经承接，正在处理中的项目",
					url: "dealingProjectList"
				}, {
					key: "已结束",
					value: "已结束项目",
					src: require("../../static/works/end.png"),
					des: "已经结束的的项目",
					url: "endedProjectList"
				}],
				taskList: [],
				update: true,
				user_type: '',
				admin_projectList: [{
						name: '全部项目'
					},
					{
						name: '未分配项目'
					},
					{
						name: '待审核已支付项目'
					}
				],
				//此处逻辑可优化
				lawyer_projectList: [{
						name: '全部项目'
					},
					{
						name: '未同意项目'
					}
				],
				current: 0
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
			},
			toTaskDetail(project_Id) {
				//注意：无法转跳到tabbar页！！				
				if (getApp().globalData.user_type == "管理员") {
					uni.navigateTo({
						url: "../project/projectDetail?project_Id=" + project_Id
					})
				} else {
					uni.navigateTo({
						url: "../task/task?project_Id=" + project_Id
					})
				}
			},
			addProject() {
				uni.navigateTo({
					url: "../project/createNewProject"
				})
			},
			async updateProjectsList() {
				let params = {
					token: getApp().globalData.user_token,
				}
				this.current = 0
				await getProjects(params).then(res => {
					// console.log(res)
					console.log(res.data.data.projects)
					if (res.data.code === 1) {
						this.taskList.splice(0, this.taskList.length)
						this.taskList.push(...res.data.data.projects)
						for (let i = 0; i < this.taskList.length; i++) {
							this.$set(this.taskList[i], "commit_time", formateDate(this.taskList[i]
								.commit_time));
							this.$set(this.taskList[i], "end_time", formateDate(this.taskList[i].commit_time))
						}
					}
				})
			},
			async changeProject(index) {
				this.current = index
				let params = {
					token: getApp().globalData.user_token,
				};
				if (index == 0) {
					await getProjects(params).then(res => {
						if (res.data.code === 1) {
							this.taskList.splice(0, this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for (let i = 0; i < this.taskList.length; i++) {
								this.$set(this.taskList[i], "commit_time", formateDate(this.taskList[i]
									.commit_time));
								this.$set(this.taskList[i], "end_time", formateDate(this.taskList[i]
									.commit_time))
							}
						}
					})
				} else if (index == 1) {
					await getNotAllowcateProject(params).then(res => {
						console.log(res)
						if (res.data.code === 1) {
							console.log(res)
							this.taskList.splice(0, this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for (let i = 0; i < this.taskList.length; i++) {
								this.$set(this.taskList[i], "commit_time", formateDate(this.taskList[i]
									.commit_time));
								this.$set(this.taskList[i], "end_time", formateDate(this.taskList[i]
									.commit_time))
							}
						}
					})
				} else if (index == 2) {
					await getFeeProject(params).then(res => {
						console.log(res)
						if (res.data.code === 1) {
							this.taskList.splice(0, this.taskList.length)
							this.taskList.push(...res.data.data.projects)
							for (let i = 0; i < this.taskList.length; i++) {
								this.$set(this.taskList[i], "commit_time", formateDate(this.taskList[i]
									.commit_time));
								this.$set(this.taskList[i], "end_time", formateDate(this.taskList[i]
									.commit_time))
							}
						}
					})
				}
			}

		},
		computed: {
			...mapGetters([
				'tabBarList'
			])
		},
		onLoad() {
			this.user_type = getApp().globalData.user_type
			this.updateProjectsList()
		}
	}
</script>


<style scoped lang="scss">
	.flex-con {
		flex-direction: column;
		justify-content: center;
		clear: both;
	}

	//标题
	.title {
		font-size: 50rpx;
		margin: 50rpx;
	}

	.top_btn {
		display: inline;
	}

	.a_box {
		border: 4rpx solid #e7f4fa;
		border-radius: 20rpx;
		padding: 10rpx;
		margin-left: 60rpx;
		margin-bottom: 50rpx;
		margin-right: 30rpx;
		margin-top: 50rpx;
		float: left;

	}

	.b_box {
		border: 4rpx solid #e7f4fa;
		border-radius: 20rpx;
		padding: 10rpx;
		margin-left: 60rpx;
		margin-bottom: 50rpx;
		margin-right: 30rpx;
		margin-top: 50rpx;
		float: left;
	}

	.top_btn_title {
		float: right;
		font-weight: bold; 
		font-size: 35rpx;
	}

	.top_icon {
		float: left;
		width: 50rpx;
		height: 50rpx;
		border-radius: 6rpx;
		margin-right: 10rpx;
		margin-top: 5rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
		
	}

	//项题
	.subTitle {
		float: left;
		font-weight: bold;
		font-size: 32rpx;
	}

	//项描述
	.discribeText {
		float: left;
		color: #999999;
		font-size: 28rpx;
	}

	//图片
	.sele_icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 18rpx;
		margin-right: 25rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-bottom: 30rpx;
	}

	//框
	.u-body-box {
		border: 4rpx solid #e7f4fa;
		border-radius: 20rpx;
		padding: 10rpx;
		margin: 70rpx;
		margin-left: 60rpx;
		margin-right: 60rpx;
	}
</style>
