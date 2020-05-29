/**
 * 结果工具类
 * 
 * 结果数据结构： {
					errorInfo: ""
					properties: {},
					result: {
						total: 1,
						rows: []
					}
				}
 * Created by 余杰
 */

// 结果是否有数据
const hasData = (result) => {
	if(result && result.result && result.result.rows.length > 0){
		return result.result.rows;
	}
	return false;
};

export default {
	hasData
}