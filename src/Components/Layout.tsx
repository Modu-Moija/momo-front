import React from 'react';
import { Header } from '.';

const Layout : React.FC = ({children}) => {
	const a = 1;
	return (
		<div>
			<Header />
			<div id="body-wrap">
				{children}
			</div>
		</div>
	)
};

export default Layout;