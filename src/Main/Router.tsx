import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Setting, Login, Result } from '../Pages';
import { Layout } from '../Components';

const Router : React.FC = () => (
	<Layout>
		<Switch>
			<Route exact path="/" component={Setting} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/result/:meetId" component={Result} />
		</Switch>
	</Layout>
);

export default Router;
