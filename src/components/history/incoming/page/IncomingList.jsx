import React, {useEffect} from "react";
import IncomingListTitle from "../itemcomponent/IncomingListTitle";
import IncomingListComponent from "../itemcomponent/IncomingListComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHistoryIncomingList } from "../../../../api/history/historyApi";
import { useHeaderText } from "../../../../stores/headerText";

const IncomingList = () => {
	const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("입고 내역");
    }, [setHeaderText]);

	const date = useParams();
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["incomings", date],
		queryFn: () => getHistoryIncomingList(date.date),
	});
	if (isPending) {
		return (
			<div>
				<div className="mt-1"></div>
			</div>
		);
	}
	return (
		<div>
			<div className="mt-1">
				<IncomingListComponent data={data} />
			</div>
		</div>
	);
};

export default IncomingList;
