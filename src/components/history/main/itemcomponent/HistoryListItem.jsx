import React from "react";
import { ReactComponent as Outgoing } from "../../../../assets/history/outgoing-icon.svg";
import { ReactComponent as Incoming } from "../../../../assets/history/incoming-icon.svg";
import { ReactComponent as Adjust } from "../../../../assets/history/adjust-icon.svg";
import useHistoryHandler from "../../../../hooks/History/historyHandler";
import dayjs from "dayjs";

const HistoryListItem = ({ type, count }) => {
	const { handleNavigation } = useHistoryHandler();

	// 아이콘 매핑 객체
	const iconMap = {
		출고: <Outgoing className="w-full h-full object-cover fill-red-600" />,
		입고: <Incoming className="w-full h-full object-cover fill-blue-600" />,
		조정: <Adjust className="w-full h-full object-cover fill-green-600" />,
	};

	const typeColor = {
		출고: "text-red-600",
		입고: "text-blue-600",
		조정: "text-green-600",
	};
	// 선택된 아이콘
	const icon = iconMap[type];

	return (
		<div
			className="flex flex-col w-full mb-1 shadow-md rounded-lg py-4 px-3 bg-white text-center"
			onClick={() => handleNavigation(type)}
		>
			<div className="flex w-full items-center justify-around text-center">
				<div>
					<div className="w-9 h-9">{icon}</div>
				</div>
				<div className="">
					<div className={`font-bold text-xl ${typeColor[type]}`}>
						{type}
					</div>
					<span className="text-gray-500 text-md font-semibold">
						{count}
					</span>
				</div>
			</div>
		</div>
	);
};

export default HistoryListItem;
