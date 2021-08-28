import React from 'react';
import { Subscribe } from '.';
import { EventType } from '../Main/Type';

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
	
	const convertTime = (time : string) => {
		// 8:0 의 형태 => 08:00 로 변환
		const arr = time.split(':');
		if(arr.length < 2) return null;
		return `${arr[0].length === 0? `0${arr[0]}`: arr[0]}:${arr[1].length === 1? `0${arr[1]}`: arr[1]}`;
	}

	return (
		<div className="timepicker-con"
			onMouseDown={clickHandler}
			onMouseOver={moveHandler}
			onMouseUp={doneHandler}
		>
			{
				timeArray.map((time : string, index : number) => (
					<button key={`${time}${boolArray[index]}`} id={index.toString()} className={boolArray[index]?"clicked":""}>{convertTime(time)}</button>
				))
			}
		</div>
	);
};

export default Table;