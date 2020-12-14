
import { originalUrl } from './urlList.js'

export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url:originalUrl+options.url,
			method:options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败'
				})
				reject(err)
			}
		})
	})
}

export const maintenanceUrl = 'app/operation/'; //运维首页地区和设备信息