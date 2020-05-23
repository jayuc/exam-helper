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
		if(this.tail){
			return false;
		}
		return true;
	}
	
	// 添加一个元素
	add(value){
		let el = new entry(value);
		if(this.isEmpty()){
			this.head = el;
			this.tail = this.head;
		}else{
			let tail = this.tail;
			tail.next = el;
			el.prev = tail;
			this.tail = el;
		}
		this.size++;
	}
	
	// 添加一组元素
	addList(list){
		if(list instanceof Array){
			for(let index in list){
				this.add(list[index]);
			}
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