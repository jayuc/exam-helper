/**
 * 储物对象
 * Created by Jay
 */
import stringUtil from '@/utils/stringUtil.js';
import restUtil from '@/utils/restUtil.js';

function SynStore(stores, nouseCache){
	this.store = stores;
	if(nouseCache){
		this.nouseCache = true;
	}
}
SynStore.prototype = {
	// 判断是否为空
	empty(){
		if(this.store instanceof Array){
			if(this.store.length > 0){
				return false;
			}else{
				return true;
			}
		}
		if(typeof this.store == 'object'){
			if(this.store){
				return false;
			}else{
				return true;
			}
		}
		if(typeof this.store == 'string'){
			if(stringUtil.isBlank(this.store)){
				return true;
			}else{
				return false;
			}
		}
		return true;
	},
	// 清空数据
	clear(){
		if(this.store instanceof Array){
			this.store.splice(0, this.store.length);
			return;
		}
		if(typeof this.store == 'object'){
			for(let key in this.store){
				delete this.store[key];
				return;
			}
		}
		this.store = null;
	},
	// 获取数据
	get(callback, url, param){
		if(typeof callback !== 'function' || stringUtil.isBlank(url)){
			return;
		}
		if(this.empty() || this.nouseCache){
			let that = this;
			restUtil.get({
				url: url,
				data: param
			}).then((data) => {
				that.store = data;
				callback(data);
			}, () => {
				callback([]);
			});
		}else{
			callback(this.store);
		}
	}
};

export default SynStore;