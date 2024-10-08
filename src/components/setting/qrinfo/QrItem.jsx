import React, { useState } from "react";
import { Modal, Checkbox, Button } from "antd";

const QrItem = ({ product, checked, onCheckedChange, onModalOpen }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleCheckboxChange = (event) => {
		const isChecked = event.target.checked;
		onCheckedChange(product.productId, isChecked);
	};

	const handleDownloadClick = () => {
		onModalOpen();
		setIsModalOpen(false);
	};

	return (
		<>
			<div
				className="flex flex-col w-full bg-white border-b-2 rounded-lg p-4 gap-4 cursor-pointer"
			>
				<div className="flex items-center gap-6">
					<div>
						<Checkbox
							checked={checked}
							onClick={(e) => e.stopPropagation()}
							onChange={handleCheckboxChange}
						/>
					</div>
					<div
						className="bg-white p-4 rounded-lg w-3/5 text-lg font-semibold"
						onClick={showModal}
					>
						{product.productName}
					</div>
					<div className="flex-grow flex justify-end">
						<img
							src={product.qr}
							alt="product-qr-code"
							className="cursor-pointer w-16 h-16"
							onClick={showModal}
						/>
					</div>
				</div>
			</div>

			<Modal
				title={`${product.productName} QR`}
				open={isModalOpen}
				footer={null}
				maskClosable={true}
				onCancel={handleModalClose}
			>
				<div className="flex flex-col gap-2">
					<img src={product.qr} alt="qr-code" style={{ width: '100%' }} />
					<div className="flex justify-between mt-4">
						<Checkbox
							onChange={handleCheckboxChange}
							checked={checked}
						>
							선택
						</Checkbox>
						<Button type="primary" onClick={handleDownloadClick}>
							다운로드
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default QrItem;
