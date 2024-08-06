import React,{useEffect} from "react";
import AlarmInfo from "./AlarmInfo";
import { useHeaderText } from "../../../stores/headerText";
const AlarmHistory = () => {
	const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("알림");
    }, [setHeaderText]);
	return (
		<div className="flex flex-col gap-4 items-center m-5">
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
			<AlarmInfo />
		</div>
	);
};

export default AlarmHistory;
