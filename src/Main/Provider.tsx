import React from 'react';

import { PracticeContextProvider } from './Model/PracticeModel';
import Router from './Router';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<PracticeContextProvider>
			<Router />
		</PracticeContextProvider>
	);
};

export default Provider;
