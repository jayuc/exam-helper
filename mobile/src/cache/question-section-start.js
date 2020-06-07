/**
 * 记录某个章节上一次浏览记录
 */

const type = 'section_';
const defaultValue = 1;

const createKey = (sectionType) => {
	return type + sectionType;
};

// 设置浏览记录
const setStartBySection = (sectionType, start) => {
	try {
	    uni.setStorageSync(createKey(sectionType), start);
	} catch (e) {
	    // error
	}
};

// 获取浏览记录
const getStartBySection = (sectionType) => {
	try {
	    const value = uni.getStorageSync(createKey(sectionType));
	    if (value) {
	        return value;
	    }
	} catch (e) {
	    // error
	}
	return defaultValue;
};

// 复位
const resetBySection = (sectionType) => {
	setStartBySection(sectionType, defaultValue);
};

export default{
	getStartBySection,
	setStartBySection,
	resetBySection,
	defaultValue
}
