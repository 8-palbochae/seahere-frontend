import React from "react";
import UserInfoItem from "./UserInfoItem";
import UserInfoAddressItem from "./UserInfoAddressItem";
import UserInfoPasswordItem from "./UserInfoPasswordItem";

const UserInfoList = ({ data }) => {
	return (
		<div>
			<UserInfoItem type={"직원명"} value={data.userName} />
			<UserInfoItem type={"이메일"} value={data.email} />
			<UserInfoPasswordItem type={"비밀번호 변경"} />
			<UserInfoItem type={"회사명"} value={data.company.companyName} />
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
	);
};

export default UserInfoList;
