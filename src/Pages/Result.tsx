import React, { useState } from 'react';
import "../scss/pages/result.scss";

import { PageTitle, CalendarComponent } from '../Components';
import { OnChangeProps } from 'react-date-range';
import { DateRangeType, DateRangeParaType } from '../Main/Type';

const Result = () => {
	// 일정 선택, 결과 표시
	const name = "희은";
	const title = "웹 디자인 레이아웃 회의";
	const [dateRange, setDateRange] = useState<DateRangeType>({
		startDate : new Date(),
		endDate : new Date(),
		key: 'selection'
	});

	const handleDateRange = (range : any) => { // 나중에 type 정확히 하기
		const changeRange : DateRangeType = range[dateRange.key];
		setDateRange(changeRange);
	}

	return (
		<div id="result-wrap">
			<div className="result-header">
				<PageTitle
					upperTitle={name}
					title={title}
				/>
			</div>
			<div className="result-table">
				<CalendarComponent
					dateRange = {dateRange}
					handleDateRange = {handleDateRange}
				/>
			</div>
			<div className="result-contents">
				정보
				{
					// todo : 일정 생성이면 생성, 설정이면 정보 및 버튼
				}
			</div>
			<div className="btn-con">
				
			</div>
		</div>
	)
};

export default Result;