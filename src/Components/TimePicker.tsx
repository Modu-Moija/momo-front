import React from 'react';
import { SwipeableDrawer, Button, Table, TableHead, TableRow, TableBody } from '@material-ui/core';

import { DateToMonthDayString } from '../Function/DateToString';
import { DragAdapter } from '../Drag';
import "../scss/component/_timepicker.scss";
type Props = {
	open: boolean,
	onOpen: () => void,
	onClose: () => void,
	date: Date,
	isTabletOrMobile: boolean
}

const TimePicker = ({ open, onOpen, onClose, date, isTabletOrMobile }: Props) => {

	return (
		<>
			{
				isTabletOrMobile ?
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
					:
					<div className="time-picker">
						<p className="picker-title">{DateToMonthDayString(date)}</p>
						<DragAdapter date={date} />
					</div>
			}
		</>
	);
};

export default TimePicker;