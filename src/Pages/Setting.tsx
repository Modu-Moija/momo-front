import React from 'react';
import { Grid, Input, NativeSelect, FormControl } from "@material-ui/core";
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Setting = () => {
	const [title, setTitle] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [gap, setGap] = useState("");
	const [state, setState] = useState({
		selection1: {
			startDate: addDays(new Date(), 0),
			endDate: addDays(new Date(), 0), // null이 왜 안되지
			key: 'selection1',
		},
		selection2: {
			startDate: addDays(new Date(), 0), // null이 왜 안되지
			endDate: addDays(new Date(), 0), // null이 왜 안되지
			key: 'selection2',
		},
		selection3: {
			startDate: addDays(new Date(), 0), // null이 왜 안되지
			endDate: addDays(new Date(), 0), // null이 왜 안되지
			key: 'selection3',
			autoFocus: false
		}
	});
  
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
		}
	}

	const handleGapChange = (e : any) => {
		setGap(e.target.value)
		// console.log(e.target.value);
	}

	return (
	// create-container
	//     -> create-title
	//     -> create-setting
	//          -> crete-calender
	//          -> crete-content
	//               -> crete-plan-name
	//               -> crete-time
	//                    -> create-time-start
	//                    -> create-time-finish
	//               -> create-gap

		<Grid className="crete-container">
			<Grid className="create-title">
				<h2>언제가 좋을까요?🤔</h2>
			</Grid>
			<Grid className="create-setting">
				<Grid className="create-calender">
					<DateRange
						onChange={item => setState({ ...state, ...item })}
						ranges={[state.selection1, state.selection2, state.selection3]}
					/>;
				</Grid>
				<Grid className="create-content">
					{/* 일정이름 */}
					<Grid className="create-plan-name">
						<Input 
							placeholder = "일정 이름을 작성해주세요."
							value={title}
							name="title"
							onChange = {handleTitleChange}
						/>
					</Grid>

					{/* 시간 선택 */}
					<Grid className="create-time">
						<FormControl className="create-time-start">
							<NativeSelect
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
							</NativeSelect>
						</FormControl>
						<Grid>~</Grid>
						<FormControl className="create-time-finish">
							<NativeSelect
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
							</NativeSelect>
						</FormControl>
					</Grid>

					{/* 간격 선택 */}
					<Grid className="create-gap">
						<FormControl>
							<NativeSelect
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
							</NativeSelect>
						</FormControl>
						<Grid>&nbsp;&nbsp;단위</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Setting;