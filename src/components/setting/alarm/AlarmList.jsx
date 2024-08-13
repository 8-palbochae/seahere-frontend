import React from "react";
import AlarmListItem from "./AlarmListItem";

const AlarmList = ({ data, setCheckedValues, search, checkedValues }) => {
	const filteredData = data.filter((item) => item.name.includes(search));
	return (
		<div className="flex flex-col gap-2 w-full ">
			<div className="flex flex-col gap-2 overflow-auto max-h-[50vh]  m-3">
				{filteredData.map((item) => (
					<AlarmListItem
						item={item}
						key={item.inventoryId}
						setCheckedValues={setCheckedValues}
						checkedValues={checkedValues}
					/>
				))}
			</div>
		</div>
	);
};

export default AlarmList;
