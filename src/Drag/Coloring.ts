import { Dispatch } from 'react';
import { Subscribe, Position, IsClicked, Debounce } from '.';

export default class Coloring{
	public startBoolean : boolean;
	private subscribers : Subscribe;
	private position : Position;
	private isClicked : IsClicked;
	private movePoints : Array<string> = []; // 현재 endPoint 까지의 점 (point/boolean)
	private savePointBoolean : Array<string> = []; // 기존 boolean 값 저장

	constructor(subscribers : Subscribe, position : Position, isClicked : IsClicked){
		this.subscribers = subscribers;
		this.startBoolean = false;
		this.position = position;
		this.isClicked = isClicked;
		this.init();
	}
	init(){
		this.subscribers.subscribe('startPointSave', this.start.bind(this));
		this.subscribers.subscribe('movePointSave',  this.move.bind(this));
		this.subscribers.subscribe('endPointSave', this.end.bind(this));
	}
	
	async start(){
		// 첫 위치의 기존 상태 저장
		if(!this.isClicked.isClicked || this.position.startPos === undefined)
			return;
		const pos = this.position.startPos;
		this.startBoolean = !this.subscribers.boolArray[pos];

		const str : string = [pos,this.subscribers.boolArray[pos]].join('/');
		this.movePoints = await [str]; // 첫 위치 저장

		const res = this.subscribers.boolArray.slice();
		res[pos] = await !this.subscribers.boolArray[pos]; // 첫 위치의 boolean toggle
		this.subscribers.setBoolArray(res.slice());
	}

	async move(){
		// 이동 되는 위치의 상태 저장
		// 이동 시 기존보다 작아졌으면 기존 상태 반영해서 되돌리기
		if(!this.isClicked.isClicked || this.position.startPos === undefined || this.position.endPos === undefined)
			return;
		await this.saveMovePoints();
	}

	async end(){
		// 이동 되는 위치의 상태 저장
		// 이동 시 기존보다 작아졌으면 기존 상태 반영해서 되돌리기
		if(this.position.startPos === undefined || this.position.endPos === undefined)
			return;
		await this.saveMovePoints();
		this.movePoints=[];

	}

	async saveMovePoints(){ // 움직이는 포인트 저장
		if(this.position.startPos === undefined || this.position.endPos === undefined)
			return;
		const nextMovePoints : Array<string> = []; // 선택된 모든 포인트
		const addedMovePoints : Array<string> = []; // 새로 추가된 포인트
		const startPos = this.position.startPos;
		const endPos = this.position.endPos;
		const small = startPos < endPos ? startPos : endPos;
		const large = startPos > endPos ? startPos : endPos;

		for(let pos=small; pos<=large; pos++){
			// i,j 저장하기
			const str = this.movePoints.find((point) => point.split('/')[0] === String(pos)); // 기존 값
			if(!str){
				const tmpStr = [pos, this.subscribers.boolArray[pos]].join('/');
				await nextMovePoints.push(tmpStr);
				addedMovePoints.push(tmpStr);
			}else{
				await nextMovePoints.push(str);
			}
		}
		const res = this.subscribers.boolArray;
		await this.coloringAdded(addedMovePoints, res);

		// nextMovePoints에 없는데 이전에는 있었던 값 => 삭제되었으므로 되돌려주기
		const deletedMovePoints = await this.movePoints.filter((point : string) => {
			return !nextMovePoints.map((nextPoint) => (
				nextPoint.split('/')[0] === point.split('/')[0] // 같은 포인트인지
			)).includes(true);
		});
		await console.log(this.movePoints, nextMovePoints, deletedMovePoints);
		await this.coloringBack(deletedMovePoints, res);
		await this.subscribers.setBoolArray(res.slice());

		this.movePoints = await nextMovePoints;
	}

	async coloringAdded(points : Array<string>, res: boolean[]){ // 더해지는 포인트 색칠하기
		await points.forEach(async (str) => {
			const strArr = str.split('/');
			const pos = Number(strArr[0]);
			const boolean = this.startBoolean;
			if(isNaN(pos))
				return;
			res[pos] = await boolean;
		});
	}

	coloringBack(points : Array<string>, res: boolean[]){
		points.forEach((str) => {
			const strArr = str.split('/');
			const pos = Number(strArr[0]);
			const boolean = (strArr[1] === "true");
			res[pos] = boolean;
		});
	}
}