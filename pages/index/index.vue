<template>
	<view class="content">
		<view class="h100"></view>
		<view class="h80"></view>
		<navigator url="../main/exam-main">
			<button class="btn" type="primary">答 题</button>
		</navigator>
		<view class="h80"></view>
		<navigator url="../main/subject-add">
			<button class="btn" type="warn">题目录入</button>
		</navigator>
	</view>
</template>

<script>
	import fsUtil from '@/utils/fsUtil.js';
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			fsUtil.readJsonFile("/store/subject-type.json");
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn{
		width: 300rpx;
	}
	
</style>
