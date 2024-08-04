import React from "react";
import PropTypes from "prop-types";
import HistoryListItem from "./HistoryListItem";
import dayjs from "dayjs";
const HistoryListRow = ({ date, count }) => {
	return (
		<>
			<div className="flex flex-col w-full shadow-lg mt-3">
				<div className="text-gray-600 font-semibold text-sm mb-1">
					{date}
				</div>
				<div className="flex w-full">
					<HistoryListItem
						type={"출고"}
						count={count.outgoingCount}
						date={date}
					/>
					<HistoryListItem
						type={"입고"}
						count={count.incomingCount}
						date={date}
					/>
					<HistoryListItem
						type={"조정"}
						count={count.adjustCount}
						date={date}
					/>
				</div>
			</div>
		</>
	);
};

HistoryListRow.propTypes = {};

export default HistoryListRow;
