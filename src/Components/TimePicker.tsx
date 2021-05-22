import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, Button } from '@material-ui/core';
import { timeNodeType } from '../Main/Type';
import { DateToMonthDayString } from '../Function/DateToString';
import "../scss/component/_timepicker.scss";


type Props = {
	open : boolean,
	onOpen : () => void,
	onClose : () => void,
	date : Date
}

const TimePicker = ({open, onOpen, onClose, date} : Props) => {
	const start = "11:00";
	const end = "10:00";
	const gap = 30;
	// todo : api 완성된 후 list 별로 데려와서 표시하기

	// slide로 바꾸기
	return (
		<SwipeableDrawer
			open={open}
			onOpen={onOpen}
			onClose={onClose}
			anchor="right"
			className="time-picker"
		>
			<p className="picker-title">{DateToMonthDayString(date)}</p>
			<div className="scroll-picker">
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
				<Button variant="outlined" color="primary">11:00</Button>
				<Button variant="contained" color="primary">12:00</Button>
			</div>
		</SwipeableDrawer>
	);
};

export default TimePicker;