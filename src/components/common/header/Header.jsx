import React from "react";
import headerIcon from "../../../constants/header/header.image";
import { useNavigate } from "react-router-dom";

export const Header = () => {
	const navigate = useNavigate();
	const onClick = (page) => {
		navigate(page);
	};
	return (
		<div>
			<div className="flex justify-between h-16 bg-white border-b border-D9D9D9">
				<div className="" style={{ width: 24, height: 24 }}></div>
				<div className="flex justify-items-center items-center text-center font-bold text-lg">
					헤더입니다
				</div>
				<div className="flex justify-center items-center">
					<img
						onClick={() => onClick("/alarm-history")}
						src={headerIcon.bellIcon}
						alt="종 모양 아이콘"
						className="w-6 h-6 mr-3"
					/>
				</div>
			</div>
		</div>
	);
};
