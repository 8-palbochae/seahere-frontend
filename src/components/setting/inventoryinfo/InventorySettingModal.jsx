import React, { useState } from "react";
import { Modal, Input } from "antd";
import productImg from "../../../assets/income/product.svg";
import { postInventoryDetail } from "../../../api/setting/inventorySettingApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const InventorySettingModal = ({ isModalOpen, setIsModalOpen, item }) => {
	const queryClient = useQueryClient();
	const inventoryId = item.inventoryId;
	const [warningQuantity, setWarningQuantity] = useState(
		item.warningQuantity
	);
	const [outgoingPrice, setOutgoingPrice] = useState(item.outgoingPrice.toLocaleString());

	const mutation = useMutation({
		mutationFn: postInventoryDetail,
		onSuccess: () => {
			queryClient.invalidateQueries(["inventoryList"]);
			setIsModalOpen(false);
		},
		onError: (error) => {
			console.error("Error updating inventory:", error);
		},
	});

	const handleSuccess = () => {
		const numericOutgoingPrice = parseNumber(outgoingPrice);
		mutation.mutate({ inventoryId, warningQuantity, outgoingPrice:numericOutgoingPrice });
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const formatNumber = (num) => {
		if (num === '') return '';
		return Number(num).toLocaleString();
	};

	const parseNumber = (str) => {
		return parseFloat(str.replace(/,/g, '')) || 0;
	};

	const onOutgoingPriceChange = (price) => {
		setOutgoingPrice(formatNumber(price.replace(/,/g, '')));
	};

	const onWarningQuantityChange = (quantity) => {
		setWarningQuantity(quantity);
	};
	return (
		<Modal
			title="재고 설정"
			footer={null}
			open={isModalOpen}
			onCancel={handleCancel}
		>
			<div className="flex flex-col gap-3">
				<div className="flex justify-around gap-3 p-3">
					<div className="w-1/3 rounded-[20px]">
						<img src={item.imgUrl} alt="상품이미지" />
					</div>
					<div className="self-center">
						<b>
							{item.country} / {item.naturalStatus}
						</b>
					</div>
				</div>
				<div className="flex justify-around items-center  border-b-2 p-1">
					<div className="w-2/3">{"재고부족 알림 기준"}</div>
					<div className="w-1/3">
						<Input
							value={warningQuantity}
							onChange={(e) =>
								onWarningQuantityChange(e.target.value)
							}
						/>
					</div>
				</div>
				<div className="flex justify-around items-center  border-b-2 p-1">
					<div className="w-2/3">{"출고금액"}</div>
					<div className="w-1/3">
						<Input
							value={outgoingPrice.toLocaleString()}
							onChange={(e) =>
								onOutgoingPriceChange(e.target.value)
							}
						/>
					</div>
				</div>
				<div className="flex justify-around">
					<button
						onClick={handleSuccess}
						className="rounded-[20px] w-2/5 p-3 text-white bg-blue-600"
					>
						확인
					</button>
					<button
						onClick={handleCancel}
						className="rounded-[20px] w-2/5 p-3 text-black border border-blue-600"
					>
						취소
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default InventorySettingModal;
