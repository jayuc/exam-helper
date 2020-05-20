<template>
	<view class="global-row-view" :style="viewStyle">
		<view class="base-label-label">{{label}}：</view>
		<slot></slot>
	</view>
</template>

<script>
    
	/**
	 * 基础组件(label)
	 * Created by Jay
	 */
    
	export default {
		props: {
			label: String,
			viewStyle: String
		},
		data() {
			return {
				
			}
		},
		methods: {
		
		}
	}
	
</script>

<style lang="scss" scoped>
	@import '~@/uni.scss';
	
	.base-label-label{
		font-size: $lable-base-font-size;
	}
</style>
