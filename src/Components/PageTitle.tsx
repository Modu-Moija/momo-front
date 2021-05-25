import React from 'react';
import '../scss/component/_pagetitle.scss';

type Props = {
	upperTitle? : string; // 위에 작게 들어가는 title
	title : string; 
}

const PageTitle = ({upperTitle, title} : Props) => {
	const a = 1;
	return (
		<div className="page-title">
			{/* <span>🟣</span> */}
			<img src="/img/circle.png" alt="circle"/>
			<div>
				{
					upperTitle &&
					<span className="small-title"><strong>{upperTitle}</strong>님의</span>
				}
				<span className="title-string">{title}</span>
			</div>
		</div>
	);
};

export default PageTitle;