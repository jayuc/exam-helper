/**
 * Created by 余杰
 */

import restUtil from '@/utils/restUtil.js';

const store = {
	
};

const storeCode = (codeType) => {
	store[codeType] = {};
	restUtil.get({url: 'code/queryCodeByType', data: {codeType}}).
		then((result) => {
			for(let index in result){
				let item = result[index];
				store[codeType][item.codeNo] = item.codeName;
			}
		})
};

const getCodeName = (codeType, codeNo) => {
	let map = store[codeType];
	if(map){
		let value = map[codeNo];
		if(value){
			return value;
		}
	}
	return '';
};

export default {
	storeCode,
	getCodeName
}