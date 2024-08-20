import React from "react";
import settingIcon from "../../../constants/setting/setting.image";
import UserInfoList from "./UserInfoList";
import { useLocation } from "react-router-dom";

const UserInfoSetting = () => {
	const location = useLocation();
	const { userData } = location.state || {};
	console.log(userData);
	return (
		<div className="flex flex-col items-center gap-9 p-8 w-full">
			<div className="flex flex-col">
				<img
					src={settingIcon.userInfoImage}
					className=" w-[150px] h-[150px]  rounded-full"
					alt="프로필 이미지"
				/>
				<img
					className="w-[24px] text-black self-end"
					src={settingIcon.cameraBlackIcon}
					alt="camera-icon"
				/>
			</div>
			<div className="border border-gray-300 rounded-md w-full mt-10 text-md">
				<UserInfoList data={userData} />
			</div>
		</div>
	);
};

export default UserInfoSetting;
