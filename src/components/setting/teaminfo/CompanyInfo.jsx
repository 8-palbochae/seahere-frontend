import React from "react";
import settingIcon from "../../../constants/setting/setting.image";

const CompanyInfo = ({ data }) => {
	console.log(data);
	return (
		<div className="flex flex-col justify-between w-full bg-blue-600 rounded-[20px] p-3 min-h-40 text-white">
			<img
				className="w-[24px]"
				src={settingIcon.cameraIcon}
				alt="camera-icon"
			/>

			<div className="self-end">{data.companyName}</div>
			<hr />
			<div className="self-end">{data.registrationNumber}</div>
		</div>
	);
};

export default CompanyInfo;
