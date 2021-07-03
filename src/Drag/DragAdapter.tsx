import React, { useEffect, useState } from 'react';
import { usePlanState } from '../Main/Model/PlanModel';
import { DateToSmallYearDateString } from '../Function/DateToString';
import { DragProvider } from '.';

type Props = {
	date: Date
}

const DragAdapter = ({ date }: Props) => {
	const plan = usePlanState();
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

	const saveTimeArray = () => {
		console.log(saveTimeArray);
	}

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