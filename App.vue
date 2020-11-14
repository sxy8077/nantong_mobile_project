<script>
	import {
		mapMutations
	} from 'vuex';
	
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// },
		onLaunch: function () {
			uni.getStorage({
				key: 'uerInfo',
				success:(res) => {
					this.login(res.data);
					// 如果还需要重新校验或是想要刷新token的有效时间 就再联网请求一次
					uni.request({
						url: `${this.$serverUrl}/auth.php`,
						header: {
							"Content-Type": "application/x-www-form-urlencoded",
							"Token":res.data.token
						},
						data: {
							"username":res.data.user_name
						},
						method: "POST",
						success: (e) => {
							if (e.statusCode === 200 && e.data.code === 0) {
								this.login(e.data);
							}
						}
					})
				}
			});
		},
		methods: {
			...mapMutations(['login'])
		}
	}
</script>

<style >
	/*每个页面公共css */
	

</style>
