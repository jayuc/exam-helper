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
				<text v-html="answerContent" v-show="answerVisible"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import handler from './handler.js';
	import restUtil from '@/utils/restUtil.js';
	import LinkedList from '@/src/data/LinkedList.js';
	import resultUtil from '@/utils/resultUtil.js';
	
	export default {
		data() {
			return {
				exerciseType: '严选题目练习',
				subjectName: 'Java',
				sectionName: 'Java基础',
				questionType: '简单题',
				questionContent: '',
				answerContent: '',
				answerVisible: false,
				questionIndex: 1,
				questionTotal: 15,
				startData: {},
				containerHeight: 300,
				params: {},
				pageNumber: 1,
				pageSize: 10,
				linkList: new LinkedList(),
				currentNode: null
			}
		},
		computed: {
			containerStyle(){
				return "height:" + this.containerHeight + "px";
			}
		},
		onLoad(options) {
			this.params = options;
			// 刷新
			this.refresh();
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
			// 刷新 
			// direction: 1表示向前翻页  2表示向后翻页
			refresh(direction){
				if(this.linkList.isEmpty()){  // 第一次加载
					this.fetchData(direction);
				}else{
					this.answerVisible = false;
					if(direction === 1){   // 向前翻页
						let prev = this.currentNode.prev;
						if(prev){
							this.currentNode = prev;
							this.refreshContent();
							this.questionIndex--;
						}else{  // 已经到最前页
							console.log('已到最前页');
						}
					}else if(direction === 2){   // 向后翻页
						let next = this.currentNode.next;
						if(next){
							this.currentNode = next;
							this.refreshContent();
							this.questionIndex++;
						}else{
							if(this.questionIndex < this.questionTotal){
								this.pageNumber++;
								this.fetchData(direction);
								this.questionIndex++;
							}else{   // 已到最后一页
								console.log('已到最后一页');
							}
						}
					}
				}
			},
			// 请求数据
			fetchData(direction){
				let that = this;
				restUtil.get({url: 'question/selectSelective', data: that.createParam()})
					.then((result) => {
						let list = resultUtil.hasData(result);
						if(list){
							that.linkList.addList(list);
							if(direction && that.currentNode){
								if(direction === 1){  // 向前翻页
									that.currentNode = that.currentNode.prev;
								}else if(direction === 2){  // 向后翻页
									that.currentNode = that.currentNode.next;
								}
							}else{
								that.currentNode = that.linkList.head;
							}
							that.refreshContent();
							that.questionTotal = result.result.total;
						}
					}, (error) => {
						
					})
			},
			// 刷新数据到页面
			refreshContent(){
				let data = this.currentNode.value;
				if(data){
					this.questionContent = handler.convertBr(data.question);
					this.answerContent = handler.convertBr(data.answer);
				}
			},
			// 获取参数
			createParam(){
				this.params.pageSize = this.pageSize;
				this.params.pageNumber = this.pageNumber;
				return this.params;
			},
			start(e){
			    this.startData.clientX = e.changedTouches[0].clientX;
			    this.startData.clientY = e.changedTouches[0].clientY;
			},
			end(e){
			    const subX=e.changedTouches[0].clientX - this.startData.clientX;
			    const subY=e.changedTouches[0].clientY - this.startData.clientY;
			    if(subY>50 || subY<-50){
			        if(subY > 50){  // 下滑
						// this.answerVisible = false;
					}else if(subY < -50){  // 上滑
						this.answerVisible = true;
					}
			    }else{
			        if(subX>100){   // 右滑
						this.refresh(1);
			        }else if(subX<-100){  // 左滑
						this.refresh(2);
			        }else{
			            console.log('无效');
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
