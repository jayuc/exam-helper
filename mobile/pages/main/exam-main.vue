<template>
	<view class="exam-main-main">
		<view class="exam-main-head">
			{{exerciseType}}（{{sectionName}}）
			<view class="abs">{{questionIndex}}/{{questionTotal}}</view>
		</view>
		<view class="exam-main-container" :style="containerStyle" @tap="setFloatInfoShow(true)"
						@touchstart="start" @touchend="end">
			<view class="h10"></view>
			<view class="question">
				<text class='qtColor'>（{{questionType}}）</text>
				<view v-html="createQuestionHtml()"></view>
			</view>
			<view class="h10"></view>
			<view class="answer">
				<text class="qtColor">答案：</text>
				<view v-html="createAnswerHtml()" v-if="answerVisible"></view>
			</view>
		</view>
		<icon type="info" class="float_info" v-if="floatInfoShow" @tap="setFloatInfoShow(false)"></icon>
		<view class="float_container" v-if="!floatInfoShow" >
			<uni-tag text="重 要" type="primary" inverted class="f_tag" @tap="modifyTag('重要')"></uni-tag>
			<uni-tag text="今 天" type="success" inverted class="f_tag" @tap="tagCurrentDay"></uni-tag>
		</view>
		<m-loading v-if="loading"></m-loading>
	</view>
</template>

<script>
	import handler from './handler.js';
	import restUtil from '@/utils/restUtil.js';
	import LinkedList from '@/src/data/LinkedList.js';
	import resultUtil from '@/utils/resultUtil.js';
	import mLoading from '@/components/m-loading/m-loading.vue';
	import uniTag from "@/unicomponents/uni-tag/uni-tag.vue";
	import dateUtil from '@/utils/dateUtils.js';
	import stringUtil from '@/utils/stringUtil.js';
	import typeCodeCache from '@/utils/typeCodeCache.js';
	
	export default {
		components: {
			mLoading,
			uniTag
		},
		data() {
			return {
				exerciseType: '严选题目练习',
				subjectName: 'Java',
				sectionName: '',
				questionType: '',
				questionContent: '',
				answerContent: '',
				answerVisible: false,
				loading: false,      // 正在加载
				floatInfoShow: true, // 显示浮动图标
				questionIndex: 1,
				questionTotal: 0,
				startData: {},
				containerHeight: 300,
				params: {},
				pageNumber: 1,
				pageSize: 10,
				linkList: [],
				id: '',       // 问题id
				tag: ''       // 问题标记
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
			// 标记为当天
			tagCurrentDay(){
				this.modifyTag(dateUtil.formatDate(new Date(), 'yyyy-MM-dd'));
			},
			// 修改问题标记
			modifyTag(text){
				this.loading = true;
				let that = this;
				let _tag = text;
				if(!stringUtil.isBlank(this.tag)){
					_tag = this.tag + ',' + text;
				}
				handler.modifyOneQuestion({id: this.id,tag: _tag})
					.then((result) => {
						that.loading = false;
						that.tag = _tag;
					}, () => {
						that.loading = false;
					});
			},
			setFloatInfoShow(show){
				this.floatInfoShow = show;
			},
			// 刷新 
			// direction: 1表示向前翻页  2表示向后翻页
			refresh(direction){
				if(this.loading){
					return;
				}
				if(this.linkList.length === 0){  // 第一次加载
					this.fetchData(direction);
				}else{
					if(direction === 1){   // 向前翻页
						if(this.questionIndex < 2){   // 已经到最前页
							console.log('已到最前页');
						}else{
							this.questionIndex--;
							this.refreshContent();
						}
					}else if(direction === 2){   // 向后翻页
						if(this.questionIndex < this.linkList.length){
							this.questionIndex++;
							this.refreshContent();
						}else if(this.linkList.length < this.questionTotal){
							this.pageNumber++;
							this.fetchData(direction);
						}else{
							console.log('已经到最后一页');
						}
					}
				}
			},
			// 请求数据
			fetchData(direction){
				let that = this;
				that.loading = true;
				restUtil.get({url: 'question/selectSelective', data: that.createParam()})
					.then((result) => {
						let list = resultUtil.hasData(result);
						if(list){
							that.linkList = that.linkList.concat(list);
							if(direction === 2){  // 向后翻页
								that.questionIndex++;
							}
							that.refreshContent();
							that.questionTotal = result.result.total;
						}
						that.loading = false;
					}, (error) => {
						that.loading = false;
					})
			},
			// 刷新数据到页面
			refreshContent(){
				let data = this.getData();
				if(data){
					this.questionContent = handler.convertBr(data.question);
					this.answerContent = handler.convertBr(data.answer);
					this.id = data.id;
					this.tag = data.tag;
					this.sectionName = typeCodeCache.getCodeName(2, data.sectionType);
					this.questionType = typeCodeCache.getCodeName(1, data.questionType) + '题';
					this.answerVisible = false;
				}
			},
			// get data
			getData(){
				let linkIndex = this.questionIndex - 1;
				if(linkIndex > -1 && linkIndex < this.linkList.length){
					return this.linkList[linkIndex];
				}
				return null;
			},
			// 获取参数
			createParam(){
				this.params.pageSize = this.pageSize;
				this.params.pageNumber = this.pageNumber;
				return this.params;
			},
			createQuestionHtml(){
				return "　　　　　" + this.questionContent;
			},
			createAnswerHtml(){
				return "　　　" + this.answerContent;
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
						this.answerVisible = false;
					}else if(subY < -50){  // 上滑
						this.answerVisible = true;
					}
			    }else{
			        if(subX>50){   // 右滑
						this.refresh(1);
			        }else if(subX<-50){  // 左滑
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
		position: relative;
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
	.exam-main-container .answer{
		position: relative;
	}
	.exam-main-container .qtColor{
		color: #409EFF;
		position: absolute;
		left: 0;
		top: 0;
	}
	.exam-main-main .float_info{
		position: fixed;
		bottom: 40rpx;
		right: 40rpx;
	}
	.exam-main-main .float_container{
		width: 400rpx;
		height: 180rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 30rpx;
		right: 30rpx;
		border: 1px solid #f3f3f3;
		border-radius: 14rpx;
	}
	.exam-main-main .float_container .f_tag{
		margin: 5rpx;
		border-radius: 10rpx;
	}
</style>
