import React, { useState } from 'react';
import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
import "../scss/component/_resulttab.scss";

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

const ResultTab = () => {
	const [tabNumber, setTabNumber] = useState<number>(0);

	const handleTabClick = (event: any, changeTab: any) => {
		setTabNumber(changeTab);
	};

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
				hi
			</TabPanel>
			<TabPanel
				tab = {tabNumber}
				index = {1}
			>
				hi
			</TabPanel>
		</>
	);
};

export default ResultTab;