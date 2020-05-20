/**
 * Created by Jay
 */

// 判断是否为空字符串
const isBlank = function(str){
	if(typeof str == 'string' && str.length > 0){
		return false;
	}
	return true;
};

export default {
	isBlank,
}