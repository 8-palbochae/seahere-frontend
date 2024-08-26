import React from "react";
import headerIcon from "../../../constants/header/header.image";

function formatDate(isoString) {
	const date = new Date(isoString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const AlarmInfo = React.forwardRef((props, ref) => {
	return (
		<div className="flex gap-3 justify-center bg-gray-300 rounded-[20px] w-full p-2">
			
			<div className="flex flex-col items-center" ref={ref}>
				<div>{props.alarm.title}</div>
				<div>{props.alarm.body}</div>
				<div>{formatDate(props.alarm.createTime)}</div>
			</div>
		</div>
	);
});

export default AlarmInfo;
