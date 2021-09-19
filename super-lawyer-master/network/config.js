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
  })
}
