import React, { useState, useEffect } from "react";
import { inventoryIcon } from "../../constants/inventory/inventory.image";
import { getProductList } from "../../api/incoming/incomingApi";
import { useQuery } from "@tanstack/react-query";
import QrItem from "../../components/setting/qrinfo/QrItem";

const SearchInputFilter = ({ value }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["productList"],
		queryFn: () => getProductList(value),
		enabled: value !== undefined && value !== null,
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
		setSuggestions([]);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
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
				<div className="bg-white border border-gray-300 rounded mt-1">
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
				<QrItem
					product={selectedProduct}
					isModalOpen={isModalOpen}
					onModalClose={handleModalClose}
					onCheckedChange={() => { }}
				/>
			)}
		</div>
	);
};

export default SearchInputFilter;
