/**
 * 双向链表
 */

class LinkedList{
	
	constructor(list) {
	    this.head = new entry();  // 头
		this.tail = null;  // 尾
		
		this.size = 0;
		
		if(list instanceof Array){
			this.addList(list);
		}else if(list){
			this.add(list);
		}
	}
	
	// 是否为空
	isEmpty(){
		if(this.size > 0){
			return false;
		}
		return true;
	}
	
	// 添加一个元素
	add(value){
		let el = new entry(value);
		
		if(this.isEmpty()){
			console.log(value);
			this.head = el;
			this.tail = this.head;
		}else{
			let tail = this.tail;
			tail.next = el;
			el.prev = tail;
			this.tail = el;
		}
		console.log('----');
		this.size++;
		this.initExecute = true;
		return el;
	}
	
	// 添加一组元素
	addList(list){
		if(list instanceof Array){
			for(let index in list){
				this.add(list[index]);
			}
		}
	}
	
	// 删除一个元素
	remove(el){
		if(el instanceof entry){
			let prev = el.prev;
			let next = el.next;
			if(prev && next){
				prev.next = next;
				next.prev = prev;
				this.size--;
				el.prev = null;
				el.next = null;
				return true;
			}
		}
		return false;
	}
	
	// 循环
	foreach(callback){
		if(typeof callback === 'function'){
			let e = this.head;
			while(e !== this.tail){
				callback(e);
				e = e.next;
			}
			callback(e);
		}
	}
	
}

// entry
class entry{
	constructor(value) {
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

export default LinkedList;