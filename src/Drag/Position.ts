import { Subscribe, Debounce, IsClicked } from '.';
import { EventType } from '../Main/Type';

export default class Position{
	// 시작한 위치, 지나가는 위치, 마지막 위치 저장
	public startPos : number | undefined;
	public endPos : number | undefined;
	private subscribers : Subscribe;
	private isClicked : IsClicked;

	constructor(subscribers : Subscribe, isClicked : IsClicked){
		this.startPos = undefined;
		this.endPos = undefined;
		this.subscribers = subscribers;
		this.isClicked = isClicked;
		this.init();
	}

	init(){
		this.subscribers.subscribe('mouseDown', this.start.bind(this));
		this.subscribers.subscribe('mouseMove', Debounce(this.move.bind(this), 100));
		this.subscribers.subscribe('mouseUp', this.end.bind(this));
	}

	async start(event? : EventType){
		if(!event)
			return;
		const target = (event.target as Element);
		try{
			const pos = Number(target.id);
			this.startPos = await pos;
			await console.log("startPos : ", this.startPos);
			await this.subscribers.publish('startPointSave', event); // startPoint가 저장되었으면 publish
		}catch(error){
			console.log(error);
			console.log("시작 위치 저장이 안되었어요.");
			return;
		}
	}

	async move(event? : EventType){
		if(!event)
			return;
		if(!this.isClicked.isClicked)
			return;
		await this.saveEndPoint(event);
	}

	async end(event? : EventType){
		console.log("position end");
		if(!event)
			return;
		await this.saveEndPoint(event);
		await this.subscribers.publish('endPointSave', event);
		this.startPos = undefined;
		this.endPos = undefined;
	}

	async saveEndPoint(event : EventType){
		const target = (event.target as Element);
		if(!target){ // 없으면 끝
			return;
		}
		if(target.tagName !== "BUTTON"){ // 다른 dom이 클릭되었으면
			return;
		}
		try{
			const pos = Number(target.id);
			if(this.endPos && this.endPos == pos){
				// 이전 값과 같으면 (같은 칸에서 움직이고 있으면) 건너뛰기
				return;
			}
			this.endPos = await pos;
			await console.log("endPos : ", this.endPos);
			await this.subscribers.publish('movePointSave', event);
		}catch(error){
			console.log(error);
			console.log("끝 위치가 저장 안되었어요.");
			return;
		}
	}
}