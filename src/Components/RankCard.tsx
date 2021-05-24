import React from 'react';
import "../scss/component/_rankcard.scss";

const RankCard = () => {
	const index  = 1;
	const timeRange  = "10:00PM ~ 11:00PM";
	const canDo : string[] = ["우희은", "김수람", "이소정", "박미현"];
	const cantDo : string[] = ["조은학", "홍영주"];
	return (
		<div className="rank-card">
			<div className="rank-title">
				<p>{index}</p><p>{timeRange}</p>
			</div>
			<div className="rank-people">
				<div>
					<img src="/img/people_can.png" alt="되는 사람"/>
					<p>{`: ${canDo.length}`}</p>
				</div>
				<div className="people-list">
					{canDo.map((people, index) => <div key={index}>{people}</div>)}
				</div>
			</div>
			<div className="rank-people">
				<div>
					<img src="/img/people_cant.png" alt="안되는 사람"/>
					<p>{`: ${cantDo.length}`}</p>
				</div>
				<div className="people-list">
					{cantDo.map((people, index) => <div key={index}>{people}</div>)}
				</div>
			</div>
		</div>
	);
};

export default RankCard;