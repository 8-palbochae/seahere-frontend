import React, { useState, useEffect } from "react";
import { inventoryIcon } from "../../constants/inventory/inventory.image";
import { getProductList } from "../../api/incoming/incomingApi";
import { useQuery } from "@tanstack/react-query";
import { Modal, Button, Checkbox } from "antd";

const SearchInputFilter = ({ checkedItems, onCheckedChange }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data, isPending } = useQuery({
		queryKey: ["productList"],
		queryFn: () => getProductList("incoming"),
	});

	useEffect(() => {
		if (!isPending && data) {
			if (query.length > 0) {
				const filteredSuggestions = data.filter(({ productName }) =>
					productName.toLowerCase().includes(query.toLowerCase())
				);
				setSuggestions(filteredSuggestions);
			} else {
				setSuggestions([]);
			}
		}
	}, [query, data, isPending]);

	const handleSuggestionClick = (suggestion) => {
		setSelectedProduct(suggestion);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleCheckboxChange = (event) => {
		const isChecked = event.target.checked;
		onCheckedChange(selectedProduct.productId, isChecked);
	};

	return (
		<div>
			<div className="flex h-12 bg-gray-100 justify-around items-center gap-3 m-2 rounded">
				<img
					className="w-8 object-cover ml-3 mr-2"
					src={inventoryIcon.searchIcon}
					alt="Search Icon"
				/>
				<input
					className="w-full h-10 p-2 bg-gray-200 rounded"
					type="text"
					placeholder="검색"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			{suggestions.length > 0 && query && (
				<div
					className="bg-white border border-gray-300 rounded mt-1 w-full"
					style={{ position: 'absolute', zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}
				>
					{suggestions.map((suggestion, index) => (
						<div
							key={index}
							className="p-2 cursor-pointer hover:bg-gray-200"
							onClick={() => handleSuggestionClick(suggestion)}
						>
							{suggestion.productName}
						</div>
					))}
				</div>
			)}

			{selectedProduct && (
				<Modal
					title={`${selectedProduct.productName} QR`}
					open={isModalOpen}
					footer={null}
					maskClosable={true}
					onCancel={handleModalClose}
				>
					<div className="flex flex-col gap-2">
						<img src={selectedProduct.qr} alt="qr-code" />
						<div className="flex justify-between mt-4">
							<Checkbox
								onChange={handleCheckboxChange}
								checked={!!checkedItems[selectedProduct.productId]}
							>
								선택
							</Checkbox>
							<Button type="primary" onClick={handleModalClose}>
								이메일로 전송
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default SearchInputFilter;
