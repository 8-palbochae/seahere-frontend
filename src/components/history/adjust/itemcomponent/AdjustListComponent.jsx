import React from "react";
import AdjustListItem from "./AdjustListItem";

const AdjustListComponent = ({ data }) => {
	return (
		<div className="space-y-1">
			{data.map((item) => (
				<AdjustListItem key={item.adjustId} item={item} />
			))}
		</div>
	);
};

export default AdjustListComponent;
