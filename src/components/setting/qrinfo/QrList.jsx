import React from "react";
import QrItem from "./QrItem";
import { Modal, Button, Checkbox } from "antd";

const QrList = ({ products, checkedItems, onCheckedChange, onSelectAll, isMainModalOpen, onModalClose, onModalOpen, selectedProducts, handleSendSelectedQR }) => {
	const allChecked = products && products.every(product => checkedItems[product.productId]);
	const buttonText = selectedProducts.length > 0
		? `${selectedProducts.length} 건 다운로드`
		: "QR 코드를 선택해주세요.";

	const handleButtonClick = () => {
		onModalOpen();
	};

	const handleSelectAllChange = (e) => {
		const isChecked = e.target.checked;
		const newCheckedItems = {};
		if (isChecked && products) {
			products.forEach(product => {
				newCheckedItems[product.productId] = true;
			});
		}
		onSelectAll(newCheckedItems);
	};

	return (
		<div className="flex flex-col items-center gap-4 w-full p-4">
			<div className="flex items-center justify-between w-full p-2">
				<Checkbox
					onChange={handleSelectAllChange}
					checked={allChecked}
				>
					전체 선택
				</Checkbox>
			</div>
			<div className='flex flex-col'>
				<div className="flex flex-col items-center gap-4 w-full p-4 overflow-auto max-h-[65vh]">
					{products && products.map((product) => (
						<QrItem
							key={product.productId}
							product={product}
							checked={checkedItems[product.productId] || false}
							onCheckedChange={onCheckedChange}
							onModalOpen={handleButtonClick}
						/>
					))}
				</div>
				<Button
					className="w-full rounded-[20px] text-white bg-blue-600 p-2"
					onClick={handleButtonClick}
					disabled={selectedProducts.length === 0}
				>
					{buttonText}
				</Button>
			</div>

			<Modal
				title="선택한 QR 코드 목록"
				open={isMainModalOpen}
				onCancel={onModalClose}
				footer={[
					<Button key="send" type="primary" onClick={handleSendSelectedQR}>
						다운로드
					</Button>,
				]}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: '16px',
						maxHeight: '400px',
						overflowY: 'auto',
						justifyItems: 'center'
					}}
				>
					{selectedProducts.map(product => (
						<div key={product.productId} style={{ textAlign: 'center' }}>
							{product.productName} <br />
							<img src={product.qr} alt={`${product.productName} QR`} width={100} />
						</div>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default QrList;
