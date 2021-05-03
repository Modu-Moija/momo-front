import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Setting, Login, Result } from '../Pages';

const Router : React.FC = () => (
	<Switch>
		<Route exact path="/" component={Setting} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/result" component={Result} />
	</Switch>
);

export default Router;
