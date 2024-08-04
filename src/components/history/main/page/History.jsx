import Period from "../itemcomponent/Period";
import HistoryList from "../itemcomponent/HistoryList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getHistoryList } from "../../../../api/history/historyApi";
import { useQuery } from "@tanstack/react-query";

const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const History = () => {
	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const [data, setData] = useState([]);

	const handleClick = async () => {
		try {
			const data = await getHistoryList(startDate, endDate);
			setData(data);
		} catch (error) {
			console.error("서버 연결 실패", error);
		}
	};

	return (
		<div className="flex flex-col gap-3 w-full ">
			<div className=" w-full">
				<Period
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					handleClick={handleClick}
				/>
			</div>
			<div className="w-full">
				<HistoryList list={data} />
			</div>
		</div>
	);
};

export default History;
