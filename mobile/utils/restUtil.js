/**
 *  rest 请求工具类
 */

import config from '@/config/config.js';
import UserParam from '@/src/user/UserParam.js';
import webSocketUtil from '@/utils/webSocketUtil.js';
import logUtil from '@/utils/logUtil.js';
import stringUtil from '@/utils/stringUtil.js';

// 处理url
const handleUrl = function (url) {
	if(url){
		return config.getRestUrl() + url;
	}
	return url;
};

// 处理参数
const handleParam = function(param){
	return Object.assign(param || {}, UserParam);
}

// 发送请求
const request = function (_options) {
	logUtil.info('发起请求: ==> ' + JSON.stringify(_options));
	if(_options && _options.url){
		_options.url = handleUrl(_options.url);
		_options.data = handleParam(_options.data);
		uni.request(_options);
	}
};

const requestWrap = function(_options,callback){
	if(_options && _options.url){
		_options.url = handleUrl(_options.url);
		_options.data = handleParam(_options.data);
		callback(_options);
	}
}

// 使用 promise 发送请求
const promiseRequest = function (_url, _param, _method, _options) {
	let contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
	if(_options){
		if(_options.contentType){
			contentType = _options.contentType;
		}
	}
	if(_options.progress){  // 在请求期间是否显示 进度条
		showLoading();
	}
	if(typeof _options.disableButton === 'function'){  // 请求期间禁用按钮
		_options.disableButton();
	}
	// url
	let furl = handleUrl(_url);
	// param
	let fparam = handleParam(_param);
	// 打印日志
	logUtil.info('发起请求: ==> Url: ' + furl + ' Type: ' + _method);
	logUtil.info('请求参数: ==> ' + JSON.stringify(fparam));
	return new Promise((resolve, reject) => {
		uni.request({
			url: furl,
			method: _method,
			data: fparam,
			header: {
				'content-type': contentType,
				'user-id': UserParam.userId,
				'token': UserParam.token
			},
			timeout: 60000,
			success: res => {
				var status = res.statusCode;
				if(status == 200){
					resolve(res.data);
				}else if(status == 489){
					// 用户无权限，强制跳转到登录页面
					toLogin();
				}else{
					reject(res.data);
					logUtil.error(JSON.stringify(res));
				}
			},
			fail: (esg) => {
				logUtil.error(JSON.stringify(esg));
				reject(esg);
				// 用户无权限，强制跳转到登录页面
				toLogin();
			},
			complete: (res) => {
				// logUtil.info('请求结束: <== ' + JSON.stringify(res));
				if(_options.progress){
					hideLoading();
				}
				if(typeof _options.enableButton === 'function'){  // 解禁按钮
					_options.enableButton();
				}
			}
		});
	});
};

const get = function (options) {
	return promiseRequest(options.url, options.data, "GET", options);
};

const post = function(options){
	return promiseRequest(options.url, options.data, "POST", options);
};

// 当前页面
var currentPage = null;
// 跳转到登录页
const toLogin = function(){
	var page = getCurrentPage();
	if(page != 'login'){   // 当前页面不是登录页时,才跳转到登录页
		uni.reLaunch({
			url: '/pages/main/login/index',
			success: res => {
				logUtil.info('跳转登录页成功');
			},
			fail: () => {
				logUtil.info('跳转登录页失败');
			},
			complete: () => {
				logUtil.info('跳转登录页完成');
			}
		});
		// 关闭websocket
		webSocketUtil.close();
	}
};

// get current page
const getCurrentPage = function(){
	return currentPage;
};
// set current page
const setCurrentPage = function(value){
	currentPage = value;
};

// 提示
const showTip = function(text){
	uni.showToast({
		title: text,
		icon: 'none'
	});
};

// 显示正在加载
const showLoading = function(){
	uni.showLoading({
		mask: false
	});
};

// 隐藏正在加载
const hideLoading = function(){
	uni.hideLoading();
};

// 处理请求结果
const handleResult = function(result){
	let res = {
		status: false,
		error: '',
		rows: [],
		total: 0
	};
	if(result){
		if(stringUtil.isBlank(result.errorInfo)){
			res.status = true;
			if(result.result){
				if(result.result.rows instanceof Array){
					res.rows = result.result.rows;
				}
				if(result.result.total > 0){
					res.total = result.result.total;
				}
			}
		}else{
			res.error = result.errorInfo;
		}
	}else{
		res.error = '无数据';
	}
	return res;
};

// 验证表单
const validate = function(rules, that){
	if(typeof rules === 'object' && typeof that === 'object'){
		let error = null;
		for(let key in rules){
			let val = that[key];
			if(typeof val === 'string'){
				if(stringUtil.isBlank(val)){
					if(stringUtil.isBlank(rules[key])){
						showTip('验证出错: ' + key);
						return false;
					}else{
						error = rules[key];
						break;
					}
				}
			}else if(typeof rules[key] === 'function'){
				error = rules[key](val);
			}else{
				showTip('验证出错: ' + key);
				return false;
			}
		}
		if(stringUtil.isBlank(error)){
			return true;
		}else{
			showTip(error);
			return false;
		}
	}else{
		showTip('验证出错: 参数不正确');
		return false;
	}
};

// 确认
const confirm = function(tip, resolve, reject){
	uni.showModal({
		content: tip,
		success: function (res) {
			if (res.confirm) {
				if(typeof resolve === 'function'){
					resolve();
				}
			} else if (res.cancel) {
				if(typeof reject === 'function'){
					reject();
				}
			}
		}
	});
};

// 根据ftp图片地址访问接口,获取图片 image src直接使用
const getPhotoUrl = function(ftpUrl){
	return config.getRestUrl() +"maintain/image?ftpUrl="+ftpUrl;
};

export default{
	request,                // 发送请求
	promiseRequest,         // 使用promise发送请求
	get,                    // 发送 get 请求
	post,                   // 发送 post 请求
	toLogin,                // 跳转到登录页
	requestWrap,			// 自定义请求
	showTip,                // 提示
	getCurrentPage,         // 获取当前页是否是登录页
	setCurrentPage,         // 设置当前页
	showLoading,            // 显示正在加载
	hideLoading,            // 隐藏正在加载
	handleResult,           // 处理请求返回的结果
	validate,               // 表单验证
	confirm,                // 确认
	getPhotoUrl,			//根据ftp地址获取上传图片
}
