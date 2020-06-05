/**
 * 计数器
 * Created by Jay
 */

function CountDownLatch(t, finalFun){
	if(typeof t !== 'number' && t > 0){
		throw new Error('参数必须为数字');
	}
	this.total = t;
	this.ffun = finalFun;
}
CountDownLatch.prototype = {
	countDown(callback){
		this.total --;
		if(this.total === 0){
			if(typeof this.ffun === 'function'){
				this.ffun();
			}
		}
	}
};

export default CountDownLatch;