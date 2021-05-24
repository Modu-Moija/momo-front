import React from 'react';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { PageTitle, CalendarComponent } from '../Components';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "../scss/pages/setting.scss";

const Setting = () => {
	const name = "";
	const headerTitle = "언제가 좋을까요?🤔";

	const [title, setTitle] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [gap, setGap] = useState("");
	const [range, setRange] = useState([
		{
			startDate: new Date(), // default를 빈 값으로 하고 싶은데,,,,
			endDate: new Date(), 
			key : 'selection',
			// key: `selection${id}`, // 변수
		}
	]);
  
	const handleRange = (item : any) => {
		setRange([item.selection]);
		console.log(item);
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
		// console.log(e.target.value);
		// console.log(parseInt(e.target.value));
		console.log(`${start} and ${e.target.value}`);
		if (parseInt(start)>=parseInt(e.target.value)) {
			alert("시간을 다시 설정해주세요.");
			setEnd("");
		}
	}

	const handleGapChange = (e : any) => {
		setGap(e.target.value)
		// console.log(e.target.value);
	}


	const handleDisabled = (date:Date) => {
		const now = new Date()
		if (date > new Date(now.setDate(now.getDate() - 1))) // 오늘 날짜가 더 이전이면 활성화
			return false; // 활성화
		return true; // 아니면 비활성화
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
								<option value={15}>15분</option>
								<option value={30}>30분</option>
								<option value={60}>1시간</option>
							</select>
							<div>&nbsp;&nbsp;단위</div>
						</div>

						<div className="create-option">
							<div className="form-check form-switch create-center">
								<input className="form-check-input" type="checkbox" id="center" />
								<label className="form-check-label" htmlFor="center">중간지점도 볼래요!</label>
							</div>
							<div className="form-check form-switch create-online">
								<input className="form-check-input" type="checkbox" id="online" />
								<label className="form-check-label" htmlFor="online">화상회의로 진행할래요!</label>
							</div>
						</div>
					</div>
					<div className="create-create-btn">
						<button>일정 생성하기</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Setting;