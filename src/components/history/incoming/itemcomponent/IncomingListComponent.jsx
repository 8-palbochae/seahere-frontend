import React from "react";
import IncomingListItem from "./IncomingListItem";

const IncomingListComponent = ({ data, date }) => {
	return (
		<>
			<div className="flex justify-start items-center text-xl w-full ml-3">
				{date}
			</div>
			<div className="w-full flex flex-col items-center px-4 ">
				{data.map((item) => (
					<IncomingListItem item={item} key={item.incomingId} />
				))}
			</div>
		</>
	);
};

export default IncomingListComponent;
