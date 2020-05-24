<template>
	<view>
		<view class="h100"></view>
		<view style="width: 600rpx;margin: 0 auto;">
			<subject-select label="专题" @select="selectSubjectType"></subject-select>
			<view class="h20"></view>
			<m-textarea label="问题" rowSize="middle" @textChange="selectQuestion"></m-textarea>
			<view class="h20"></view>
			<m-textarea label="答案" @textChange="selectAnswer"></m-textarea>
			<view class="h50"></view>
			<button type="primary" @tap="submit">提 交</button>
		</view>
	</view>
</template>

<script>
	import subjectSelect from '@/components/subject-select/index.vue';
	import mTextarea from '@/components/m-textarea/index.vue';
	
	export default {
		components: {
			subjectSelect,
			mTextarea
		},
		data(){
			return {
				subjectType: null,
				question: '',
				answer: ''
			}
		},
		methods: {
			selectSubjectType(data){
				this.subjectType = data.id;
			},
			selectQuestion(data){
				this.question = data;
			},
			selectAnswer(data){
				this.answer = data;
			},
			submit(){
				let param = {
					subjectType: this.subjectType,
					question: this.question,
					answer: this.answer
				};
				console.log(param);
			}
		}
	}
	
</script>

<style>
</style>
