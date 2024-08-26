import React from "react";
import settingIcon from "../../../constants/setting/setting.image";
import { useNavigate } from "react-router-dom";

const UserInfoPasswordItem = ({ type }) => {
	const navigate = useNavigate();
	const onClick = () => {
		navigate("/setting/password");
	};
	return (
		<div
			className="w-full flex items-center justify-between p-3 border-b border-gray-300"
			onClick={() => onClick()}
		>
			<div className="w-3/5 font-bold text-lg">{type}</div>
			<img src={settingIcon.rightArrowIcon} alt="오른쪽 화살표" />
		</div>
	);
};

export default UserInfoPasswordItem;
