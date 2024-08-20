import React, { useState } from "react";
import { Input } from "antd";
import MainImage from "../../../../constants/main/main.image";
const PasswordChange = () => {
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	console.log(password);
	console.log(passwordCheck);
	const onPasswordChange = (password) => {
		setPassword(password);
	};
	const onPasswordCheckChange = (passwordCheck) => {
		setPasswordCheck(passwordCheck);
	};

	const onClick = () => {
		if (password !== passwordCheck) {
			alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
			return;
		}
	};

	return (
		<div className=" flex flex-col justify-between items-center w-full gap-5 p-5">
			<img className=" h-1/3" src={MainImage.mainLogo} alt="Main Logo" />

			<Input.Password
				className="p-3 rounded-[20px]"
				placeholder="비밀번호"
				value={password}
				onChange={(e) => onPasswordChange(e.target.value)}
			/>
			<Input.Password
				className="p-3 rounded-[20px]"
				placeholder="비밀번호 확인"
				value={passwordCheck}
				onChange={(e) => onPasswordCheckChange(e.target.value)}
			/>
			<button
				className="p-3 bg-blue-600 w-full rounded-[20px] text-white"
				onClick={onClick}
			>
				{"변경하기"}
			</button>
		</div>
	);
};

export default PasswordChange;
