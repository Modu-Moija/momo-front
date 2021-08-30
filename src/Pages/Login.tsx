import React, { useState } from 'react';
import "../scss/pages/login.scss";
import { Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { API_HOST } from '../Common';
import { ChangeEvent } from 'react';
import { Dispatch } from 'react';

interface LoginProps {
	meetId : string;
	setCookieExist : Dispatch<boolean>;
}

const Login = ({meetId, setCookieExist} : LoginProps) => {
	// 로그인 화면
	// TODO : 자동 로그인

	const [name, setName] = useState<string>("");
	const [loginSave, setLoginSave] = useState<boolean>(false);
	const handleCheckLoginSave = (event : React.ChangeEvent<HTMLInputElement>) => {
		setLoginSave(event.target.checked);
	}

	const Login = async () => {
		const API_PATH = '/api/user/login';
		const {data} = await axios.post(`${API_HOST}${API_PATH}`, {
			username: name,
			remember: loginSave,
			meetId: meetId
		}, {
			withCredentials : true
		});

		if(data){
			setCookieExist(true);
		}
	} 

	const handleNameChange = (event : ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
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
					<input className="text-field" onChange={handleNameChange} type="text" placeholder="닉네임을 입력해주세요."></input>
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
				<Button variant="contained" color="primary" onClick={Login}>로그인</Button>
			</div>
		</div>
	)
};

export default Login;