/**
 * console 日志
 * Created by Jay
 */

// 日志对象
var logger = {
	debug(){
		console.debug.apply(this, arguments);
	},
	info(){
		console.log.apply(this, arguments);
	},
	warn(){
		console.warn.apply(this, arguments);
	},
	error(){
		console.error.apply(this, arguments);
	},
	setFilterMsg(){
		
	},
	addFilterMsg(){
		
	}
};

export default logger;
