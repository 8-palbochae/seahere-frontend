import React from "react";
import InventoryItem from "./InventoryItem";

const InventoryList = ({ data, search }) => {
	console.log("search = ", search);
	console.log("data = ", data);
	return (
		<div className="flex flex-col gap-3 p-2">
			{data
				.filter((item) => item.name.includes(search))
				.map((item) => (
					<InventoryItem key={item.id} item={item} />
				))}
		</div>
	);
};

export default InventoryList;
