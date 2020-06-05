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

// 修改问题
const modifyOneQuestion = (param) => {
	return restUtil.post({url: 'question/update', data: param});
};

export default{
	queryOne,
	convertBr,
	modifyOneQuestion
}