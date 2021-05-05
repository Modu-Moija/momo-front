import React from 'react';
import "../scss/pages/result.scss";

import { PageTitle } from '../Components';

const Result = () => {
	// 일정 선택, 결과 표시
	const name = "희은";
	const title = "웹 디자인 레이아웃 회의";
	return (
		<div id="result-wrap">
			<div className="result-header">
				<PageTitle
					upperTitle={name}
					title={title}
				/>
			</div>
			<div className="result-table">
				테이블
				{
					// todo : table 그리기
				}
			</div>
			<div className="result-contents">
				정보
				{
					// todo : 일정 생성이면 생성, 설정이면 정보 및 버튼
				}
			</div>
		</div>
	)
};

export default Result;