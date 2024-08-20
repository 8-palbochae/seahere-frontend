import React from "react";
import SettingItem from "./SettingItem";
import settingIcon from "../../../constants/setting/setting.image";
import { useNavigate } from "react-router-dom";

const SettingList = ({ role }) => {
	const navigate = useNavigate();
	const onClick = (page) => {
		navigate(page);
	};

	if (role !== "ADMIN") {
		return (
			<div className="border border-gray-300 rounded-md w-full mt-10 text-md">
				<div onClick={() => onClick("/setting/alarms")}>
					<SettingItem
						type={"알람 보내기"}
						svg={settingIcon.sendIcon}
					/>
				</div>
				<div onClick={() => onClick("/setting/inventories")}>
					<SettingItem
						type={"재고 설정"}
						svg={settingIcon.inventoryIcon}
					/>
				</div>
				<div onClick={() => onClick("/setting/qr")}>
					<SettingItem type={"QR 정보"} svg={settingIcon.qrIcon} />
				</div>
			</div>
		);
	}

	return (
		<div className="border border-gray-300 rounded-md w-full mt-10 text-md">
			<div onClick={() => onClick("/setting/alarms")}>
				<SettingItem type={"알람 보내기"} svg={settingIcon.sendIcon} />
			</div>
			<div onClick={() => onClick("/setting/inventories")}>
				<SettingItem
					type={"재고 설정"}
					svg={settingIcon.inventoryIcon}
				/>
			</div>
			<div onClick={() => onClick("/setting/teams")}>
				<SettingItem type={"팀 설정"} svg={settingIcon.teamIcon} />
			</div>
			<div onClick={() => onClick("/setting/qr")}>
				<SettingItem type={"QR 정보"} svg={settingIcon.qrIcon} />
			</div>
		</div>
	);
};

export default SettingList;
