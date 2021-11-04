<template>
    <view class="homeBox">
        <!-- <view class="h-bg">
             <image src="../../static/home.png" mode="scaleToFill"></image>
        </view> -->
		
        <scroll-view :scroll-into-view="scrollViewId" scroll-y style="height: 100%;">
            <block v-for="(item,index) in msgPageList" :key="index">
                <view class="u-f-ac m-list" @tap="toChat(item)">
                    <view class="u-f-ac m-list-avatar">
                        <image :src="item.cover" mode="scaleToFill"></image>
                        <!-- <uni-badge class="uni-badge-tips" :text="item.noreadnum" type="error" size="small"></uni-badge> -->
                    </view>
                    <view class="u-f u-column m-list-content">
                        <view class="u-f u-f-jsb">
                            <text class="name">{{item.contact_name}}</text>
                            <!-- <text class="time">{{item.time|toLocalTime}}</text> -->
                        </view>
                        <view class="m-list-text">
                            <template v-if="item.content_type==0">
								{{item.content}}
                            </template>
                            <template v-if="item.content_type==1">
                                [图片]
                            </template>
                        </view>
                    </view>
                </view>
            </block>
        </scroll-view>

		<u-tabbar :list="tabBarList"></u-tabbar>
    </view>
</template>

<script>
    import {getMsgList} from "../../network/msg.js"
	import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                msgPageList: [
                     {
    					 contact_id: 15,
    					 content_type: 2,
    					 contact_name: "陈月文",
    					 cover: "http://www.topgoer.cn/uploads/202009/cover_16326bd0af0aada3_small.jpg",
    					 content: "您的项目编号为:1 的律师处理已经审批完成，审批结果为拒绝；请联系管理员重新进行分配",
    					 content_sender: "陈月文"
                     },
                ],

            };
        },
        onLoad() {
			//监听消息变动
            // uni.$on('homePageChange',(data)=>{
            //     this.getHomePageList()
            // })
        },
        onShow() {
            this.getHomePageList()
        },
		computed:{
			...mapGetters([
				'tabBarList'
			])
		},
        methods: {
    		// 关闭滑块
    		closeSwipe(){
    			this.$refs.swipe.closeOther()
    		},
            toChat(item) {
                console.log(item);
                //this.clearRed(index)
				getApp().globalData.currentTo_user_info=item;
                uni.navigateTo({
                    url: `/pages/chat-room/chat-room`
                })      

            },
            getHomePageList(){
    			let params = {
    				token : getApp().globalData.user_token
    			}
    			getMsgList(params).then(res => {
    				console.log(res.data);
    				if(res.data.code==1){
    					let arr = res.data.data.contacts;
    					arr = arr?arr:[];
    					this.msgPageList = arr
    				}
    			})
            }
        },
    
    }
</script>

<style lang="scss" scoped>
    .h-bg{
        position: absolute;
        height: 100%;
        width: 100%;
        image{
            width: 100%;
            height: 100%;
            filter: blur(1px);
            opacity: 0.7;
        }
    }
    .homeBox {
        background-color: $uni-bg-color;
        .m-list {
            padding: 20rpx;
            align-items: stretch;
			display: flex;
			flex-direction: row;
            .m-list-avatar {
                position: relative;
                &>image {
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 10%;
                }
                .uni-badge-tips{
                    position: absolute;
                    right: -10px;
                    top: -10px;
                }
            }
            .m-list-content {
                margin-left: 20rpx;
                flex-grow: 1;
                overflow: hidden;
                justify-content: space-between;
                .name {
                    font-size: $uni-font-size-base;
                    color: $uni-text-color
                }
                .time {
                    font-size: $uni-font-size-sm;
                    color: $uni-text-color-grey;
                }
                .m-list-text {
                    width: 100%;
                    font-size: 30rpx;
                    word-break: keep-all;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    color: $uni-text-color-grey;
                    //border-bottom: 1px solid #a8a8a8;
                }
            }
        }
    }
</style>

