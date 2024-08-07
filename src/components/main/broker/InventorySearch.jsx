import React from "react";
import InventoryPageSearchInput from "../../inventory/itemcomponent/InventoryPageSearchInput";

const InventorySearch = () => {
	return (
		<div className="flex flex-col rounded-[10px] shadow-lg w-full p-3">
			<div className="flex gap-2 items-center">
				<div className=" border-r border-gray-300 pr-1">여데이~</div>
				<div>재고</div>
			</div>
			<InventoryPageSearchInput />
		</div>
	);
};

export default InventorySearch;
