import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
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
					<PeopleIcon/>
					<p>{`: ${canDo.length}`}</p>
				</div>
				<div className="people-list">
					{canDo.map((people, index) => <div key={index}>{people}</div>)}
				</div>
			</div>
			<div className="rank-people">
				<div>
					<PeopleIcon/>
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