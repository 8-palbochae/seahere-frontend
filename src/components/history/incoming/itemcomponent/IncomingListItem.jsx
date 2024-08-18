import React, { useState } from "react";
import nupchiIcon from "../../../../assets/history/nupchi-icon.png";
import IncomingModifiedModal from "./IncomingModifiedModal";

const IncomingListItem = ({ item }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const price = item.incomingPrice / item.quantity;
	console.log(item);
	const [amount, setAmount] = useState(Math.floor(price)); // 초기 금액 설정

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveAmount = (newAmount) => {
		setAmount(newAmount);
		setIsModalOpen(false); // Close the modal after saving
	};

	return (
		<div className="w-full px-2 my-2">
			<div
				className="flex w-full bg-white rounded-lg shadow-xl px-3 py-2 items-center justify-between"
				onClick={handleOpenModal}
			>
				<div className="flex flex-col items-center mr-3 w-1/4 p-2">
					<div className="w-20 h-20 mb-1">
						<img
							className="w-full h-full object-fill rounded-xl"
							alt="Image"
							src={item.productImg}
						/>
					</div>
					<div className="text-center text-black text-base font-bold truncate w-full">
						{item.productName}
					</div>
				</div>
				<div className="text-center flex-1">
					<div className="text-black font-normal text-base">
						{item.category}
					</div>
				</div>
				<div className="text-center flex-1 text-blue-600 text-base font-bold">
					{item.quantity}
					<span className="text-black font-normal"> Kg</span>
				</div>
				<div className="text-center flex-1 text-black font-normal text-base cursor-pointer">
					{amount} <span className="">원(1kg)</span>
				</div>
			</div>
			<IncomingModifiedModal
				incomingId={item.incomingId}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSave={handleSaveAmount}
				initialAmount={amount} // 원래 금액을 전달
			/>
		</div>
	);
};

export default IncomingListItem;
