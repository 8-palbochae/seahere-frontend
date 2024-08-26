import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import SettingList from "./SettingList";
import { useHeaderText } from "../../../stores/headerText";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../../api/setting/settingApi";

const MainSetting = () => {
	const { data, isLoading, isPending, isError } = useQuery({
		queryKey: ["userInfo"],
		queryFn: getUserInfo,
	});

	const { setHeaderText } = useHeaderText();
	useEffect(() => {
		setHeaderText("설정");
	}, [setHeaderText]);

	if (isLoading) {
		<div>잠시만 기다려주세요...</div>;
	}
	return (
		<div className="flex  justify-center pt-8">
			<div className="flex flex-col justify-center items-center gap-5 w-3/4">
				<div className="flex w-full">
					{data ? (
						<UserInfo user={data} />
					) : (
						<div>유저 정보를 불러올 수 없습니다.</div>
					)}
				</div>
				<div className="flex w-full">
					{data && data.role ? (
						<SettingList role={data.role} />
					) : (
						<div>설정 목록을 불러올 수 없습니다.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainSetting;
