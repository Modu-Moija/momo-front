import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';
import { childrenObj, PlanType } from '../Type';

const PlanState = createContext<PlanType | undefined>(undefined); 
const PlanDispatch = createContext<Dispatch<PlanType>>(()=>{}); 

export const PlanContextProvider = ({ children } : childrenObj) => {
	const [plan, setPlan] = useState<PlanType | undefined>(undefined);

	// todo : api로 받아오고 저장하는 함수 구현
	
	useEffect(()=>{ // 초기화
		setPlan({
			id: "gmldms784",
			planList: {
				"21/5/23" : {
					"10:00" : true,
					"10:30" : true,
					"11:00" : false,
					"11:30" : false,
					"12:00" : false,
					"12:30" : false,
					"13:00" : false,
					"13:30" : false,
					"14:00" : false,
					"14:30" : false,
					"15:00" : false,
					"15:30" : false,
					"16:00" : false,
					"16:30" : false
				},
				"21/5/24" : {
					"10:00" : true,
					"10:30" : true,
					"11:00" : true,
					"11:30" : false,
				},
				"21/5/25" : {
					"10:00" : false,
					"10:30" : false,
					"11:00" : false,
					"11:30" : false
				},
				"21/5/26" : {
					"10:00" : false,
					"10:30" : false,
					"11:00" : false,
					"11:30" : false
				},
				"21/5/27" : {
					"10:00" : false,
					"10:30" : false,
					"11:00" : false,
					"11:30" : false
				},
				"21/5/28" : {
					"10:00" : false,
					"10:30" : false,
					"11:00" : false,
					"11:30" : false
				}
			},
			resultList : {
				"21/05/23" : {
					"10:00" : 3,
					"10:30" : 5,
					"11:00" : 2,
					"11:30" : 1,
				},
				"21/05/24" : {
					"10:00" : 1,
					"10:30" : 1,
					"11:00" : 1,
					"11:30" : 0,
				},
				"21/05/25" : {
					"10:00" : 0,
					"10:30" : 0,
					"11:00" : 0,
					"11:30" : 0
				},
				"21/5/26" : {
					"10:00" : 0,
					"10:30" : 0,
					"11:00" : 0,
					"11:30" : 0
				},
				"21/5/27" : {
					"10:00" : 0,
					"10:30" : 0,
					"11:00" : 0,
					"11:30" : 0
				},
				"21/5/28" : {
					"10:00" : 0,
					"10:30" : 0,
					"11:00" : 2,
					"11:30" : 0
				}
			}
		})
	}, []);

	return (
		<PlanState.Provider value={plan}>
			<PlanDispatch.Provider value={setPlan}>
				{children}
			</PlanDispatch.Provider>
		</PlanState.Provider>
	);
}

export function usePlanState(){
	const context = useContext(PlanState);
	return context;
}
export function usePlanDispatch(){
	const context = useContext(PlanDispatch);
	return context;
}