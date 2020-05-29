<template>
	<view class="m-loading-view">
		<image src="/static/timg.gif" class="m-loading-image"></image>
	</view>
</template>

<script>
	/**
	 * 正在加载组件
	 * Created by Jay
	 */
	
	
	export default {
		props: {
			type: String
		},
		data() {
			return {
				
			}
		},
		methods: {
		
		}
	}
	
</script>

<style>
	.m-loading-view{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: block;
		box-sizing: border-box;
		pointer-events: none;
		background: rgba(17,17,17,.2);
	}
	.m-loading-image{
		width: 140rpx;
		height: 140rpx;
		position: fixed;
		z-index: 999;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
	}
</style>
