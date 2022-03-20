const baseURL = 'http://112.74.166.85:9000'

export default function(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
	  header: options.header || {},
      success: resolve,
      fail: reject
    })
  }).then(res =>{  
	  if(res.data.code == 201){
		  //console.log("token过期")	
		  uni.showModal({
		     title: '提示',
		     content: '身份已过期，请重新登录！',
			 showCancel:false,
		     success: function (res) {
				uni.clearStorageSync();
		        uni.reLaunch({
		        	url:"/pages/login/login"
		        })
		     }
		 });
	  }
	  return res
  })
}
