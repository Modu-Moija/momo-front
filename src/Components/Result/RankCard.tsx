import React from 'react';
import { AwardType } from '../../Main/Type';
import "../../scss/component/_rankcard.scss";

interface RankCardProp extends AwardType{
	index: number,
}

export const RankCard = ({
	date,
	time,
	users,
	index,
} : RankCardProp) => {
	const cantDo : string[] = ["조은학", "홍영주"];
	return (
		<div className="rank-card">
			<div className="rank-title">
				<p>{index}</p><p>{`${date} ${time}`}</p>
			</div>
			<div className="rank-people">
				<div>
					<img src="/img/people_can.png" alt="되는 사람"/>
					<p>{`: ${users.length}`}</p>
				</div>
				<div className="people-list">
					{users.map((people, index) => <div key={index}>{people}</div>)}
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
