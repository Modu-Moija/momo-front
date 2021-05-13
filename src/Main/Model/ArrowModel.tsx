import React, { useState, useContext, createContext, Dispatch } from 'react';
import { childrenObj } from '../Type';

const ArrowState = createContext<boolean>(false); // header에 arrow가 나타나야 하는지
const ArrowDispatch = createContext<Dispatch<boolean>>(()=>{}); // header에 arrow가 나타나야 하는지

export const ArrowContextProvider = ({ children } : childrenObj) => {
	const [arrowShow, setArrowShow] = useState<boolean>(false);

	return (
		<ArrowState.Provider value={arrowShow}>
			<ArrowDispatch.Provider value={setArrowShow}>
				{children}
			</ArrowDispatch.Provider>
		</ArrowState.Provider>
	);
}

export function useArrowState(){
	const context = useContext(ArrowState);
	return context;
}
export function useArrowDispatch(){
	const context = useContext(ArrowDispatch);
	return context;
}