import React, { useState } from 'react';
import "../scss/pages/result.scss";
import { Button } from '@material-ui/core';
import { OnChangeProps, Calendar } from 'react-date-range';

import { PageTitle, ResultTab, FAQmodal, TimePicker, Information } from '../Components';
import { useArrowDispatch, useArrowState } from '../Main/Model/ArrowModel';
import { usePlanState, useFetchPlan } from '../Main/Model/PlanModel';
import { DateToYearDateString } from '../Function/DateToString';
import { useEffect } from 'react';
import { DateListType, DateResultType, PlanType } from '../Main/Type';
import { withRouter, RouteComponentProps } from "react-router";
import { Login } from '.';

import { useMediaQuery } from 'react-responsive'; // 미디어 쿼리
import axios from 'axios';
import { API_HOST } from '../Common';

interface PathParamsProps {
	meetId : string;
}

const Result = ({ match } : RouteComponentProps<PathParamsProps>) => {
	// 일정 선택, 결과 표시
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	const fetchPlan = useFetchPlan();
	const arrowShow = useArrowState();
	const setArrowShow = useArrowDispatch();
	const plan = usePlanState();

	const [isCookieExist, setCookieExist] = useState<boolean>(false);
	const [date, setDate] = useState<Date | undefined>(undefined); // 시작 날짜
	const [month, setMonth] = useState<number | undefined>(undefined);
	const [showPicker, setShowPicker] = useState<boolean>(false);
	const [showFAQ, setShowFAQ] = useState<boolean>(false);
  
	useEffect(() => {
		if(!match.params.meetId || !isCookieExist)
			return;
		// 로그인 후 바로 plan 정보 받아오기
		fetchPlan(match.params.meetId);
	}, [isCookieExist]);
  
	// 소정 code -> data 받아오기
	const [data, setData] = useState<any>();
  
	useEffect(() => {
		if(!match.url)
			return;
		getData(match.params.meetId);
	}, [match.url]);
	// const URL = "https://momoapi.azurewebsites.net"

	const getData = async (meetid : String) => {
		const response = await axios.get(`${API_HOST}/api/meet/${meetid}`);
		setData(response.data);
		// await axios.get(`${API_HOST}/api/meet/${meetid}`)
		// 	.then((response) => {
		// 		setData(response.data);
		// 		// console.dir(response);
		// 	})
		// 	.catch((err) => {
		// 		const status = err?.response?.status;
		// 		console.log(err);
		// 		if (status === undefined) {
		// 			console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
		// 		}
		// 		else if (status === 400) {
		// 			console.dir("400에러");
		// 		}
		// 		else if (status === 404) {
		// 			console.dir("404에러");
		// 		}
		// 		else if (status === 500) {
		// 			console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
		// 		}
		// 	});

	};

	// 소정 code -> data 사용하려고 아래로 옮김
	const [username, setUsername] = useState("");

	const name = `${username}`;
	const title = `${data?.data.title}`;

	useEffect(() => {
		if (!plan || !plan.planList)
			return;
		setStartDate(plan.planList);
		if(month){
			coloringResult(month);
		}
	}, [plan]);

	useEffect(() => {
		if(month){
			coloringResult(month);
		}
	}, [month]);

	const setStartDate = (plan: DateListType) => {
		// 캘린더 시작 날짜 세팅
		const startDateStr = Object.keys(plan)[0];
		if (!startDateStr)
			return;
		setDate(new Date(startDateStr));
		const month = Number(startDateStr.split('-')[1]);
		if (isNaN(month))
			return;
		setMonth(month);
	}

	const handleDateClick = (datePara: OnChangeProps) => { // 날짜 선택
		if (!plan || !plan.planList) {
			return;
		}
		const dateString = DateToYearDateString(datePara as Date);
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
		const monthResultList = plan?.colorDate?.[month];
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
			{
				plan ?
					<>
						<div id="result-calendar-con">
							<div>
								<PageTitle 
									title={title}
									upperTitle={name}
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
										<TimePicker
											open={showPicker}
											onOpen={openTimePicker}
											onClose={closeTimePicker}
											date={date}
											isTabletOrMobile={isTabletOrMobile}
										/>
									</>
								}
							</div>
							{
								isTabletOrMobile &&
								<>
									{/* 위로 올림 */}
									<Information data={data}/>
									<div className="btn-con">
										<Button variant="contained" color="primary" onClick={showResult}>
											우리의 약속시간은?
										</Button>
									</div>
								</>
							}
						</div>
						<div id="result-page" className={!isTabletOrMobile || arrowShow ? "visible" : "unvisible"}>
							{
								!isTabletOrMobile && <Information data={data}/>
							}
							<div>
								<PageTitle
									title="최종 약속 시간"
								/>
								<>
									<ResultTab />
								</>
							</div>
						</div>
						{/* FAQ */}
						<button id="faq" onClick={openFAQModal}>?</button>
						<FAQmodal open={showFAQ} onClose={closeFAQModal} />
					</>
					:
					<Login
						meetId={match.params.meetId}
						setCookieExist={setCookieExist}
						setUsername={setUsername}
					/>
			}
		</div>
	)
};

export default withRouter(Result);