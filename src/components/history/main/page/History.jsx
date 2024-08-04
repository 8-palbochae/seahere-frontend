import Period from "../itemcomponent/Period";
import HistoryList from "../itemcomponent/HistoryList";
import { useState } from "react";
import dayjs from "dayjs";
import { getHistoryList } from "../../../../api/history/historyApi";
import { useQuery } from "@tanstack/react-query";

const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const History = () => {
	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const { isPending, error, data, isError } = useQuery({
		queryKey: ["historyList", { startDate, endDate }],
		queryFn: () => getHistoryList(startDate, endDate),
	});
	if (isPending) {
		return (
			<div className="flex flex-col gap-3 w-full ">
				<div className=" w-full">
					<Period
						setStartDate={setStartDate}
						setEndDate={setEndDate}
					/>
				</div>
				<div className="w-full"></div>
			</div>
		);
	}
	return (
		<div className="flex flex-col gap-3 w-full ">
			<div className=" w-full">
				<Period setStartDate={setStartDate} setEndDate={setEndDate} />
			</div>
			<div className="w-full">
				<HistoryList list={data} />
			</div>
		</div>
	);
};

export default History;
