import React from "react";
import nupchiIcon from "../../../../assets/history/nupchi-icon.png";

const AdjustListItem = ({ item }) => {
	return (
		<div className="w-full px-2 my-2">
			<div className="flex w-full bg-white rounded-lg shadow-xl px-3 py-2 items-center justify-between">
				<div className="flex flex-col items-center mr-3 w-1/4 p-2">
					<div className="w-20 h-20 mb-1">
						<img
							className="w-full h-full object-cover"
							alt="Image"
							src={item.productImg}
						/>
					</div>
					<div className="text-center text-black text-base font-bold truncate w-full">
						{item.productName}
					</div>
				</div>
				<div className="text-center flex-1">
					<div className="text-black font-normal text-base mr-8">
						{item.category}
					</div>
				</div>
				<div className="text-center flex-1">
					<div className="text-black font-normal text-base mr-8">
						{item.country}
					</div>
				</div>

				<div className="text-center flex-1 text-blue-600 text-base font-bold">
					<span className="text-black font-normal inline-block text-center mr-5">
						{item.beforeQuantity}kg <br />↓<br />{" "}
						{item.afterQuantity}kg
					</span>
				</div>
			</div>
		</div>
	);
};

export default AdjustListItem;
