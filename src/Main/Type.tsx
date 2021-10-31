import { RangeWithKey } from 'react-date-range';

export type childrenObj = {
	children : React.ReactNode;
};
export type DateRangeParaType = {
	selection : RangeWithKey
}
export type DateRangeType = {
	startDate : Date,
	endDate : Date,
	key: string
};
export type timeNodeType = {
	timeString : string,
	picked : boolean
}

export type PlanType = {
	meetId : string,
	planList : DateListType,
	colorDate : MonthResultType
}
export type PlanInfoType = {
	title: string,//"약속생성테스트3",
	start: string,//"12:00",
	end: string,//"18:00",
	gap: number,//30,
	dates: string[],
	center: boolean, //true,
	video: boolean, //false,
	meetSubInfo: {
			who: string,//null,
			when: string, //"2021-07-23 ~ 2021-07-28",
			where: string,//"대면회의"
	}
}
export type MonthResultType = {
	[month : number] : DateResultType;
}
export type DateResultType = {
	[date : number] : number // 모든 유저의 클릭 수
}
export type DateListType = {
	[date : string] : TimeListType // date는 OO/OO/OO 형태
}
export type TimeListType = {
	[time : string] : boolean // time은 시작 시간, OO:OO 형태, 해당 유저가 클릭했는지를 나타냄
}
export type TimeArrayType = [boolean];
export type EventType = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>;

export type AwardInfoType = {
	meetId: string,
	leastTime : AwardType[],
	mostTime : AwardType[],
}
export interface AwardType{
	date: string,
	key?: string,
	num?: number,
	time: string,
	users: string[],
}