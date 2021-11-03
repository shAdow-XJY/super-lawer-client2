<template>
    <view class="chatroomBox">
        <view class="chat-top" @touchstart="hideDrawer">
            <!-- <view class="h-bg">
                 <image src="../../static/image/timg2.jpg" mode="scaleToFill"></image>
            </view> -->
            <scroll-view class="msg-list" :scroll-y="true" :scroll-with-animation="true"
                :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50" @scrolltolower="scrollToBottom">
                <!-- 布局 -->
                <view class="body" v-for="(item, key) in msgList" :key="key" :id="'msg'+key">
                    <!-- 用户发出的消息 -->
                        <view class="my" :class="{'other':!isMe(item.sender_name)}" >
							<view>msg{{key}}</view>
                            <view class="chat-list-content">
                                <!-- 文字消息 -->
                                <view v-if="item.content_type!=1" class="bubble">
                                    <rich-text :nodes="item.content"></rich-text>
                                </view>
                                <!-- 图片消息 -->
                                <view v-if="item.content_type==1" class="bubble img" @tap="showPic(item.sender_cover)">
                                    <image :src="item.sender_cover" :style="{'width': 100+'px','height': 150+'px'}"></image>
                                </view>
                            </view>
                            <!-- 头像 -->
                            <view class="chat-list-head">
                                <image :src="item.sender_cover"></image>
                            </view>
                        </view>
                </view>
			</scroll-view>
        </view>
		
		<!-- 底部输入栏 -->
		<view class="chat-bottom">
		    <chat-bottom @submitMsg="submitMsg"></chat-bottom>
		</view>
		
    </view>
</template>

<script>

	import {getAllMsgList} from '../../network/msg.js'
    import chatBottom from './components/chat-bottom'

    export default {
        components: {
            chatBottom
        },
        data() {
            return {
                msgList: [
					{
						content: "",
						content_type: -1 ,
						send_time: 0,
						sender_cover: "",
						sender_name: ""
					}
				],
                
                //消息列表
                isHistoryLoading: false,
                scrollToView: '' ,
				
				timer: null //定时器   

            };
        },
        computed: {
            
        },
        onLoad(option) {
			// console.log("getApp().globalData.currentTo_user_info")
			// console.log(getApp().globalData.currentTo_user_info)
            // {name：名字，userId 对话人的userId：} 设置导航条对话的名字
            uni.setNavigationBarTitle({title:getApp().globalData.currentTo_user_info.contact_name})
        },
		onShow() {
		    this.timer = setInterval(() => {
		        this.init()							
		    }, 2000)
		},
        onUnload(){
            if (this.timer) {
                    clearInterval(this.timer)
                    this.timer = null
                }
        },
		onHide() {
		    if (this.timer) {
		        clearInterval(this.timer)
		        this.timer = null
		    }
		},
        onReady() {
            // 获取聊天信息 并 监听
            this.init();		
        },
        methods: {
            init(){
                // 获取聊天详情
                let userInfo = getApp().globalData.user_info
                let currentToUser = getApp().globalData.currentTo_user_info
				// console.log("userInfo")
				// console.log(userInfo)
				// console.log("currentToUser")
				// console.log(currentToUser)
				
				// console.log("currentToUser.contact_id,")
				// console.log(currentToUser.contact_id)
				
				
				let params = {
					contact_id: currentToUser.contact_id,
					token: getApp().globalData.user_token
				}
                try{
					this.getAllMsgList(params);
                    //console.log('当前聊天详情',this.msgList);
                }catch(e){
                    console.log(e)
                    //TODO handle the exception
                }
            },
			getAllMsgList(params){
				getAllMsgList(params).then(res => {
					//console.log(res.data.code)
					if(res.data.code==1){
						
						let tempArr = res.data.data.msg;
						tempArr = tempArr?tempArr:[];
						if(tempArr.length>0){
							//console.log("tempArr")
							//console.log(tempArr[0])
						    this.msgList = tempArr.reverse()
							
							this.$nextTick(()=>{
							    console.log(this.msgList.length-1);
							    this.scrollToView = 'msg'+(this.msgList.length-1);
								console.log(this.scrollToView)
							})
						}
					}
				})
			},
			isMe(itemName){
			    return itemName==getApp().globalData.user_info.nickname;	
			},
            submitMsg(res) {
				console.log("父组件获取消息传递结果，1为success")
				console.log(res)
				if(res == 1){
					this.init()
				}
                // this.$chat.sendPrivateMessage(res)
            },
            hideDrawer() {
                console.log(1);
            },
            // 预览图片
            showPic(picUrl) {
            	// uni.previewImage({
            	// 	indicator: 'none',
            	// 	current: 1,
            	// 	urls: [picUrl]
            	// });
            },
            // 查看历史记录
            loadHistory(){
                console.log('查看历史记录');
            },
			
        },
        
    };
