import React, { useEffect, useState } from "react";
import Period from "./Period";
import AlarmList from "./AlarmList";
import InventoryFilterModal from "../Inventoryfilter/InventoryFilterModal";
import SearchInput from "./SearchInput";
import {
	getInventoryList,
	postDiscountList,
} from "../../../api/setting/alarmApi";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const getCurrentDate = () => {
	return dayjs().format("YYYY-MM-DD");
};

const Alarm = () => {
	const navigate = useNavigate();
	const [startDate, setStartDate] = useState(getCurrentDate);
	const [endDate, setEndDate] = useState(getCurrentDate);
	const [items, setItems] = useState([]);
	const [checkedValues, setCheckedValues] = useState([]);
	const [search, setSearch] = useState("");
	const { data, isPending } = useQuery({
		queryKey: ["alarmInventoryList"],
		queryFn: getInventoryList,
		onSuccess: (data) => {
			setItems(data);
		},
	});
	console.log(items);
	console.log(checkedValues);
	const [open, setOpen] = useState(false);

	const updateItem = (updatedItem) => {
		console.log("updateItem called");
		setItems((prevItems) => {
			const newItems = prevItems.map((item) =>
				item.inventoryId === updatedItem.inventoryId
					? updatedItem
					: item
			);
			console.log("Updated items in updateItem:", newItems);
			return newItems;
		});

		// Update the checkedValues array
		setCheckedValues((prevChecked) => {
			const newChecked = prevChecked.map((item) =>
				item.inventoryId === updatedItem.inventoryId
					? updatedItem
					: item
			);
			console.log("Updated checkedValues in updateItem:", newChecked);
			return newChecked;
		});
	};

	useEffect(() => {
		console.log("Data from query:", data);
		if (data && data.length > 0) {
			setItems(data);
		} else {
			console.warn("Data is empty or undefined.");
		}
	}, [data]);

	const handleOnClick = () => {
		postDiscountList({ startDate, endDate, checkedValues });
		navigate("/main");
	};

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
				<Period
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
				/>
				<hr className="bg-blue-300 " />
				<SearchInput search={search} setSearch={setSearch} />
				<AlarmList
					data={items}
					setCheckedValues={setCheckedValues}
					search={search}
					checkedValues={checkedValues}
					updateItem={updateItem}
				/>
				<hr className="bg-blue-300 " />
				<button
					className="self-center rounded-[10px] p-2 bg-blue-600 text-white w-full"
					onClick={handleOnClick}
				>
					{"보내기"}
				</button>
			</div>
		</>
	);
};

export default Alarm;
