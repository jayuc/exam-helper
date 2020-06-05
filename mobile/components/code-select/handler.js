/**
 * Created by Jay
 */
import SynStore from '@/src/common/SynStore.js';

// 主题数据
const contractor = new SynStore([], true);

// 获取主题数据
const get = (callback, params) => {
	contractor.get(callback, 'code/queryCodeByType', params);
};

// 清除主题数据
const clear = () => {
	contractor.clear();
};

export default {
	get,
	clear
};
