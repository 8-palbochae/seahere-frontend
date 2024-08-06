import React , {useEffect}from "react";
import AdjustListTitle from "../itemcomponent/AdjustListTitle";
import AdjustListComponent from "../itemcomponent/AdjustListComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getHistoryAdjustList } from "../../../../api/history/historyApi";
import { useHeaderText } from "../../../../stores/headerText";

const AdjustList = () => {

	const { setHeaderText } = useHeaderText();

    useEffect(() => {
        setHeaderText("조정 내역");
    }, [setHeaderText]);

	const date = useParams();
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["adjusts", { date }],
		queryFn: () => getHistoryAdjustList(date.date),
	});

	if (isPending) {
		return (
			<div>
				<div className="mt-2">
					<AdjustListTitle />
				</div>
				<div className="mt-1"></div>
			</div>
		);
	}

	return (
		<div>
			<div className="mt-2">
				<AdjustListTitle />
			</div>
			<div className="mt-1">
				<AdjustListComponent data={data} />
			</div>
		</div>
	);
};

export default AdjustList;
