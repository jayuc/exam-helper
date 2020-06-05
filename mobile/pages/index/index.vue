<template>
	<view class="content">
		<view class="h100"></view>
		<view style="width: 400rpx;">
			<code-select label="主题" :codeType="2" :defaultValue="sectionType" @select="selectSectionType"></code-select>
		</view>
		<view class="h40"></view>
		<view style="width: 400rpx;" class="global-row-view">
			<view class="base-label-label">标签：</view>
			<input type="text" v-model="tag" class="global-label-input" style="padding-left: 10rpx;color: #999999;" />
		</view>
		<view class="h80"></view>
		<button class="btn" type="primary" @tap="doAnser">答 题</button>
		<view class="h80"></view>
		<button class="btn" type="primary" @tap="preDayAnswer">昨天问题</button>
		<!-- <view class="h80"></view>
		<navigator url="../main/subject-add">
			<button class="btn" type="warn">题目录入</button>
		</navigator> -->
	</view>
</template>

<script>
	import fsUtil from '@/utils/fsUtil.js';
	import codeSelect from '@/components/code-select/index.vue';
	import dateUtil from '@/utils/dateUtils.js';
	
	export default {
		components: {
			codeSelect
		},
		data() {
			return {
				title: 'Hello',
				sectionType: 2,
				tag: ''
			}
		},
		onLoad() {
			fsUtil.readJsonFile("/store/subject-type.json");
		},
		methods: {
			selectSectionType(item){
				this.sectionType = item.id;
			},
			doAnser(){
				let param = {
					sectionType: this.sectionType,
					tag: this.tag
				};
				this.gotoPage(param);
			},
			preDayAnswer(){
				let _time = new Date().getTime() - 24*60*60*1000;
				let preDay = dateUtil.formatDate(new Date(_time), 'yyyy-MM-dd');
				this.gotoPage({
					tag: preDay
				});
			},
			gotoPage(param){
				let _url = '../main/exam-main?';
				if(param.sectionType){
					_url += 'sectionType=' + param.sectionType + '&';
				}
				if(param.tag){
					_url += 'tag=' + param.tag + '&';
				}
				uni.navigateTo({
					url: _url
				});
			}
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
