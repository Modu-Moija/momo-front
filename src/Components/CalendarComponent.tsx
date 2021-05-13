import React, { Dispatch, useState } from 'react';
import { DateRange, OnChangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangeType } from '../Main/Type';

type Props = {
	dateRange: DateRangeType, // useState state
	handleDateRange: (range: OnChangeProps) => void // handling function using useState dispatch
};

const CalendarComponent = ({ dateRange, handleDateRange }: Props) => {
	return (
		<DateRange
			ranges={[dateRange]}
			onChange={handleDateRange}
			rangeColors={['#7E84F3']}
		/>
	);
};

export default CalendarComponent;