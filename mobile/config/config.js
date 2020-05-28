/**
 * Created by Jay
 */

// ip
var address = null;
// 日志级别
// 可选值: info, warn, error, none 其中none表示不打印日志
const logLevel = 'info';

// 默认地址
const defaultAddress = "http://127.0.0.1:5872/";
// 线上版本地址
// const defaultAddress = "http://top.jayu:5872/";

// ip 
const ip = function(){
	return getIp() || defaultAddress;
}
// rest 地址
const getRestUrl = function(){
	return ip();
}
// websocket 地址
const getWebsocketUrl = function(){
	return "ws" + ip().replace("http", "") + "ws";
};

// 从缓存中获取ip
function getIp(){
	if(address){
		return address;
	}
	try {
	    return uni.getStorageSync('ip');
	} catch (e) {
	    
	}
	return null;
}

// 设置 ip
const setIp = function(value){
	address = value;
};

export default{
	getRestUrl,
	getWebsocketUrl,
	ip,
	setIp,
	logLevel
}