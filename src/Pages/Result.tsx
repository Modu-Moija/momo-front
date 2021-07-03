import React, { useState } from 'react';
import "../scss/pages/result.scss";
import { Button } from '@material-ui/core';
import { OnChangeProps, Calendar, DateRange, Range } from 'react-date-range';

import { PageTitle, ResultTab, FAQmodal, TimePicker, Information } from '../Components';
import { useArrowDispatch, useArrowState } from '../Main/Model/ArrowModel';
import { usePlanState } from '../Main/Model/PlanModel';
import { DateToSmallYearDateString } from '../Function/DateToString';
import { useEffect } from 'react';
import { DateListType, DateResultType, PlanType } from '../Main/Type';

import { useMediaQuery } from 'react-responsive'; // 미디어 쿼리

const Result = () => {
	// 일정 선택, 결과 표시
	const name = "희은";
	const title = "웹 디자인 레이아웃 회의";

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	const arrowShow = useArrowState();
	const setArrowShow = useArrowDispatch();
	const plan = usePlanState();

	const [date, setDate] = useState<Date | undefined>(undefined); // 시작 날짜
	const [month, setMonth] = useState<number | undefined>(undefined);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [showFAQ, setShowFAQ] = useState<boolean>(false);

	useEffect(() => {
		if (!plan || !plan.planList)
			return;
		setStartDate(plan.planList);
	}, [plan]);

	useEffect(() => {
		if (!month)
			return;
		coloringResult(month);
	}, [month]);

	const setStartDate = (plan: DateListType) => {
		// 캘린더 시작 날짜 세팅
		const startDateStr = Object.keys(plan)[0];
		if (!startDateStr)
			return;
		setDate(new Date("20" + startDateStr));
		const month = Number(startDateStr.split('/')[1]);
		if (isNaN(month))
			return;
		setMonth(month);
	}

	const handleDateClick = (datePara: OnChangeProps) => { // 날짜 선택
		if (!plan || !plan.planList) {
			return;
		}
		const dateString = DateToSmallYearDateString(datePara as Date);
		if (plan.planList[dateString]){
			setDate(datePara as Date);
			setShowPicker(true);
		}
	}

	const handleMonthChange = (visibleMonth: Date) => {
		const month = visibleMonth.getMonth() + 1;
		setMonth(month);
	}

	const coloringResult = async (month: number) => { // 캘린더에 결과 표시
		const monthResultList = plan?.resultList?.[month];
		await initializeDOM();
		if (!monthResultList){
			return;
		}
		Object.keys(monthResultList).map((date: string) => {
			const dateNum = Number(date);
			coloringDOM(dateNum, monthResultList[dateNum]);
		})
	}

	const initializeDOM = () => {
		// 초기화
		const ColoringDates = document.getElementsByClassName('coloring');
		if(!ColoringDates)
			return;
		console.log(ColoringDates);
		for (let i = 0; i < ColoringDates.length;) { // 주의 : ColoringDates도 함께 바뀌기 때문에 i 증가 x
			ColoringDates[i].className = 'rdrDayNumber';
		}
	}

	const coloringDOM = (date: number, num: number) => {
		const dateElement = findDateDOM(date);
		if (!dateElement)
			return;
		const wholeNum = 5; // TODO : 전역 변수로 만들어 저장하기
		const ratio = Math.ceil((num / wholeNum)*10);

		switch (ratio) {
		case 1:
		case 2:
			dateElement.className = 'rdrDayNumber coloring xs';
			break;
		case 3:
		case 4:
			dateElement.className = 'rdrDayNumber coloring s';
			break;
		case 5:
		case 6:
			dateElement.className = 'rdrDayNumber coloring m';
			break;
		case 7:
		case 8:
			dateElement.className = 'rdrDayNumber coloring l';
			break;
		case 9:
		case 10:
			dateElement.className = 'rdrDayNumber coloring xl';
			break;
		default:
			dateElement.className = 'rdrDayNumber coloring origin'
		}
	}

	const findDateDOM = (date: number) => { // 해당 날짜의 dom 가져오기
		const Dates = document.getElementsByClassName('rdrDayNumber');
		if(!Dates)
			return;
		for (let i = 0; i < Dates.length; i++) {
			if(!Dates[i]?.children[0])
				continue;
			const dateDOM = Dates[i].children[0];
			const buttonDOM = Dates[i].parentElement;
			if(!buttonDOM)
				continue;

			if (dateDOM.innerHTML == date.toString()){
				if(buttonDOM.classList.contains('rdrDayPassive')) // 지난 달 날짜 x
					continue;
				return Dates[i];
			}
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
								date={date}
								onChange={handleDateClick}
								onShownDateChange={handleMonthChange}
							/>
							<TimePicker open={showPicker} onOpen={openTimePicker} onClose={closeTimePicker} date={date} isTabletOrMobile={isTabletOrMobile} />
						</>
					}
				</div>
				{
					isTabletOrMobile &&
					<>
						<div className="btn-con">
							<Button variant="contained" color="primary" onClick={showResult}>
								우리의 약속시간은?
							</Button>
						</div>
						<Information />
					</>
				}
			</div>
			<div id="result-page" className={!isTabletOrMobile || arrowShow ? "visible" : "unvisible"}>
				{
					!isTabletOrMobile && <Information />
				}
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