import React from "react";

const OutgoingItemDetails = ({ detailData }) => {
	const textColor = detailData.delete ? "text-red-600" : "text-black";
	
	return (
		<div
			className={`flex flex-col justify-center w-11/12 p-3 border-t border-gray-200 ${textColor}`}
		>
			<div className="flex justify-around items-center mb-2">
				<div className="flex justify-between w-full">
					<div className="w-1/6 text-sm font-medium  text-center">
						{detailData.productName}
					</div>
					<div className="w-1/6 text-sm font-medium text-center">
						{detailData.category}
					</div>
					<div className="w-1/6 text-sm font-medium  text-center">
						{detailData.naturalStatus}
					</div>
					<div className="w-1/6 text-sm truncate text-center">
						{detailData.country}
					</div>
					<div className="w-1/6 text-sm truncate text-center">
						{detailData.outgoingQuantity}Kg
					</div>
					<div className="w-2/6 text-sm truncate overflow-hidden text-ellipsis text-center">
    					{detailData.price === 0 ? "트레이드" : `${detailData.price.toLocaleString()}원`}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutgoingItemDetails;
