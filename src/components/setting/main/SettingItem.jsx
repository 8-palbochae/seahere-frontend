import React from "react";
import { ReactComponent as RightArrow } from "../../../assets/setting/right-arrow-icon.svg";
import { useNavigate } from "react-router-dom";

const SettingItem = ({ type, svg, onClick }) => {
	return (
		<div className="w-full flex items-center justify-between p-3 border-b border-gray-300">
			<div className="w-3/5 font-bold text-lg">
				<div className="flex gap-2">
					<img src={svg} alt="아이콘" />
					{type}
				</div>
			</div>
			<div className="w-3/5 flex justify-end text-gray-500">
				<RightArrow onClick={onClick} />
			</div>
		</div>
	);
};

export default SettingItem;
