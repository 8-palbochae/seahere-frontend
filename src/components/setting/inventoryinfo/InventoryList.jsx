import React from "react";
import InventoryItem from "./InventoryItem";

const InventoryList = ({ data }) => {
	return (
		<div className="flex flex-col gap-3 p-2">
			{data.map((item) => (
				<InventoryItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default InventoryList;
