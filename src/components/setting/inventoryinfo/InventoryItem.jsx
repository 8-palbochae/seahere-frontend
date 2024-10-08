import React, { useState } from "react";
import dayjs from "dayjs";
import productImg from "../../../assets/income/product.svg";
import { Modal, Input } from "antd";
import InventorySettingModal from "./InventorySettingModal";

const InventoryItem = ({ item }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	return (
		<>
			<InventorySettingModal
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
				item={item}
			/>
			<div
				onClick={showModal}
				className={
					"flex  p-1 justify-around items-center border border-blue-600 rounded-[20px] "
				}
			>
				<div className="flex flex-col justify-center items-center gap-2 w-1/5 ">
					<div className='w-10 h-10'>
						<img
							className="w-full h-full rounded-full object-fill "
							src={item.imgUrl}
							alt="Product"
						/>
					</div>
					<span className="text-gray-800">{item.name}</span>
				</div>
				<div className="w-px h-10 bg-gray-400"></div>
				<div className="text-center font-bold text-lg text-gray-800">
					{item.category}
				</div>
				<div className="w-px h-10 bg-gray-400"></div>
				<div className="text-center text-lg text-gray-700">
					{item.warningQuantity}kg
				</div>
				<div className="w-px h-10 bg-gray-400"></div>
				<div className="text-center text-sm text-gray-500">
					{item.outgoingPrice.toLocaleString()}원
				</div>
			</div>
		</>
	);
};

export default InventoryItem;
