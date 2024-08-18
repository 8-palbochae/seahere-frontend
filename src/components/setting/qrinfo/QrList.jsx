import React, { useState } from "react";
import QrItem from "./QrItem";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../../api/incoming/incomingApi";
import { Modal, Button, Checkbox } from "antd";

const QrList = ({ checkedItems, onCheckedChange, onSelectAll }) => {
	const { data: products, isPending, isError, error } = useQuery({
		queryKey: ["productList"],
		queryFn: () => getProductList("incoming"),
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProducts, setSelectedProducts] = useState([]);

	const allChecked = products && products.every(product => checkedItems[product.productId]);
	const buttonText = Object.values(checkedItems).filter(Boolean).length
		? `${Object.values(checkedItems).filter(Boolean).length} 건 이메일로 보내기`
		: "QR 코드를 선택해주세요.";

	const handleButtonClick = () => {
		const selected = products.filter(product => checkedItems[product.productId]);
		setSelectedProducts(selected);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleEmailSend = () => {
		const productIds = selectedProducts.map(product => product.productId);
		console.log("이메일 전송 시작:", productIds);
		setIsModalOpen(false);
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
			<div className="flex flex-col items-center gap-4 w-full p-4 overflow-auto max-h-[65vh]">
				{isPending && <div>Loading...</div>}
				{isError && <div>Error: {error.message}</div>}
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
				disabled={Object.values(checkedItems).filter(Boolean).length === 0}
			>
				{buttonText}
			</Button>

			<Modal
				title="선택한 QR 코드 목록"
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="send" type="primary" onClick={handleEmailSend}>
						이메일 전송
					</Button>,
					<Button key="cancel" onClick={handleModalClose}>
						취소
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
