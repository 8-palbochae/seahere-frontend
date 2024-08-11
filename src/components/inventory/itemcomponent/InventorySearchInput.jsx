import React, { useState, useEffect } from "react";
import { inventoryIcon } from "../../../constants/inventory/inventory.image";
import { getProductList } from "../../../api/incoming/incomingApi";
import { useQuery } from "@tanstack/react-query";

const InventorySearchInput = ({ onSearchChange }) => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [suggestionPermit, setSuggestionPermit] = useState(true);

	const { data, isPending } = useQuery({
		queryKey: ["productList"],
		queryFn: () => getProductList(query),
		enabled: query !== "",
	});

	useEffect(() => {
		if (!isPending && data && suggestionPermit) {
			const filteredSuggestions = data.filter(({ productName }) =>
				productName.toLowerCase().includes(query.toLowerCase())
			);
			setSuggestions(filteredSuggestions);
		}
	}, [query, data, isPending, suggestionPermit]);

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		setQuery(newValue);
		setSuggestionPermit(true);
		onSearchChange(newValue);
	};

	const handleSuggestionClick = (suggestion) => {
		setQuery(suggestion.productName);
		setSuggestions([]);
		setSuggestionPermit(false);
		onSearchChange(suggestion.productName);
	};

	return (
		<div className="w-full flex justify-center mt-4 sticky top-0 bg-white">
			<div className="w-full max-w-4xl mx-auto bg-white px-4">
				<div className="flex h-11 bg-gray-100 justify-between items-center gap-3 m-2 rounded w-full overflow-hidden">
					<img
						className="w-8 object-cover ml-1 mr-2"
						src={inventoryIcon.searchIcon}
						alt="Search Icon"
					/>
					<input
						className="flex-grow h-8 p-1 bg-gray-200 rounded mr-3"
						type="text"
						placeholder="Search"
						value={query}
						onChange={handleInputChange}
					/>
				</div>
				{suggestions.length > 0 && query && suggestionPermit && (
					<div className="absolute w-full bg-white border border-gray-300 rounded mt-1 z-10 max-h-60 overflow-y-auto">
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
			</div>
		</div>
	);
};

export default InventorySearchInput;
