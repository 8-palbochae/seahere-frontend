import React, { useEffect, useState } from "react";
import SearchInput from "../../common/SearchInput";
import ListHeader from "./ListHeader";
import InventoryList from "./InventoryList";
import { useQuery } from "@tanstack/react-query";
import { getInventoryList } from "../../../api/setting/inventorySettingApi";
import NoQRSearchInput from "../../common/NoQRSearchInput";

const InventorySetting = () => {
	const [search, setSearch] = useState("");
	const [items, setItems] = useState([]);
	const { data, isPending } = useQuery({
		queryKey: ["inventoryList"],
		queryFn: getInventoryList,
		onSuccess: (data) => {
			setItems(data);
		},
	});

	if (isPending) {
		return (
			<div>
				<NoQRSearchInput search={search} setSearch={setSearch} />
				<ListHeader />
			</div>
		);
	}
	return (
		<div>
			<NoQRSearchInput search={search} setSearch={setSearch} />
			<ListHeader />
			<InventoryList data={data} search={search} />
		</div>
	);
};

export default InventorySetting;
