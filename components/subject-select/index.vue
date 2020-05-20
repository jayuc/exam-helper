<template>
	<common-label :label="label">
		<picker @change="bindPickerChange" :value="index" :range="array" :range-key="key" class="global-label-input">
			<view class="uni-input">{{array[index] ? array[index][key] : ''}}</view>
		</picker>
	</common-label>
</template>

<script>
	/**
	 * 专题组件
	 * Created by Jay
	 */
	import commonLabel from '@/components/common-label/index.vue';
	import handler from '@/components/subject-select/handler.js';
	
	export default {
		components: {
			commonLabel
		},
		props: {
			label: String,
			defaultValue: String
		},
		data() {
			return {
				array: [{}],
				index: null,
				key: "text"
			}
		},
		mounted() {
			this.array = handler.get();
		},
		methods: {
			bindPickerChange(e){
				this.index = e.target.value;
				let item = this.array[this.index];
				this.$emit('select', item);
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
