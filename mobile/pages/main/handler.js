/**
 * Created by 余杰
 */
import restUtil from '@/utils/restUtil.js';

const queryOne = (param) => {
	return restUtil.get({url: 'question/selectById', data: param});
};

export default{
	queryOne
}