import React from "react";
import IncomingListItem from "./IncomingListItem";

const IncomingListComponent = ({ data }) => {
	return (
		<div className="space-y-1">
			{/*ListItem 간의 gap*/}
			{data.map((item) => (
				<IncomingListItem item={item} key={item.incomingId} />
			))}
		</div>
	);
};

export default IncomingListComponent;
