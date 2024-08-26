import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../../../../stores/authentication";
import { axiosInstance } from "../../../../api/common/axiosInstance";
import { url } from '../../../../constants/defaultUrl';
const PasswordChange = () => {
	const { setAccessToken, setRefreshToken } = useAuthenticationStore();
	const [loading, setLoading] = useState(true); 
	const [error, setError] = useState(null); 
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const onPasswordChange = (password) => {
		setPassword(password);
	};
	const onPasswordCheckChange = (passwordCheck) => {
		setPasswordCheck(passwordCheck);
	};

	const handleSubmit = async () => {
		try {
			const response = await axiosInstance.patch(`${url}/users`, {
				password: password,
			});


			if (response.status === 200) {
				setAccessToken(null);
				setRefreshToken(null);
				navigate("/login");
			} else {
				throw new Error("Unexpected response status");
			}
		} catch (error) {
			setError(error.message || "Error updating user data");
		} finally {
			setLoading(false);
		}
	};
	const isButtonDisabled =
		password.trim() === "" || password !== passwordCheck;

	return (
		<div className="flex flex-col mt-3 p-2 h-full">
			<div className="font-bold text-xl">비밀번호를 입력해주세요</div>
			<div className="mt-3">
				<input
					className="w-full h-12 p-2 bg-gray-100 rounded-md"
					type="password"
					placeholder="신규 비밀번호"
					value={password}
					onChange={(e) => onPasswordChange(e.target.value)}
				/>
			</div>
			<div className="mt-3">
				<input
					className="w-full h-12 p-2 bg-gray-100 rounded-md"
					type="password"
					placeholder="비밀번호 확인"
					value={passwordCheck}
					onChange={(e) => onPasswordCheckChange(e.target.value)}
				/>
			</div>
			<div className="fixed bottom-20 left-4 w-full">
				<button
					className={`w-11/12 font-bold h-12 rounded-md ${
						isButtonDisabled
							? "bg-gray-300 text-white cursor-not-allowed"
							: "bg-blue-600 text-white"
					}`}
					disabled={isButtonDisabled}
					onClick={() => handleSubmit()}
				>
					비밀번호 변경
				</button>
			</div>
		</div>
	);
};

export default PasswordChange;
