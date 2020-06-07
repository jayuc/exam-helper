/**
 * Created by 余杰
 */
import restUtil from '@/utils/restUtil.js';
import stringUtil from '@/utils/stringUtil.js';
import dateUtil from '@/utils/dateUtils.js';
import sectionStart from '@/src/cache/question-section-start.js';

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

// 判断是否包含某个字符串
const containStr = (candidate, str) => {
	if(!stringUtil.isBlank(candidate) && !stringUtil.isBlank(str)){
		return candidate.indexOf(str) !== -1;
	}
	return false;
};

// 获取当天字符串
const getCurrentDayStr = () => {
	return dateUtil.formatDate(new Date(), 'yyyy-MM-dd');
};

function computeNumber(total, size){
	let number = parseInt(total/size);
	if(total%size > 0){
		number ++;
	}
	return number;
}

// 计算页数据
const computePageData = (firstLoad, pageSize, pageNumber, sectionType) => {
	if(firstLoad && sectionType){
		let lastStart = sectionStart.getStartBySection(sectionType);
		let _number = computeNumber(lastStart, pageSize);
		return {
			pageSize: _number*pageSize,
			pageNumber: _number,
			index: lastStart
		};
	}
	return null;
};

// 设置本次记录
const setTheStart = (sectionType, start) => {
	if(sectionStart && start > sectionStart.defaultValue){
		sectionStart.setStartBySection(sectionType, start);
	}
};

// reset
const resetTheStart = (sectionType) => {
	if(sectionType){
		sectionStart.resetBySection(sectionType);
	}
};

export default{
	queryOne,
	convertBr,
	modifyOneQuestion,
	containStr,
	getCurrentDayStr,
	computePageData,
	setTheStart,
	resetTheStart
}