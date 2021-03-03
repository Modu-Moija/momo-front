import React, { useState, useContext, createContext } from 'react';
import { childrenObj } from '../Type';

const PracticeState = createContext<string>("");

export const PracticeContextProvider = ({ children } : childrenObj) => {
	const [string, setString] = useState<string>("hi");

	return (
		<PracticeState.Provider value={string}>
			{children}
		</PracticeState.Provider>
	);
}

export function useStringState(){
	const context = useContext(PracticeState);
	return context;
}