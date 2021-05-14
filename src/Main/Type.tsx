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