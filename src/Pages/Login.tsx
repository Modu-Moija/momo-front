import React, { useState } from 'react';
import "../scss/pages/login.scss";
import { Button, Checkbox } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Login = () => {
	// 로그인 화면
	const [loginSave, setLoginSave] = useState<boolean>(false);
	const handleCheckLoginSave = (event : React.ChangeEvent<HTMLInputElement>) => {
		setLoginSave(event.target.checked);
	}
	return (
		<div id="login-wrap">
			<div className="logo-img">
				<img src="/img/logo.png" alt="로고 이미지"/>
			</div>
			<div className="info">
				<p>닉네임은 해당 일정에서만 사용됩니다!</p>
				<p>잃어버리면 다시 찾을 수 없으니 잘 기억해주세요.</p>
			</div>
			<div className="field-con">
				<div>
					<input className="text-field" type="text" placeholder="닉네임을 입력해주세요."></input>
				</div>
				<div className="auto-login">
					<Checkbox
						checked={loginSave}
						onChange={handleCheckLoginSave}
						color="primary"
					/>
					<p>자동 로그인</p>
				</div>
			</div>
			<div className="btn-con">
				<Link to="/result"><Button variant="contained" color="primary">로그인</Button></Link>
			</div>
		</div>
	)
};

export default Login;