<template>
	<common-label :label="label">
		<picker @change="bindPickerChange" :value="index" :range="array" :range-key="key" class="global-label-input">
			<view class="uni-input">{{array[index] ? array[index][key] : ''}}</view>
		</picker>
	</common-label>
</template>

<script>
	/**
	 * 数据字典选择组件
	 * Created by Jay
	 */
	import commonLabel from '@/components/common-label/index.vue';
	import handler from './handler.js';
	
	export default {
		components: {
			commonLabel
		},
		props: {
			label: String,
			codeType: Number,
			defaultValue: Number
		},
		data() {
			return {
				array: [{}],
				index: null,
				key: "text"
			}
		},
		mounted() {
			let that = this;
			handler.get((data) => {
				that.array = that.handleData(data);
			}, {
				codeType: this.$props.codeType
			});
		},
		methods: {
			bindPickerChange(e){
				this.index = e.target.value;
				let item = this.array[this.index];
				this.$emit('select', item);
			},
			handleData(arr){
				let result = [];
				let that = this;
				if(arr instanceof Array){
					for(let index in arr){
						let item = arr[index];
						result.push({
							id: item.codeNo,
							text: item.codeName
						});
						if(that.$props.defaultValue && that.$props.defaultValue === item.codeNo){
							that.index = index;
						}
					}
				}
				return result;
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	@import '~@/uni.scss';
	
	.uni-input{
		padding: 5rpx 10rpx;
		color: $base-color;
	}
</style>
