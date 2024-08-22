import React from "react";
import { profileUrl } from "../profileUrl";
import defaultImage from '../../../assets/setting/user-profile-default.png';

const EmployeeInfoItem = ({ item }) => {
	return (
		<div className="flex gap-3 justify-between bg-white border-b-2 w-full rounded-[20px] p-8 w-min-[2/3]">
			<div className="flex gap-2">
				<div className="bg-gray-500 w-[24px] h-[24px] rounded-full">
					<img src={`${item.profileImg !== null ? profileUrl + item.profileImg + '?' + new Date().getTime() : defaultImage}`} />
				</div>
				<div>{item.userName}</div>
			</div>
			<div className="flex-grow flex justify-center">
				<div>{item.email}</div>
			</div>
		</div>
	);
};

export default EmployeeInfoItem;
