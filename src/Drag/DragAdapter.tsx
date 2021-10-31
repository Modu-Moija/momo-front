import React, { useEffect, useState } from 'react';
import { useFetchPlan, usePlanState } from '../Main/Model/PlanModel';
import { DateToYearDateString } from '../Function/DateToString';
import { DragProvider } from '.';
import axios from 'axios';
import { API_HOST } from '../Common';

type Props = {
	date: Date
}

interface NewPlanType {
	meetId: string,
	usertimes: {
		date: string,
		timeslots: {
			time: string,
			possible: boolean,
		}[] | null,
	}[],
}

const DragAdapter = ({ date }: Props) => {
	const plan = usePlanState();
	const [timeArray, setTimeArray] = useState<string[]>([]);
	const [boolArray, setBoolArray] = useState<boolean[]>([]);

	const getTimeBoolObject = () => {
		if (timeArray.length !== boolArray.length)
			return null;
		const objList = [];
		for (let i = 0; i < timeArray.length; i++) {
			objList.push({
				time: timeArray[i],
				possible: boolArray[i]
			});
		}
		return objList;
	}

	useEffect(() => {
		if (plan === undefined)
			return;
		const dateString = DateToYearDateString(date);
		const timeList = plan.planList[dateString];

		setTimeArray(Object.keys(timeList));
		setBoolArray(Object.values(timeList));
	}, [plan, date]);

	useEffect(() => {
		if (!plan) return;

		const newPlan: NewPlanType = {
			meetId: plan.meetId,
			usertimes: [{
				date: DateToYearDateString(date).split('/').join('-'), // api 쪽에서 08월 같은 경우 오류날 수도 있을 거 같음
				timeslots: getTimeBoolObject()
			}]
		}

		putUserPlan(newPlan);
	}, [boolArray]);

	const putUserPlan = async (newPlan: NewPlanType) => {
		const API_PATH = '/api/time';
		const { data } = await axios.put(`${API_HOST}${API_PATH}`, newPlan, {
			withCredentials: true
		});
	}

	return (
		<>
			{
				timeArray.length && boolArray.length &&
				<DragProvider
					timeArray={timeArray}
					boolArray={boolArray}
					setBoolArray={setBoolArray}
				/>
			}
		</>
	);
}

export default DragAdapter;