import React, { useState, useEffect } from "react";
import { inventoryIcon } from "../../../constants/inventory/inventory.image";
import { getProductList } from "../../../api/incoming/incomingApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const InventoryPageSearchInput = ({ value }) => {

	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["productList", query],
		queryFn: () => getProductList(query),
		enabled: query?.length > 0,
	});

	useEffect(() => {
		if (data && query.length > 0) {			
			setSuggestions(data);
		} else {
			setSuggestions([]);
		}
	}, [data, query]);

	const handleSuggestionClick = (suggestion) => {
		navigate("/inventories", {
			state: { searchOption: suggestion.productName },
		});
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
		</div>
	);
};

export default InventoryPageSearchInput;
