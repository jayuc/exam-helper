<template>
	<view class="global-row-view m-textarea-view">
		<view class="m-textarea-label" :style="labelStyle">{{label}}：</view>
		<textarea @blur="bindTextAreaBlur" :maxlength="maxlength" class="global-label-input m-textarea-textarea" :value="initValue"
		  :placeholder="placeholder" :placeholder-style="placeholderStyle" :style="textareaStyle"/>
	</view>
</template>

<script>
	/**
	 * Created by Jay
	 */
	export default {
		props: {
			label: String,
			labelStyle: String,
			placeholder: String,
			placeholderStyle: String,
			initValue: String,
			rowSize: String,
            maxlength: {
                type: Number,
                default: 150
            }
		},
		computed: {
			labelH(){
				let text = '';
				let labelLen = this.label.length;
				for(let i=0; i<labelLen; i++){
					text += '　';
				}
				return text + '　';
			},
			textareaStyle(){
				let rowSize = this.rowSize;
				if(rowSize === 'middle'){
					return {height: '150rpx'};
				}
				if(rowSize === 'min'){
					return {height: '62rpx'};
				}
				return null;
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			bindTextAreaBlur(e){
				this.$emit('textChange', e.detail.value);
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import '~@/uni.scss';
	
	.m-textarea-label{
		font-size: $lable-base-font-size;
		float: left;
		// position: absolute;
		// left: 0rpx;
		// top: 0rpx;
	}
	.m-textarea-view{
		position: relative;
	}
	.m-textarea-textarea{
		padding: 10rpx 10rpx;
		color: $base-color;
		font-size: $lable-small-fone-size;
		float: left;
		height: 260rpx;
	}
</style>
