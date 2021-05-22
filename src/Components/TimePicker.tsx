import React, { useEffect, useState } from 'react';
import { SwipeableDrawer, Button } from '@material-ui/core';
import { timeNodeType } from '../Main/Type';
import "../scss/component/_timepicker.scss";


type Props = {
	open : boolean,
	onOpen : () => void,
	onClose : () => void
}

const TimePicker = ({open, onOpen, onClose} : Props) => {
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
			<p className="picker-title">12/14 월요일</p>
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