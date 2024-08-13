import React, { useEffect, useState } from "react";
import Period from "./Period";
import AlarmList from "./AlarmList";
import InventoryFilterModal from "../Inventoryfilter/InventoryFilterModal";
import SearchInput from "./SearchInput";
import { getInventoryList } from "../../../api/setting/alarmApi";
import { useQuery } from "@tanstack/react-query";

const Alarm = () => {
	const [checkedValues, setCheckedValues] = useState([]);
	const [search, setSearch] = useState("");
	const { data, isPending } = useQuery({
		queryKey: ["alarmInventoryList"],
		queryFn: getInventoryList,
	});
	console.log(data);
	console.log(checkedValues);
	const [open, setOpen] = useState(false);

	if (isPending) {
		return (
			<>
				<InventoryFilterModal open={open} setOpen={setOpen} />
				<div className="flex flex-col m-3 gap-3">
					<Period />
					<hr className="bg-blue-300 " />
					<SearchInput search={search} setSearch={setSearch} />
					<hr className="bg-blue-300 " />
					<button className="self-center rounded-[10px] p-2 bg-blue-600 text-white w-full">
						{"보내기"}
					</button>
				</div>
			</>
		);
	}
	return (
		<>
			<InventoryFilterModal open={open} setOpen={setOpen} />
			<div className="flex flex-col m-3 gap-3">
				<Period />
				<hr className="bg-blue-300 " />
				<SearchInput search={search} setSearch={setSearch} />
				<AlarmList
					data={data}
					setCheckedValues={setCheckedValues}
					search={search}
					checkedValues={checkedValues}
				/>
				<hr className="bg-blue-300 " />
				<button className="self-center rounded-[10px] p-2 bg-blue-600 text-white w-full">
					{"보내기"}
				</button>
			</div>
		</>
	);
};

export default Alarm;
