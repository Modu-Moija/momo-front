import React from 'react';

import { ArrowContextProvider } from './Model/ArrowModel';
import Router from './Router';

const Provider : React.FC = () => {
	const a = 1;
	return (
		<ArrowContextProvider>
			<Router />
		</ArrowContextProvider>
	);
};

export default Provider;
