import React, { useState, useEffect } from "react";
import OutgoingReqListComponent from "../itemcomponent/OutgoingReqListComponent";
import { getOutgoingReqListSlice } from "../../../../api/outgoing/outgoingApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import PeriodStart from "../../main/itemcomponent/PeriodStart";
import PeriodEnd from "../../main/itemcomponent/PeriodEnd";
import dayjs from "dayjs";
import { useHeaderText } from "../../../../stores/headerText";
import SearchInputFilter from "../itemcomponent/SearchInputFilter";

const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const OutgoingReqList = () => {
	const { setHeaderText } = useHeaderText();

	useEffect(() => {
		setHeaderText("출고 요청 내역");
	}, [setHeaderText]);

	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const [search, setSearch] = useState("");
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ["outgoingReqList", { startDate, endDate, search }],
			queryFn: ({ pageParam = 0 }) =>
				getOutgoingReqListSlice({
					startDate,
					endDate,
					search,
					page: pageParam,
				}),
			getNextPageParam: (lastPage) =>
				lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
		});
	if (status === "loading") {
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
					<div>잠시만 기다려 주세요</div>
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
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
			</div>
		</div>
	);
};

export default OutgoingReqList;
