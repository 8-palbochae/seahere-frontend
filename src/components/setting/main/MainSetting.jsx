import React, {useEffect} from "react";
import UserInfo from "./UserInfo";
import SettingList from "./SettingList";
import { useHeaderText } from "../../../stores/headerText";

const MainSetting = () => {
	const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("설정");
    }, [setHeaderText]);
	return (
		<div className="flex  justify-center pt-8">
			<div className="flex flex-col justify-center items-center gap-5 w-3/4">
				<div className="flex w-full">
					<UserInfo />
				</div>
				<div className="flex w-full">
					<SettingList />
				</div>
			</div>
		</div>
	);
};

export default MainSetting;
