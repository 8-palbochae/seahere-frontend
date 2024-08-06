import React, { useState } from "react";
import OutgoingListComponent from "../itemcomponent/OutgoingListComponent";
import SearchInputFilter from "../../../common/SearchInputFilter";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHistoryOutgoingList } from "../../../../api/history/historyApi";
const OutgoingList = () => {
	const date = useParams();
	const [search, setSearch] = useState("");
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["outgoings", { date, search }],
		queryFn: () => getHistoryOutgoingList(date.date, search),
	});
	if (isPending) {
		return (
			<div>
				<div>
					<SearchInputFilter setSearch={setSearch} search={search} />
				</div>
			</div>
		);
	}
	return (
		<div>
			<div>
				<SearchInputFilter setSearch={setSearch} search={search} />
				<OutgoingListComponent data={data} />
			</div>
		</div>
	);
};

export default OutgoingList;
