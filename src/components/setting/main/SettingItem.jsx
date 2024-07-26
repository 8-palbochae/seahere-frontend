import React from "react";
import { ReactComponent as RightArrow } from "../../../assets/setting/right-arrow-icon.svg";
import { useNavigate } from "react-router-dom";

const SettingItem = ({ type, svg, onClick }) => {
	return (
		<div className="flex p-8 justify-between w-full h-3/4 border-2 items-center rounded-lg border-bottom-style:solid] border-blue-300 active:bg-blue-300">
			<div className="flex gap-2">
				<img src={svg} alt="아이콘" />
				{type}
			</div>

			<div>
				<RightArrow onClick={onClick} />
			</div>
		</div>
	);
};

export default SettingItem;
