import React, { useState } from "react";
import SearchInputFilter from "../../common/SearchInputFilter";
import QrList from "./QrList";

const QrInfo = () => {
	const [checkedItems, setCheckedItems] = useState({});

	const handleCheckedChange = (productId, isChecked) => {
		setCheckedItems(prevState => {
			const newCheckedItems = { ...prevState };
			if (isChecked) {
				newCheckedItems[productId] = true;
			} else {
				delete newCheckedItems[productId];
			}
			return newCheckedItems;
		});
	};

	return (
		<>
			<div>
				<SearchInputFilter
					checkedItems={checkedItems}
					onCheckedChange={handleCheckedChange}
				/>
			</div>
			<div>
				<QrList
					checkedItems={checkedItems}
					onCheckedChange={handleCheckedChange}
				/>
			</div>
		</>
	);
};

export default QrInfo;
