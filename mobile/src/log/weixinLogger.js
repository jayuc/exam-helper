/**
 * 微信日志对象
 * Created by Jay
 */

// 日志对象
var logger = null;

// 是否要console
if(wx.getRealtimeLogManager){
	var log = wx.getRealtimeLogManager();
	logger = {
	  debug() {
		if (!log) return;
		log.debug.apply(log, arguments);
		console.debug.apply(log, arguments);
	  },
	  info() {
		if (!log) return;
		log.info.apply(log, arguments);
		console.log.apply(log, arguments);
	  },
	  warn() {
		if (!log) return;
		log.warn.apply(log, arguments);
		console.warn.apply(log, arguments);
	  },
	  error() {
		if (!log) return;
		log.error.apply(log, arguments);
		console.error.apply(log, arguments);
	  },
	  setFilterMsg(msg) { // 从基础库2.7.3开始支持
		if (!log || !log.setFilterMsg) return;
		if (typeof msg !== 'string') return;
		log.setFilterMsg(msg);
	  },
	  addFilterMsg(msg) { // 从基础库2.8.1开始支持
		if (!log || !log.addFilterMsg) return;
		if (typeof msg !== 'string') return;
		log.addFilterMsg(msg);
	  }
	}
}

export default logger;
