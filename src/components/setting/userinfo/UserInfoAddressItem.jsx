import React from "react";

const UserInfoAddressItem = ({ type, address, address2, postNumber }) => {
	return (
		<div className="w-full flex items-center justify-between p-3 border-b border-gray-300">
			<div className="flex justify-start w-3/5 font-bold text-lg">
				{type}
			</div>
			<div className="flex flex-col items-center p-3 w-full">
				<div className="justify-self-center">{address}</div>
				<div className="justify-self-center">{address2}</div>
				<div className="justify-self-center">{postNumber}</div>
			</div>
		</div>
	);
};

export default UserInfoAddressItem;
