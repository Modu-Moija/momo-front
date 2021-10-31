import React, { useEffect, useState } from 'react';
import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
import "../../scss/component/_resulttab.scss";
import { RankCard } from '..';
import { usePlanState } from '../../Main/Model/PlanModel';
import { API_HOST } from '../../Common';
import axios from 'axios';
import { AwardInfoType, AwardType } from '../../Main/Type';

type Props = {
	children : React.ReactNode,
	tab : number,
	index: number
}
const TabPanel = ({ children, tab, index} : Props) => {

	return (
		<div
			className="tab-panel"
			role="tabpanel"
			hidden={tab !== index}
			id={`tabpanel-${index}`}
		>
			{tab === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

export const ResultTab = () => {
	const plan = usePlanState();

	if(!plan) return null;
	const [tabNumber, setTabNumber] = useState<number>(0);
	const [result, setResult] = useState<AwardInfoType | undefined>(undefined);

	useEffect(() => {
		fetchResult();
	},[]);

	const handleTabClick = (event: any, changeTab: number) => {
		setTabNumber(changeTab);
	};
	
	const fetchResult = async () => {
		const API_PATH = `/api/time/${plan.meetId}/mostleast`;
		const {data} = await axios.get(`${API_HOST}${API_PATH}`, {
			withCredentials: true
		});

		console.log(data);
		setResult(data);
	}
	console.log(result);

	return (
		<>
			<Tabs
				value={tabNumber}
				onChange={handleTabClick}
			>
				<Tab label="최대 가능순" />
				<Tab label="최소 가능순" />
			</Tabs>
			<TabPanel
				tab = {tabNumber}
				index = {0}
			>
				{
					result?.mostTime?.map((timeInfo : AwardType, index: number) => (
						<RankCard
							key={timeInfo.key}
							date={timeInfo.date}
							time={timeInfo.time}
							users={timeInfo.users}
							index={index}
						/>
					))
				}
			</TabPanel>
			<TabPanel
				tab = {tabNumber}
				index = {1}
			>
				{
					result?.leastTime?.map((timeInfo : AwardType, index: number) => (
						<RankCard
							key={timeInfo.key}
							date={timeInfo.date}
							time={timeInfo.time}
							users={timeInfo.users}
							index={index}
						/>
					))
				}
			</TabPanel>
		</>
	);
};