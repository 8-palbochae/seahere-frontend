import React, { useEffect, useState } from "react";
import SearchInput from "../../common/SearchInput";
import ListHeader from "./ListHeader";
import InventoryList from "./InventoryList";
import { useQuery } from "@tanstack/react-query";
import { getInventoryList } from "../../../api/setting/inventorySettingApi";

const InventorySetting = () => {
	const [items, setItems] = useState([]);
	const { data, isPending } = useQuery({
		queryKey: ["inventoryList"],
		queryFn: getInventoryList,
		onSuccess: (data) => {
			setItems(data);
		},
	});

	console.log(data);
	if (isPending) {
		return (
			<div>
				<SearchInput />
				<ListHeader />
			</div>
		);
	}
	return (
		<div>
			<SearchInput />
			<ListHeader />
			<InventoryList data={data} />
		</div>
	);
};

export default InventorySetting;
