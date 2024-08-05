import React, { useState } from "react";
import useDragHandler from "../../../../hooks/useDragHandler";
import "../../../inventory/styles/InventoryItem.css";
import OutgoingComplete from "./OutgoingComplete";
import OutgoingItemDetails from "./OutgoingItemDetails";

const OutgoingListItem = ({ item }) => {
	const [isSwiped, setIsSwiped] = useState(false);
	const [showOutgoingComplete, setShowOutgoingComplete] = useState(false);

	// 핸들러 함수들
	const handleSwipeLeft = () => {
		setIsSwiped(true);
	};

	const handleSwipeRight = () => {
		setIsSwiped(false);
	};

	const handleOutgoingDeleteClose = () => {
		setShowOutgoingComplete(false);
	};

	const {
		itemRef,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleMouseDown,
	} = useDragHandler(handleSwipeLeft, handleSwipeRight);

	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded((prevState) => !prevState);
	};

	return (
		<div className="relative w-full flex flex-col">
			<div className="text-gray-700 text-base mb-1 border-b border-gray-300 pb-1">
				{item.outgoingDate}
			</div>
			<div className="relative w-full flex ">
				<div
					ref={itemRef}
					className={`flex w-full h-[98px] bg-white rounded-[20px] shadow-lg border-solid items-center px-4 transition-transform duration-300 ease-in-out ${
						isSwiped ? "translate-x-[-100px]" : "translate-x-0"
					}`}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onMouseDown={handleMouseDown}
					onClick={handleToggle}
				>
					<div className="flex-1 flex justify-center items-center">
						<div className="w-[69px] text-center font-normal text-black truncate  text-base leading-[normal]">
							{item.customerName}
						</div>
					</div>
					<div className="flex-1 flex justify-center items-center">
						<div className="w-[90px] text-center font-normal text-black truncate  text-base leading-[normal]">
							{item.title}
						</div>
					</div>

					<div className="flex-1 flex justify-center items-center">
						<div className="w-[70px] text-center font-normal text-black truncate  text-base leading-[normal]">
							{item.status}
						</div>
					</div>
				</div>
				{isSwiped && (
					<button
						className="absolute right-0 h-[98px] bg-blue-600 text-white py-2 px-4 rounded-r-lg shadow-lg flex items-center justify-center transition-width duration-300 ease-in-out block"
						style={{ width: "100px" }}
						onClick={() => setShowOutgoingComplete(true)}
					>
						출고 완료
					</button>
				)}
				{showOutgoingComplete && (
					<OutgoingComplete
						onClose={handleOutgoingDeleteClose}
						outgoingId={item.outgoingId}
					/>
				)}
			</div>
			<div
				className={`transition-height overflow-hidden flex flex-col justify-center items-center ${
					isExpanded ? "details-open" : "details-closed"
				}`}
			>
				{isExpanded && (
					<>
						{item.details.map((item) => (
							<OutgoingItemDetails
								key={item.outgoingDetailId}
								detailData={item}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default OutgoingListItem;
