import React from 'react';
import { Calendar, OnChangeProps } from 'react-date-range';
import "../scss/component/_calendar.scss";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

type Props = {
	date: Date // useState state
	handleDateClick: (range: OnChangeProps) => void // handling function using useState dispatch
};

const CalendarComponent = ({ date, handleDateClick }: Props) => {
	return (
		<Calendar
			date={date}
			onChange={handleDateClick}
		/>
	);
};

export default CalendarComponent;