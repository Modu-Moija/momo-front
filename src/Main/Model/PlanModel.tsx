import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { childrenObj, PlanType, PlanInfoType } from '../Type';
import axios from 'axios';
import { API_HOST } from '../../Common';
import planData from '../../mock/planData';

const PlanState = createContext<PlanType | undefined>(undefined);
const PlanDispatch = createContext<Dispatch<PlanType>>(() => { });
const fetchPlanFunction = createContext< (meetId: string) => Promise<void> | void>(() => {});

export const PlanContextProvider = ({ children }: childrenObj) => {
	const [planInfo, setPlanInfo] = useState<PlanInfoType | undefined>(undefined);
	const [plan, setPlan] = useState<PlanType | undefined>(undefined);

	const fetchPlanInfo = async (meetId: string) => {
		const API_PATH = `/api/meet/${meetId}`;
		const { data } = await axios.get(`${API_HOST}${API_PATH}`);
		setPlanInfo(data?.data);
	}

	const fetchPlanTime = async () => {
		const API_PATH = '/api/time/usertime';
		const {data} = await axios.get(`${API_HOST}${API_PATH}`, {
			withCredentials: true
		});

		setPlan(data);
	}

	const fetchPlan = (meetId : string) => {
		fetchPlanInfo(meetId);
		fetchPlanTime();
	}

	return (
		<PlanState.Provider value={plan}>
			<PlanDispatch.Provider value={setPlan}>
				<fetchPlanFunction.Provider value={fetchPlan}>
					{children}
				</fetchPlanFunction.Provider>
			</PlanDispatch.Provider>
		</PlanState.Provider>
	);
}

export function useFetchPlan() {
	const context = useContext(fetchPlanFunction);
	return context;
}

export function usePlanState() {
	const context = useContext(PlanState);
	return context;
}
export function usePlanDispatch() {
	const context = useContext(PlanDispatch);
	return context;
}