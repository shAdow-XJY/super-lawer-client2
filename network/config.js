const baseURL = 'http://lawer.sh1.k9s.run:2271'

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
