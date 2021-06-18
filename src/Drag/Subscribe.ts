import { Dispatch } from 'react';
import { EventType } from '../Main/Type';

export default class Subscribe{
	private subscribers : {[event : string] : Function[]};
	public boolArray : boolean[];
	public setBoolArray : Dispatch<boolean[]>;

	constructor(boolArray : boolean[], setBoolArray : Dispatch<boolean[]>){
		this.subscribers = {};
		this.boolArray = boolArray;
		this.setBoolArray = setBoolArray;
	}

	setBoolArr(boolArr : boolean[]){
		this.boolArray = boolArr;
	}
	
	subscribe(event : string, callback : Function){
		// event의 handler로 callback 등록
		if(!this.subscribers[event]){
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);

		return this.subscribers[event].length-1;
	}
	unsubscribe(event : string, callback : Function, idx : number){
		// event의 handler에서 callback 삭제
		if(idx === undefined){
			// idx가 안들어왔으면 callback으로 찾기
			idx = this.subscribers[event].findIndex((func : Function) => func === callback);
		}
		if(!this.subscribers[event][idx])
			return;
		this.subscribers[event].splice(idx, 1);
	}
	publish(event : string, data? : EventType){
		if(!this.subscribers[event])
			return;
		// 핸들러 순차적 실행
		this.subscribers[event].forEach(async (handler : Function, index: number) => {
			await handler(data);
		});
	}
}