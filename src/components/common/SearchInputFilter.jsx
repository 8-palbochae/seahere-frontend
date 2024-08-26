import React, { useState, useEffect } from "react";
import { inventoryIcon } from "../../constants/inventory/inventory.image";
import { Modal, Button, Checkbox } from "antd";

const SearchInputFilter = ({ products, checkedItems, onCheckedChange, selectedProducts, onProductSelect, onModalOpen }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isProductModalOpen, setIsProductModalOpen] = useState(false);

	useEffect(() => {
		if (query.length > 0) {
			const filteredSuggestions = products.filter(({ productName }) =>
				productName.toLowerCase().includes(query.toLowerCase())
			);
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	}, [query, products]);

	const handleSuggestionClick = (suggestion) => {
		setSelectedProduct(suggestion);
		setIsProductModalOpen(true);
	};

	const handleProductModalClose = () => {
		setIsProductModalOpen(false);
	};

	const handleCheckboxChange = (event) => {
		const isChecked = event.target.checked;
		onCheckedChange(selectedProduct.productId, isChecked);
	};

	const handleDownloadClick = () => {
		if (!selectedProducts.some(product => product.productId === selectedProduct.productId)) {
			onProductSelect([...selectedProducts, selectedProduct]);
		}
		setIsProductModalOpen(false);
		onModalOpen();
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
					open={isProductModalOpen}
					footer={null}
					maskClosable={true}
					onCancel={handleProductModalClose}
				>
					<div className="flex flex-col gap-2">
						<img src={selectedProduct.qr} alt="qr-code" style={{ width: '100%' }} />
						<div className="flex justify-between mt-4">
							<Checkbox
								onChange={handleCheckboxChange}
								checked={!!checkedItems[selectedProduct.productId]}
							>
								선택
							</Checkbox>
							<Button type="primary" onClick={handleDownloadClick}>
								다운로드
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default SearchInputFilter;
