import React from 'react';
import { Calendar, OnChangeProps } from 'react-date-range';
import "../scss/component/_calendar.scss";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

type Props = {
	date: Date
	handleDateClick: (range: OnChangeProps) => void
};

export const CalendarComponent = ({ date, handleDateClick }: Props) => {
	return (
		<Calendar
			date={date}
			onChange={handleDateClick}
		/>
	);
};
