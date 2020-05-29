<template>
	<view class="exam-main-main">
		<view class="exam-main-head">
			{{exerciseType}}（{{sectionName}}）
			<view class="abs">{{questionIndex}}/{{questionTotal}}</view>
		</view>
		<view class="exam-main-container" :style="containerStyle" @touchstart="start" @touchend="end">
			<view class="h10"></view>
			<view class="question">
				<text class="qtColor">（{{questionType}}）</text>
				<text v-html="questionContent"></text>
			</view>
			<view class="h10"></view>
			<view>
				<text class="qtColor">答案：</text>
				<text v-html="answerContent"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import handler from './handler.js';
	
	export default {
		data() {
			return {
				exerciseType: '严选题目练习',
				subjectName: 'Java',
				sectionName: 'Java基础',
				questionType: '简单题',
				questionContent: '',
				answerContent: '',
				questionIndex: 1,
				questionTotal: 15,
				startData: {},
				containerHeight: 300
			}
		},
		computed: {
			containerStyle(){
				return "height:" + this.containerHeight + "px";
			}
		},
		onLoad() {
			let that = this;
			handler.queryOne({id: 17}).then((result) => {
				that.questionContent = handler.convertBr(result.question);
				that.answerContent = handler.convertBr(result.answer);
			});
		},
		mounted() {
			let that = this;
			uni.getSystemInfo({     // 获取屏幕高度
				success(systemInfo) {
					let head = uni.createSelectorQuery().select('.exam-main-head');
					head.boundingClientRect(function(data){  // 获取头部元素高度
						that.containerHeight = systemInfo.windowHeight - data.height - 1;
					}).exec();
				}
			})
		},
		methods: {
			start(e){
			    this.startData.clientX = e.changedTouches[0].clientX;
			    this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e){
			    const subX=e.changedTouches[0].clientX - this.startData.clientX;
			    const subY=e.changedTouches[0].clientY - this.startData.clientY;
			    if(subY>50 || subY<-50){
			        console.log('上下滑')
			    }else{
			        if(subX>100){
			            console.log('右滑')
			        }else if(subX<-100){
			            console.log('左滑')
			        }else{
			            console.log('无效')
			        }
			    }
			}
		}
	}
</script>

<style>
	.exam-main-main{

	}
	.exam-main-container{
		width: 700rpx;
		margin: 0 auto;
		font-size: 34rpx;
		line-height: 64rpx;
		color: #555555;
	}
	.exam-main-container .question{
		color: #808080;
	}
	.exam-main-head{
		position: relative;
		padding: 0rpx 25rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
		height: 82rpx;
		line-height: 82rpx;
		border-bottom: 1px solid #f3f3f3;
	}
	.exam-main-head .abs{
		position: absolute;
		top: 0rpx;
		right: 25rpx;
	}
	.exam-main-container .qtColor{
		color: #409EFF;
	}
</style>
