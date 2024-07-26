import React, { useEffect, useState } from "react";
import OutgoingReqListModalTitle from "./OutgoingReqListModaltitle";
import OutgoingReqListModalDetail from "./OutgoingReqListModalDetail";
import { getOutgoingReqDetailList } from "../../../../api/outgoing/outgoingApi";
import { useQuery, useLayoutEffect } from "@tanstack/react-query";

const OutgoingReqListModal = ({ handleCloseModal, outgoingId }) => {
	const [isModalOpen, setIsModalOpen] = useState(true);

	let { data, isPending, isError, error } = useQuery({
		queryKey: ["outgoingDetail", outgoingId],
		queryFn: () => getOutgoingReqDetailList(outgoingId),
		enable: !!outgoingId,
	});
	console.log(data);
	const handleClose = () => {
		setIsModalOpen(false);
		handleCloseModal();
	};

	if (!isModalOpen) return null;
	if (isPending) {
		data = [];
	}
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3">
			<div className="bg-white rounded-lg p-6 shadow-lg relative max-w-[600px] w-full">
				<div className="flex justify-center items-center relative">
					<span className="text-lg font-semibold mt-2">
						요청 상세
					</span>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 rounded mb-4"
					>
						X
					</button>
				</div>
				<div className="mt-8">
					<OutgoingReqListModalTitle />
				</div>
				<div className="mt-2">
					{data.map((item) => (
						<OutgoingReqListModalDetail
							key={item.outgoingDetailId}
							item={item}
						/>
					))}
				</div>

				<div className="mt-4 flex justify-center gap-4">
					<button className="bg-gray-300 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
						거절
					</button>

					<button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
						수락
					</button>
				</div>
			</div>
		</div>
	);
};

export default OutgoingReqListModal;
