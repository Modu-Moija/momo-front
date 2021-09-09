import React from 'react';

export const Information = ({data} : any) => {
	const info = data?.data.meetSubInfo;
	return (
		<>
			<div>{info.who}</div>
			<div>{info.when}</div>
			<div>{info.where}</div>
		</>
	);
}