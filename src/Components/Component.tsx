import React from 'react';
import { Grid } from '@material-ui/core';
import { useStringState } from '../Main/Model/PracticeModel';

const Component = () => {
	const string = useStringState();
	return(
		<>
			<Grid className="component-wrap">component</Grid>
			<Grid>{string}</Grid>
		</>
	);
}

export default Component;
