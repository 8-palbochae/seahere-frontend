import React from "react";
import OutgoingReqListItem from "./OutgoingReqListItem";
const OutgoingReqListComponent = ({ data }) => {
	return (
		<div className="w-full flex flex-col items-center px-2 gap-2 overflow-auto max-h-[70vh] ">
			{data.map((item) => (
				<OutgoingReqListItem item={item} key={item.outgoingId} />
			))}
		</div>
	);
};

export default OutgoingReqListComponent;
