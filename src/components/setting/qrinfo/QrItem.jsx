import React, { useState } from "react";
import { Checkbox, Modal, Button } from "antd";

const QrItem = ({ product, onCheckedChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [checked, setChecked] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleCheckboxChange = (event) => {
		event.stopPropagation();
		const isChecked = event.target.checked;
		setChecked(isChecked);
		onCheckedChange(isChecked);
	};

	return (
		<>
			<Modal
				title={`${product.productName} QR`}
				open={isModalOpen}
				footer={null}
				maskClosable={true}
				onCancel={handleModalClose}
			>
				<div className="flex flex-col gap-2">
					<img src={product.qrCode} alt="qr-code" />
					<div className="flex justify-between mt-4">
						<Button type="primary" onClick={handleModalClose}>
							이메일로 전송
						</Button>
						<Button onClick={handleModalClose}>취소</Button>
					</div>
				</div>
			</Modal>
			<div
				className="flex flex-col w-full bg-white border-b-2 rounded-lg p-4 gap-4 cursor-pointer"
				onClick={showModal}
			>
				<div className="flex items-center gap-6">
					<div>
						<Checkbox
							onClick={(e) => e.stopPropagation()}
							onChange={handleCheckboxChange}
							checked={checked}
						/>
					</div>
					<div className="bg-white p-4 rounded-lg w-3/5 text-lg font-semibold">
						{product.productName}
					</div>
					<div className="flex-grow flex justify-end">
						<img
							src={product.qrCode}
							alt="product-qr-code"
							className="cursor-pointer w-16 h-16"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default QrItem;
