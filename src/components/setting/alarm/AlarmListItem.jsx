import React, { useState, useEffect } from "react";
import productImg from "../../../assets/income/product.svg";
import { Checkbox, Modal } from "antd";
import SaleInventorySettingModal from "./SaleInventorySettingModal";

const AlarmListItem = ({ item, setCheckedValues, checkedValues }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isChecked = checkedValues.some(
		(element) => element.inventoryId === item.inventoryId
	);
	const handleCheckboxChange = (e) => {
		const checked = e.target.checked;

		if (checked) {
			setCheckedValues((prev) => [...prev, item]);
		} else {
			setCheckedValues((prev) =>
				prev.filter(
					(element) => element.inventoryId !== item.inventoryId
				)
			);
		}
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	return (
		<>
			<SaleInventorySettingModal
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
				item={item}
			/>
			<div className="flex w-full gap-3">
				<Checkbox checked={isChecked} onChange={handleCheckboxChange} />
				<div
					onClick={showModal}
					className={
						"flex flex-grow p-1 justify-around items-center border border-blue-300 rounded-[20px] "
					}
				>
					<div className="flex flex-col justify-center items-center gap-2 ">
						<img
							className="w-10 h-10 rounded-full object-cover "
							src={productImg}
							alt="Product"
						/>
						<span className="text-gray-800">{item.name}</span>
					</div>
					<div className="w-px h-10 bg-gray-400"></div>
					<div className="text-center font-bold text-lg text-gray-800">
						{item.category}
					</div>
					<div className="w-px h-10 bg-gray-400"></div>
					<div className="text-center text-lg text-gray-700">
						{item.quantity}kg
					</div>
					<div className="w-px h-10 bg-gray-400"></div>
					<div className="text-center text-sm text-gray-500">
						{item.price}
					</div>
				</div>
			</div>
		</>
	);
};

export default AlarmListItem;
