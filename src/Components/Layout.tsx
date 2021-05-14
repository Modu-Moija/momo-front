import React, { useState } from 'react';
import { Header } from '.';

const Layout : React.FC = ({children}) => {
	return (
		<div id="wrap">
			<Header />
			<div id="body-wrap">
				{children}
			</div>
		</div>
	)
};

export default Layout;