import React from 'react';
import "../../scss/component/_information.scss";

export const Information = ({data} : any) => {
	console.log(data?.data);
	const info = data?.data.meetSubInfo;
	// 일단 짠다....
	let who = info.who;
	if (who === null) {
		who = "no one"
	}

	return (
		<div className="info_container">
			<div className="info_title">
				<h3>누구랑?</h3>
				<h3>언제?</h3>
				<h3>어디서?</h3>
			</div>
			<div className="info_data">
				<p>{who.join(' , ')}</p>
				<p>{info.when}</p>
				<p>{info.where}</p>
			</div>
			{/* <div>
				<span className="info_title">누구랑?</span>
				<span className="info_data">{info.who}</span>
			</div>
			<div>
				<span className="info_title">언제?</span>
				<span className="info_data">{info.when}</span>
			</div>
			<div>
				<span className="info_title">어디서?</span>
				<span className="info_data">{info.where}</span>
			</div> */}
		</div>
	);
}