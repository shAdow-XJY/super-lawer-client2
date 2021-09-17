<template>
	<view>
		我是企业消息页
		<u-tabbar :list="tabBarList"></u-tabbar>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			...mapGetters([
				'tabBarList',
			
			])
		}
	}
</script>

<style>

</style>
