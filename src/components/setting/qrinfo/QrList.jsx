import React from "react";
import QrItem from "./QrItem";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../../api/incoming/incomingApi";

const QrList = ({ checkedItems, onCheckedChange }) => {
	const { data: products, isPending, isError, error } = useQuery({
		queryKey: ["productList"],
		queryFn: () => getProductList("incoming"),
	});

	let buttonText = Object.values(checkedItems).filter(Boolean).length
		? `${Object.values(checkedItems).filter(Boolean).length} 이메일로 보내기`
		: "이메일로 보내기";

	return (
		<div className="flex flex-col items-center gap-4 w-full p-4">
			<div className="flex flex-col items-center gap-4 w-full p-4 overflow-auto max-h-[65vh]">
				{isPending && <div>Loading...</div>}
				{isError && <div>Error: {error.message}</div>}
				{products && products.map((product) => (
					<QrItem
						key={product.productId}
						product={product}
						checked={checkedItems[product.productId] || false}
						onCheckedChange={onCheckedChange}
					/>
				))}
			</div>
			<button className="w-full rounded-[20px] text-white bg-blue-600 p-2">
				{buttonText}
			</button>
		</div>
	);
};

export default QrList;
