import React from "react";
import AdjustListItem from "./AdjustListItem";

const AdjustListComponent = ({ data, date }) => {
	return (
		<>
			<div className="flex justify-start items-center text-xl w-full ml-3">
				{date}
			</div>
			<div className="w-full flex flex-col items-center px-4 gap-2">
				{data.map((item) => (
					<AdjustListItem key={item.adjustId} item={item} />
				))}
			</div>
		</>
	);
};

export default AdjustListComponent;
