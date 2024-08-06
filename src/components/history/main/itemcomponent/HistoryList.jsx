import React from "react";
import HistoryListItem from "./HistoryListItem";
import HistoryListRow from "./HistoryListRow";
const HistoryList = ({ list }) => {
	return (
		<div className="flex  flex-col justify-center w-full px-4">
			{list.map((item) => (
				<HistoryListRow key={item.date} date={item.date} count={item} />
			))}
		</div>
	);
};

export default HistoryList;
