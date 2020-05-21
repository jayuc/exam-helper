<template>
	<view class="exam-main-main">
		<view class="exam-main-head">
			{{exerciseType}}（{{sectionName}}）
			<view class="abs">{{questionIndex}}/{{questionTotal}}</view>
		</view>
		<view class="exam-main-container" @touchstart="start" @touchend="end">
			<view class="h10"></view>
			<view class="question">
				<text class="qtColor">（{{questionType}}）</text> {{questionContent}}?
			</view>
			<view class="h10"></view>
			<view>
				<text class="qtColor">答案：</text>{{anwserContent}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exerciseType: '严选题目练习',
				subjectName: 'Java',
				sectionName: 'Java基础',
				questionType: '简单题',
				questionContent: '面向对象和面向过程的区别面向对象和面向过程的区别面向对象和面向过程的区别面向对象和面向过程的区别面向对象和面向过程的区别',
				anwserContent: '这是一个简单的问题',
				questionIndex: 1,
				questionTotal: 15
			}
		},
		onLoad() {
		},
		methods: {
			start(e){
			                    
			    this.startData.clientX=e.changedTouches[0].clientX;
			                 
			    this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
			    // console.log(e)
			    const subX=e.changedTouches[0].clientX-this.startData.clientX;
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
		font-size: 42rpx;
		line-height: 72rpx;
	}
	.exam-main-head{
		position: relative;
		padding: 0rpx 25rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
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
