import React, { useState } from 'react';
import "../scss/pages/result.scss";
import { Button } from '@material-ui/core';

import { PageTitle, CalendarComponent } from '../Components';
import { DateRangeType, DateRangeParaType } from '../Main/Type';
import { useArrowDispatch, useArrowState} from '../Main/Model/ArrowModel';

const Result = () => {
	// 일정 선택, 결과 표시
	const name = "희은";
	const title = "웹 디자인 레이아웃 회의";

	const arrowShow = useArrowState();
	const setArrowShow = useArrowDispatch();

	const [date, setDate] = useState<Date>(new Date());

	const handleDateClick = (datePara : any) => { // 나중에 type 정확히 하기
		setDate(datePara);
	}

	const showResult = () => {
		setArrowShow(true);
	}

	return (
		<div id="result-wrap">
			<div id="result-calendar-con">
				<div>
					<PageTitle
						upperTitle={name}
						title={title}
					/>
				</div>
				<div className="result-table">
					<CalendarComponent
						date = {date}
						handleDateClick = {handleDateClick}
					/>
				</div>
				<div>
					정보
					{
						// todo : 일정 생성이면 생성, 설정이면 정보 및 버튼
					}
				</div>
				<div className="btn-con">
					<Button variant="contained" color="primary" onClick={showResult}>
						우리의 약속시간은?
					</Button>
				</div>
			</div>
			<div id="result-page" className={arrowShow?"visible":"unvisible"}>
				<div>
					<PageTitle
						title="최종 약속 시간"
					/>
				</div>
			</div>
		</div>
	)
};

export default Result;