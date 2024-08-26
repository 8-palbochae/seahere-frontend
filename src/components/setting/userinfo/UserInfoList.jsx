import React from "react";
import UserInfoItem from "./UserInfoItem";
import UserInfoAddressItem from "./UserInfoAddressItem";
import UserInfoPasswordItem from "./UserInfoPasswordItem";

const UserInfoList = ({ data }) => {
	return (
		<div className="w-full">
			<div className="border border-gray-300 rounded-md w-full mt-10 text-md">
				<UserInfoItem type={"직원명"} value={data.userName} />
				<UserInfoItem type={"이메일"} value={data.email} />
				<UserInfoPasswordItem type={"비밀번호 변경"} />
			</div>
			<div className="border border-gray-300 rounded-md w-full mt-6 text-md">
				<UserInfoItem
					type={"회사명"}
					value={data.company.companyName}
				/>
				<UserInfoItem
					type={"사업자번호"}
					value={data.company.registrationNumber}
				/>
				<UserInfoAddressItem
					type={"사업자 주소"}
					address={data.company.address.mainAddress}
					address2={data.company.address.subAddress}
					postNumber={data.company.address.postCode}
				/>
			</div>
		</div>
	);
};

export default UserInfoList;