</script>

<style scoped lang="scss">
    .chatroomBox{
        display:flex;
        flex-direction:column ;
        height: 100%;
        .chat-top{
            flex-grow:1;
            overflow:hidden;
            .msg-list{
                height:100%
            }
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
        }
		.chat-bottom {
		    width: 100%;
		    min-height: 100rpx;
		    background: #f1f1f1;
		}
    }
    .my {
        padding: 20rpx 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .chat-list-content {
            margin-right: 10rpx;
            max-width: 70%;
            min-height: 50rpx;
        }

        .bubble {
            background-color: #f06c7a;
            color: #fff;
            border-radius: 10rpx;
            padding: 15rpx 20rpx;
            display: flex;
            align-items: center;
            font-size: 32rpx;
            word-break: break-word;

            &.img {
                background-color: transparent;
                padding: 0;
                overflow: hidden;

                image {
                    flex: 1;
                    max-width: 350rpx;
                    max-height: 350rpx;
                }
            }

        }

       
        .play {
            @keyframes my-play {
                0% {
                    transform: translateX(-80%);
                }

                100% {
                    transform: translateX(0%);
                }
            }

            .my-voice:after {
                border-right: solid 10rpx rgba(240, 108, 122, .5);
                animation: my-play 1s linear infinite;
            }

        }

        .chat-list-head {
            flex-shrink: 0;
            width: 80rpx;
            height: 80rpx;

            image {
                width: 80rpx;
                height: 80rpx;
                border-radius: 10rpx;
            }
        }
    }

    .other {
        flex-direction: row-reverse;

        .chat-list-content {
            margin-right: 0;
            margin-left: 10rpx;
        }

        .bubble {
            background-color: #fff;
            color: #333;
        }

        .voice {
            flex-direction: row-reverse;
            .my-voice {
                transform: rotate(0deg);
                color: #333;
            }
        }

        .play {
            .my-voice:after {
                border-right: solid 10rpx rgba(255, 255, 255, .5);
            }

        }
    }

.input-box{
	width: 98%;
	min-height: 100upx;
	padding: 0 1%;
	background-color: #FFFFFF;
	display: flex;
	position: fixed;
	z-index: 20;
	bottom:-2upx;
	&.showLayer{transform: translate3d(0,-42vw,0);}
	transition: all .15s linear;
	border-bottom: solid 1upx #ddd;
	.voice,.more{
		flex-shrink: 0;
		width: 90upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.send{
		//H5发送按钮左边距
		/* #ifdef H5 */
		margin-left: 20upx;
		/* #endif */
		flex-shrink: 0;
		width: 100upx;
		height: 100upx;
		display: flex;
		align-items: center;
		.btn{
			width: 90upx;
			height: 56upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background:linear-gradient(to right, #36b2fe, #3061fb);
			color: #fff;
			border-radius: 6upx;
			font-size: 24upx;
		}
	}
	.textbox{
		width: 100%;
		min-height: 70upx;
		margin-top: 15upx;
		.text-mode{
			width: 100%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			border-radius: 40upx;
			.box{
				width: 100%;
				padding-left: 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;
				textarea{
					width: 100%;
				}
			}
			.em{
				flex-shrink: 0;
				width: 80upx;
				padding-left: 10upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
