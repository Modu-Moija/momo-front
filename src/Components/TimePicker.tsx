import React from 'react';
import { SwipeableDrawer, Button, Table, TableHead, TableRow, TableBody } from '@material-ui/core';

import { DateToMonthDayString } from '../Function/DateToString';
import { DragAdapter } from '../Drag';
import "../scss/component/_timepicker.scss";


type Props = {
	open: boolean,
	onOpen: () => void,
	onClose: () => void,
	date: Date
}

const TimePicker = ({ open, onOpen, onClose, date }: Props) => {
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
			<DragAdapter date={date} />
		</SwipeableDrawer>
	);
};

export default TimePicker;