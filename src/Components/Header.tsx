import React from 'react';

const Header = () => {
	const a = 1;
	return (
		<header>
			<div className="title">MOMO</div>
			<div className="share-con">
				<button className="kakao-share">카카오톡 공유하기</button>
				<button className="link-copy">링크 복사하기</button>
			</div>
		</header>
	);
};

export default Header;