import React, { useState } from 'react';
import "../scss/component/_header.scss";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useArrowState, useArrowDispatch} from '../Main/Model/ArrowModel';

const Header = () => {
	const arrowShow = useArrowState();
	const setArrowShow = useArrowDispatch();
	const handleArrowClick = () => {
		setArrowShow(false);
	}
	return (
		<header>
			{
				arrowShow &&
				<div className="left-arrow">
					<ArrowBackIosIcon onClick={handleArrowClick}/>
				</div>
			}
			<div className="header-con">
				{/* <div className="title">MOMO</div> */}
				<div className="title">
					<img src="/img/logo.png" alt="logo"/>
				</div>
				<div className="share-con">
					<button className="kakao-share">카카오톡 공유하기</button>
					<button className="link-copy">링크 복사하기</button>
				</div>
			</div>
		</header>
	);
};

export default Header;