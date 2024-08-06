import React, { useEffect } from "react";
import TodayInfo from "./TodayInfo";
import InventorySearch from "./InventorySearch";
import IncomingSearch from "./IncomingSearch";
import OutgoingReq from "./OutgoingReq";
import Trade from "./Trade";
import Sales from "./Sales";
import { authenticationGet } from '../../../api/user/authApi';
import { useAuthenticationStore } from '../../../stores/authentication';
import { useHeaderText } from "../../../stores/headerText";

const BrokerMain = () => {
	const {accessToken,refreshToken,setAccessToken, setRefreshToken, deleteCookie } = useAuthenticationStore();
	const {setHeaderText} = useHeaderText();
	useEffect(() => {
		setHeaderText("홈"); // 컴포넌트가 마운트될 때 헤더를 "홈"으로 설정
		return () => setHeaderText("메인"); // 컴포넌트 언마운트 시 헤더 텍스트를 초기화
	}, [setHeaderText]);
	return (
		<div className="flex flex-col items-center w-full gap-3">
			<div className="p-2 rounded-[20px] w-full h-1/5">
				<TodayInfo />
			</div>
			<div className="p-2 rounded-[20px] w-full">
				<InventorySearch />
			</div>
			<div className="p-2 rounded-[20px] w-full">
				<IncomingSearch type="incoming" />
			</div>
			<div className="p-2 rounded-[20px] w-full">
				<OutgoingReq />
			</div>
			<div className="flex gap-2 w-full rounded-[20px] p-2">
				<div className="p-2 w-full rounded-[20px]">
					<Trade />
				</div>
				<div className="p-2 w-full rounded-[20px]">
					<Sales />
				</div>
			</div>
		</div>
	);
};

export default BrokerMain;
