<template>
	<view class="content">
		<view class="h100"></view>
		<view style="width: 400rpx;">
			<code-select label="主题" :codeType="2" :defaultValue="sectionType" @select="selectSectionType"></code-select>
		</view>
		<view class="h40"></view>
		<view style="width: 400rpx;" class="global-row-view">
			<view class="base-label-label" style="font-size: 30rpx;">标签：</view>
			<input type="text" v-model="tag" 
					class="global-label-input" 
					style="padding-left: 10rpx;color: #999999;" 
					@input="tagInputChange"
			/>
		</view>
		<view class="h80"></view>
		<button class="btn" type="primary" @tap="doAnser()">顺序答题</button>
		<view class="h80"></view>
		<button class="btn" type="primary" @tap="continueLast()" :disabled="continueBtnDisabled">继续上次答题</button>
		<view class="h80"></view>
		<button class="btn" type="primary" @tap="preDayAnswer()">昨天问题</button>
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
	import typeCodeCache from '@/utils/typeCodeCache.js';
	import stringUtil from '@/utils/stringUtil.js';
	
	export default {
		components: {
			codeSelect
		},
		data() {
			return {
				title: 'Hello',
				sectionType: 2,
				tag: '',
				continueBtnDisabled: false
			}
		},
		onLoad() {
			fsUtil.readJsonFile("/store/subject-type.json");
			typeCodeCache.storeCode(2);
			typeCodeCache.storeCode(1);
		},
		methods: {
			tagInputChange(){
				if(stringUtil.isBlank(this.tag)){
					this.continueBtnDisabled = false;
				}else{
					this.continueBtnDisabled = true;
				}
			},
			selectSectionType(item){
				this.sectionType = item.id;
			},
			continueLast(){
				this.doAnser({useLast:'1'});
			},
			doAnser(options){
				let param = {
					sectionType: this.sectionType,
					tag: this.tag
				};
				if(options){
					Object.assign(param, options);
				}
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
				let b = false;
				for(let index in param){
					let value = param[index];
					if(typeof value === 'string' && value.length > 0){
						_url += index + '=' + value + '&';
						b = true;
					}else if(typeof value === 'number' && value > 0){
						_url += index + '=' + value + '&';
						b = true;
					}else if(typeof value === 'boolean'){
						_url += index + '=' + value + '&';
						b = true;
					}
				}
				if(b){
					_url = _url.substr(0, _url.length - 1);
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
