import React from 'react';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { PageTitle } from '../Components';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "../scss/pages/setting.scss";
import axios from 'axios';
import { API_HOST } from '../Common';

const Setting = () => {
	const name = "";
	const headerTitle = "언제가 좋을까요?🤔";

	const [title, setTitle] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [gap, setGap] = useState(0); // number
	const [range, setRange] = useState([
		{
			startDate: new Date(), // default를 빈 값으로 하고 싶은데,,,,
			endDate: new Date(), 
			key : 'selection',
		}
	]);
	const [dates, setDates] = useState([""])
	const [center, setCenter] = useState(false);
	const [online, setOnline] = useState(false);
  
	const handleRange = (item : any) => {
		setRange([item.selection]);
		// console.log(item);
    
		// getMonth
		let startGetMonth  = item["selection"].startDate.getMonth()+1;
		startGetMonth  = startGetMonth < 10 ? `0${startGetMonth}` : startGetMonth; 
		let endGetMonth = item["selection"].endDate.getMonth()+1;
		endGetMonth  = endGetMonth < 10 ? `0${endGetMonth}` : endGetMonth; 

		// getDate 
		let startGetDate = item["selection"].startDate.getDate();
		startGetDate  = startGetDate < 10 ? `0${startGetDate}` : startGetDate; 
		let endGetDate  = item["selection"].endDate.getDate();
		endGetDate  = endGetDate < 10 ? `0${endGetDate}` : endGetDate; 
    
		// getYear 
		const startGetYear = item["selection"].startDate.getFullYear();
		const endGetYear = item["selection"].endDate.getFullYear();
    
		// string
		const startDate  = `${startGetYear}-${startGetMonth}-${startGetDate}`
		const endDate = `${endGetYear}-${endGetMonth}-${endGetDate}`
		// console.log(startDate, endDate);
		setDates([startDate, endDate]);
	}


	// 일정이름
	const handleTitleChange = (e : any) => {
		setTitle(e.target.value);
		// console.log(e.target.value);
	};

	//시간 배열
	const Times = [];
	for (let i = 1; i < 12; i++) {
		Times.push(i);
	}
	const amTimeList = Times.map((amTime, i) => (
		<option value={`${amTime}:00`} key={i}>오전{amTime}시</option>
	));
	const pmTimeList = Times.map((pmTime, i) => (
		<option value={`${pmTime + 12}:00`} key={i}>오후{pmTime}시</option>
	));

	const handleStartChange = (e : any) => {
		setStart(e.target.value);
	}
  
	const handleEndChange = (e : any) => {
		setEnd(e.target.value)
		// console.log(`${start} and ${e.target.value}`);
		if (parseInt(start)>=parseInt(e.target.value)) {
			alert("시간을 다시 설정해주세요.");
			setEnd("");
		}
	}

	const handleGapChange = (e : any) => {
		setGap(parseInt(e.target.value))
		// console.log(typeof(parseInt(e.target.value)));
	}


	const handleDisabled = (date:Date) => {
		const now = new Date()
		if (date > new Date(now.setDate(now.getDate() - 1))) // 오늘 날짜가 더 이전이면 활성화
			return false; // 활성화
		return true; // 아니면 비활성화
	}

	const handleOnlineChecked = (e : any) => {
		// console.log(checked);
		setOnline(!online); // 반대로 입력됨
	}

	const handleCenterChecked = (e : any) => {
		// console.log(checked);
		setCenter(!center); // 반대로 입력됨
	}

	const handleSubmit = (e : any) => {
		// const headers = {
		//   "Content-Type": "application/json",
		// };
		// console.log(`title : ${title}, dates : ${dates}, end : ${end}, gap : ${gap}, start : ${start}, center : ${center}, online : ${online}`);
		// const URL = "https://momoapi.azurewebsites.net"

		const data = {
			"center" : center,
			"dates" : dates,
			"end" : end,
			"gap" : gap,
			"start" : start,
			"title" : title,
			"video" : online,
		}

		axios.post(`${API_HOST}/api/meet`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				console.log(response);
				const url = response.data.data;
				// console.log(url);
				window.location.href = `result/${url}`;
			})
			.catch((error) => {
				console.log(error);
				const status = error?.response?.status;
				if (status === undefined) {
					console.dir(
						"데이터 오류" + JSON.stringify(error)
					);
				} else if(status === 400) {
					console.dir("400에러");
				} else if(status === 500) {
					console.dir("내부 서버 오류");
				}
			})
	}

	return (
		<div className="create-container">
			<div className="create-title">
				<PageTitle
					upperTitle={name}
					title={headerTitle}
				/>
			</div>
			<div className="create-setting">
				<div className="create-calender">
					<DateRange
						onChange={handleRange}
						ranges={range}
						rangeColors={["#7E84F3", "#7E84F3", "#7E84F3"]}
						color={"#7E84F3"}
						disabledDay={handleDisabled}
					/>
				</div>
				<div className="create-content">
					<div className="create-content-box">
						{/* 일정이름 */}
						<div className="create-plan-name">
							<input 
								placeholder = "일정 이름을 작성해주세요."
								value={title}
								name="title"
								onChange = {handleTitleChange}
							/>
						</div>

						{/* 시간 선택 */}
						<div className="create-time">
							<select
								className="start"
								id="start"
								name="start"
								value={start}
								onChange={handleStartChange}
							>
								<option aria-label="None" value="">
									시작시간
								</option>
								<option value="00:00">오전0시</option>
								{amTimeList}
								<option value="12:00">오후12시</option>
								{pmTimeList}
							</select>
							<div>&nbsp;&nbsp;~&nbsp;&nbsp;</div>
							<select
								className="end"
								id="end"
								name="end"
								value={end}
								onChange={handleEndChange}
							>              
								<option aria-label="None" value="">
									끝시간
								</option>
								<option value="00:00">오전0시</option>
								{amTimeList}
								<option value="12:00">오후12시</option>
								{pmTimeList}
							</select>
						</div>

						{/* 간격 선택 */}
						<div className="create-gap">
							<select
								className="gap"
								id="gap"
								name="gap"
								value={gap}
								onChange={handleGapChange}
							>
								<option aria-label="None" value="">
									단위
								</option>
								{/* <option value={15}>15분</option> */}
								<option value={30}>30분</option>
								<option value={60}>1시간</option>
							</select>
							<div>&nbsp;&nbsp;단위</div>
						</div>

						<div className="create-option">
							<div className="form-check form-switch create-center">
								<input className="form-check-input" type="checkbox" id="center" onChange={handleCenterChecked}/>
								<label className="form-check-label" htmlFor="center">중간지점도 볼래요!</label>
							</div>
							<div className="form-check form-switch create-online">
								<input className="form-check-input" type="checkbox" id="online" onChange={handleOnlineChecked}/>
								<label className="form-check-label" htmlFor="online">화상회의로 진행할래요!</label>
							</div>
						</div>
					</div>
					<div className="create-create-btn" onClick={handleSubmit}>
						<button>일정 생성하기</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;