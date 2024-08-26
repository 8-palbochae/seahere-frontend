import React from "react";

const UserInfoItem = ({ type, value }) => {
	return (
		<div className="w-full flex items-center justify-between p-3 border-b border-gray-300">
			<div className="w-3/5 font-bold text-lg">{type}</div>
			<div className="w-3/5 flex justify-end text-gray-500">{value}</div>
		</div>
	);
};

export default UserInfoItem;
