import React from "react";

const AdjustListTitle = () => {
	return (
		<div className="w-full px-3">
			<div className="w-full h-[70px] bg-gray-100 flex items-center justify-between px-0 rounded-md">
				<div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
					어종
				</div>
				<div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
					분류
				</div>
				<div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
					원산지
				</div>
				<div className="font-normal text-black mr-2 text-base text-center leading-[normal] whitespace-nowrap flex-1">
					재고수량
					<br />
					변동
				</div>
			</div>
		</div>
	);
};

export default AdjustListTitle;
