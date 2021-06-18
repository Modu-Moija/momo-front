import React from 'react';

import { PlanContextProvider } from './Model/PlanModel';
import { ArrowContextProvider } from './Model/ArrowModel';
import Router from './Router';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<PlanContextProvider>
			<ArrowContextProvider>
				<Router />
			</ArrowContextProvider>
		</PlanContextProvider>
	);
};

export default Provider;
