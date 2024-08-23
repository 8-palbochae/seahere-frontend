import React from "react";
import headerIcon from "../../../constants/header/header.image";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from '../../../stores/authentication';
import { useHeaderText } from "../../../stores/headerText";

export const Header = () => {
	const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthenticationStore();
	const navigate = useNavigate();
	const {headerText} = useHeaderText();

	const onClick = (page) => {
		navigate(page);
	};

	const logoutHandler = () => {
		setAccessToken(null);
		setRefreshToken(null);
	}

	const showLogoutIcon = accessToken && refreshToken; 

	return (
		<div>
			<div className="flex justify-between h-16 bg-white border-b border-D9D9D9">
				{showLogoutIcon && (
					<div className="flex justify-center items-center">
						<img
							onClick={logoutHandler}
							src={headerIcon.logoutIcon}
							alt="로그아웃 아이콘"
							className="w-6 h-6 ml-3 cursor-pointer"
						/>
					</div>
				)}
				<div className="flex-grow flex justify-center items-center text-center font-bold text-lg">
					{headerText}
				</div>
				<div className="flex justify-center items-center">
					<img
						onClick={() => onClick("/alarm-history")}
						src={headerIcon.bellIcon}
						alt="종 모양 아이콘"
						className="w-6 h-6 mr-3 cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};
