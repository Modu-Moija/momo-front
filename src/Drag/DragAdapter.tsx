import React, { useEffect, useState } from 'react';
import { usePlanState, usePlanDispatch } from '../Main/Model/PlanModel';
import { DateToSmallYearDateString } from '../Function/DateToString';
import { DragProvider } from '.';

type Props = {
	date: Date
}

const DragAdapter = ({ date }: Props) => {
	const plan = usePlanState();
	const setPlan = usePlanDispatch();
	const [timeArray, setTimeArray] = useState<string[]>([]);
	const [boolArray, setBoolArray] = useState<boolean[]>([]);

	useEffect(() => {
		if (plan === undefined)
			return;
		const dateString = DateToSmallYearDateString(date);
		const timeList = plan.planList[dateString];
	
		setTimeArray(Object.keys(timeList));
		setBoolArray(Object.values(timeList));
	}, [plan, date]);

	useEffect(() => {
		const newPlan = Object.assign({}, plan);
		if(!newPlan)
			return;
		// TODO : timeArray와 boolArray 넘겨서 api 호출 => planModel의 api
	}, [boolArray]);

	return (
		<>
			{
				timeArray.length && boolArray.length &&
				<DragProvider
					timeArray={timeArray}
					boolArray={boolArray}
					setBoolArray = {setBoolArray}
				/>
			}
		</>
	);
}

export default DragAdapter;