/**
 * Created by 余杰
 */
import restUtil from '@/utils/restUtil.js';

const queryOne = (param) => {
	return restUtil.get({url: 'question/selectById', data: param});
};

// 把换行符 \n 变成</br>
const convertBr = (text) => {
	return text.replace(/(\r\n)|(\n)/g,'<br>');
};

export default{
	queryOne,
	convertBr
}