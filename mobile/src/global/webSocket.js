/**
 * websocket 类
 * Created by Jay
 */
import UserParam from '@/src/user/UserParam.js';
import logUtil from '@/utils/logUtil.js';

// 订阅key
const addSubscribeKey = "addSubscribe";
// 删除订阅key
const removeSubscribeKey = "removeSubscribe";
// 全局 key
const globalKey = "globalKey";
// user id
const userId = "userId";

// 订阅对象 id
var subscribeId = 1;

// websocket 对象
function WebSocket(url){
	this.url = url;
	this.status = false;
	this.handleFunction = {};
}

WebSocket.prototype = {
	// 连接
	connect: function(callback){
		let that = this;
		uni.connectSocket({
			url: that.url,
			success: function(){
				that.status = true;
				if(typeof callback == 'function'){
					callback();
				}
			}
		});
		uni.onSocketMessage(function (result) {
			let res = JSON.parse(result.data);
			let key = res['key'];
			let data = res['value'];
			if(key){
				let handleObj = that.handleFunction[key];
				if(handleObj){
					for(let index in handleObj){
						let item = handleObj[index];
						if(typeof item == 'function'){
							item(data, key);
						}
					}
				}
				if(key == globalKey){  // 全局
					logUtil.info('WebSocket: <== ' + createJsonStr(key, data, UserParam.userId))
				}
			}
			// logUtil.info('WebSocket: <== ' + JSON.stringify(data));
		});
		onClose(that);
		onError(that);
	},
	close: function(){
		if(this.status){
			uni.closeSocket();
		}
	},
	// reset 
	reset: function(){
		this.status = false;
		this.handleFunction = {};
	},
	sendMessage: function(key, value){
		if(this.status){
			uni.sendSocketMessage({
			  data: createJsonStr(key, value, UserParam.userId)
			});
		}
	},
	addSubscribe: function(key, callback){
		if(key){
			if(this.status){
				let handleObj = this.handleFunction[key];
				if(isEmptyForObj(handleObj)){
					this.sendMessage(addSubscribeKey, key);
				}
				if(typeof callback == 'function'){
					let id = subscribeId++;
					if(handleObj){
						handleObj[id] = callback;
					}else{
						let obj = {};
						obj[id] = callback;
						this.handleFunction[key] = obj;
					}
					return id;
				}else{
					logUtil.warn('WebSocket: ==> 订阅失败，回调方法类型错误');
				}
			}else{  // 当未连接时，尝试连接，
				if(typeof callback == 'function'){
					let id = subscribeId++;
					let that = this;
					this.connect(function(){
						setTimeout(function(){
							that.sendMessage(addSubscribeKey, key);
						}, 100);
						let obj = {};
						obj[id] = callback;
						that.handleFunction[key] = obj;
					});
					return id;
				}
			}
		}
		return null;
	},
	removeSubscribe: function(key, id){
		if(key && id){
			let handleObj = this.handleFunction[key];
			if(handleObj){
				delete handleObj[id];
			}
			if(isEmptyForObj(handleObj)){
				this.sendMessage(removeSubscribeKey, key);
			}
		}else{
			logUtil.warn('WebSocket: ==> 删除订阅失败，key和subscribeId不能为空');
		}
	}
};

// 监听 close
function onClose(that){
	uni.onSocketClose(function(esg){
		logUtil.info('WebSocket: <== 连接关闭');
		try{
			that.reset();
		}catch(e){
			
		}
	});
}

// 监听 error
function onError(that){
	uni.onSocketError(function(esg){
		logUtil.error('WebSocket: <== 连接出错');
		try{
			that.reset();
		}catch(e){
			
		}
	});
}

// 判断对象是否为空
function isEmptyForObj(obj){
	if(obj){
		return Object.getOwnPropertyNames(obj).length == 0;
	}
	return true;
}

function createJsonStr(key, value, id){
	let obj = {};
	obj[key] = value;
	obj[userId] = id;
	return JSON.stringify(obj);
}

export default WebSocket;
