import React, { useEffect } from 'react';
import { Subscribe, Debounce } from '.';
import { EventType } from '../Main/Type';
import { Button } from '@material-ui/core';

type Props = {
	subscribers : Subscribe;
	boolArray : boolean[];
	timeArray : string[];
}

const Table = ({ boolArray, subscribers, timeArray } : Props) => {
	const clickHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseDown', event);
	}

	const moveHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseMove', event);
	}
	
	const doneHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseUp', event);
	}

	return (
		<div className="timepicker-con"
			onMouseDown={clickHandler}
			onMouseOver={moveHandler}
			onMouseUp={doneHandler}
		>
			{
				timeArray.map((time : string, index : number) => (
					<button key={`${time}${boolArray[index]}`} id={index.toString()} className={boolArray[index]?"clicked":""}>{time}</button>
				))
			}
		</div>
	);
};

export default Table;