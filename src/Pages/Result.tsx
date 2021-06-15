import React, { useState } from 'react';
import "../scss/pages/result.scss";
import { Button } from '@material-ui/core';
import { OnChangeProps, Calendar, DateRange, Range } from 'react-date-range';

import { PageTitle, ResultTab, FAQmodal, TimePicker } from '../Components';
import { useArrowDispatch, useArrowState} from '../Main/Model/ArrowModel';
import { usePlanState } from '../Main/Model/PlanModel';
import { DateToSmallYearDateString } from '../Function/DateToString';
import { useEffect } from 'react';
import { DateListType, PlanType } from '../Main/Type';

const Result = () => {
	// 일정 선택, 결과 표시
	const name = "희은";
	const title = "웹 디자인 레이아웃 회의";

	const arrowShow = useArrowState();
	const setArrowShow = useArrowDispatch();
	const plan = usePlanState();

	const [date, setDate] = useState<Date | undefined>(undefined);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [showFAQ, setShowFAQ] = useState<boolean>(false);

	useEffect(() => {
		if(!plan || !plan.planList)
			return;
		setStartDate(plan.planList);
	}, [plan]);

	const setStartDate = (plan: DateListType) => {
		const startDateStr = Object.keys(plan)[0];
		if(!startDateStr)
			return;
		setDate(new Date("20"+startDateStr));
	}

	// todo : result calendar에 반영

	const handleDateClick = (datePara : OnChangeProps) => {
		if(!plan || !plan.planList){
			return;
		}
		const dateString = DateToSmallYearDateString(datePara as Date);
		if(!plan.planList[dateString]){
			alert("해당 날짜는 설정되지 않았습니다.");
			return;
		}else{
			setDate(datePara as Date);
			setShowPicker(true);
		}
	}

	const showResult = () => {
		setArrowShow(true);
	}

	const openTimePicker = () => { setShowPicker(true) };
	const closeTimePicker = () => { setShowPicker(false) };

	const openFAQModal = () => { setShowFAQ(true) };
	const closeFAQModal = () => { setShowFAQ(false) };

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
					{
						date &&
						<>
							<Calendar
								date = {date}
								onChange = {handleDateClick}
							/>
							<TimePicker open={showPicker} onOpen={openTimePicker} onClose={closeTimePicker} date = {date} />
						</>
					}
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
					<ResultTab />
				</div>
			</div>
			{/* FAQ */}
			<button id="faq" onClick={openFAQModal}>?</button>
			<FAQmodal open={showFAQ} onClose={closeFAQModal} />
		</div>
	)
};

export default Result;