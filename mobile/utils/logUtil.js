/**
 * 日志工具类型,可在微信小程序线上版本打印日志
 * 支持: 日志级别, 可以根据日志级别打印日志,日志级别有: info, warn, error
 * 支持: 生产环境关闭日志功能(通过调高日志级别),开发环境开启日志功能(通过调低日志级别)
 * Created by Jay
 */

/**
 * 微信日志说明: 
 * 1. 为了定位问题方便，日志是按页面划分的，某一个页面，在onShow到onHide（切换到其它页面、右上角圆点退到后台）之间打的日志，会聚合成一条日志上报，
 * 并且在小程序管理后台上可以根据页面路径搜索出该条日志。
 */

/**
 * 日志接口说明:  (特别说明:微信小程序中debug日志打印不出来,故暂时不用debug日志)
 * info:         信息级别日志
 * warn:         警告级别日志
 * error:        错误级别日志
 * setFilterMsg: 根据日志内容过滤日志
 * addFilterMsg: 添加日志过滤内容
 */

import weixinLogger from '@/src/log/weixinLogger.js';
import config from '@/config/config.js';
import consoleLogger from '@/src/log/consoleLogger.js';

const levelMap = {
	info: 1,
	warn: 2,
	error: 3,
	none: 10
};
// 日志级别
const level = config.logLevel ? levelMap[config.logLevel] : 10;

// 日志对象
const log = weixinLogger || consoleLogger;

// 日志
const logger = {
	info(arg){
		if(!log) return;
		if(level < 2){
			log.info(arg);
		}
	},
	warn(arg){
		if(!log) return;
		if(level < 3){
			log.warn(arg);
		}
	},
	error(arg){
		if(!log) return;
		if(level < 4){
			log.error(arg);
		}
	},
	setFilterMsg(arg){
		if(!log) return;
		if(level < 2){
			log.setFilterMsg(arg);
		}
	},
	addFilterMsg(arg){
		if(!log) return;
		if(level < 2){
			log.addFilterMsg(arg);
		}
	}
};

export default logger;