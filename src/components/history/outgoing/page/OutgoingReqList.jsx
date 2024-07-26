import React, { useEffect, useLayoutEffect, useState } from "react";
import OutgoingReqListComponent from "../itemcomponent/OutgoingReqListComponent";
import SearchInputFilter from "../../../common/SearchInputFilter";
import { getOutgoingReqList } from "../../../../api/outgoing/outgoingApi";
import { useQuery } from "@tanstack/react-query";
import { enable } from "workbox-navigation-preload";
import PeriodStart from "../../main/itemcomponent/PeriodStart";
import PeriodEnd from "../../main/itemcomponent/PeriodEnd";
import dayjs from "dayjs";

const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const OutgoingReqList = () => {
	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState({});

	useLayoutEffect(() => {
		setQuery({ startDate, endDate, search });
	}, [startDate, endDate, search]);

	const useSearchResults = (query) => {
		return useQuery({
			queryKey: ["searchResults", query],
			queryFn: () => getOutgoingReqList(query),
			enable: !!query,
		});
	};

	const { data, isPending, isError, error } = useSearchResults(query);
	const { outgoingReqList, setOutgoingReqList } = useState(data);

	if (isPending) {
		return (
			<div>
				<div className="flex flex-col gap-5">
					<SearchInputFilter setSearch={setSearch} search={search} />
					<div className="flex items-center gap-2 justify-center">
						<PeriodStart
							setStartDate={setStartDate}
							startDate={startDate}
						/>
						<span>~</span>
						<PeriodEnd setEndDate={setEndDate} endDate={endDate} />
					</div>
					<div className="w-full flex flex-col items-center px-2 gap-2"></div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex flex-col gap-5">
				<SearchInputFilter setSearch={setSearch} search={search} />
				<div className="flex items-center gap-2 justify-center">
					<PeriodStart
						setStartDate={setStartDate}
						startDate={startDate}
					/>
					<span>~</span>
					<PeriodEnd setEndDate={setEndDate} endDate={endDate} />
				</div>
				<OutgoingReqListComponent
					data={data}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
			</div>
		</div>
	);
};

export default OutgoingReqList;
