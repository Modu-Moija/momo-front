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

// drag
export type PlanType = {
	id : string,
	planList : DateListType,
	resultList : DateResultType
}
export type DateResultType = {
	[date : string] : TimeResultType
}
export type TimeResultType = {
	[time : string] : number // 모든 유저의 클릭 수
}
export type DateListType = {
	[date : string] : TimeListType // date는 OO/OO/OO 형태
}
export type TimeListType = {
	[time : string] : boolean // time은 시작 시간, OO:OO 형태, 해당 유저가 클릭했는지를 나타냄
}
export type TimeArrayType = [boolean];
export type EventType = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>;