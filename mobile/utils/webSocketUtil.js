/**
 * websocket 工具类
 * Created by Jay
 */
import WebSocket from '@/src/global/webSocket.js';
import config from '@/config/config.js';
import logUtil from '@/utils/logUtil.js';

// websocket 核心对象
let websocket = null;

// 初始化
const init = function(){
	websocket = new WebSocket(config.getWebsocketUrl());
	connect(function(){
		logUtil.info('WebSocket: <== 连接成功');
	});
};

// 连接
const connect = function(callback){
	if(websocket){
		websocket.connect(callback);
	}
};

// 订阅
/**
 * @param {Object} key
 * @param {Object} callback
 * 返回值： 订阅 id
 */
const addSubscribe = function(key, callback){
	if(websocket){
		return websocket.addSubscribe(key, callback);
	}
	return null;
};

// 删除订阅
// key: 订阅key
// subscribeId : 订阅成功后返回id
const removeSubscribe = function(key, subscribeId){
	if(isOpen()){
		websocket.removeSubscribe(key, subscribeId);
	}
};

// 发送消息
const sendMessage = function(key, value){
	if(isOpen()){
		websocket.sendMessage(key, value);
	}
};

// 关闭websocket
const close = function(){
	if(isOpen()){
		websocket.close();
		websocket = null;
	}
};

function isOpen(){
	if(websocket && websocket.status){
		return true;
	}
	return false;
}

export default{
	init,
	addSubscribe,
	removeSubscribe,
	sendMessage,
	close,
}