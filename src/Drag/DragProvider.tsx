import React, { Dispatch, useEffect, useState } from 'react';
import { Table, Subscribe, Position, IsClicked, Coloring } from '.';

type Props = {
	timeArray : string[];
	boolArray : boolean[];
	setBoolArray : Dispatch<boolean[]>;
}

const Provider = ({timeArray, boolArray, setBoolArray} : Props) => {
	const [subscribers, setScriber] = useState<Subscribe | undefined>(undefined);
	const [isClicked, setIsClicked] = useState<IsClicked | undefined>(undefined);
	const [position, setPosition] = useState<Position | undefined>(undefined);
	const [coloring, setColoring] = useState<Coloring | undefined>(undefined);


	useEffect(() => { // 1
		setScriber(new Subscribe(boolArray, setBoolArray));
	}, []);

	useEffect(() => { // 2
		if(!subscribers)
			return;
		setIsClicked(new IsClicked(subscribers));
	}, [subscribers]);

	useEffect(() => { // 3
		if(!subscribers || !isClicked)
			return;
		setPosition(new Position(subscribers, isClicked));
	}, [isClicked]);

	useEffect(()=>{ // 4
		if(!subscribers || !isClicked || !position)
			return;
		setColoring(new Coloring(subscribers, position, isClicked));
	}, [position]);

	useEffect(() => {
		if(!subscribers)
			return;
		subscribers.setBoolArr(boolArray);
		setBoolArray(boolArray);
	}, [boolArray]);

	return (
		<>
			{
				subscribers && 
				<Table
					subscribers = {subscribers}
					boolArray = {boolArray}
					timeArray = {timeArray}
				/>
			}
		</>
	)
};

export default Provider;