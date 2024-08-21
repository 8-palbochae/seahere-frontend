import React, { useState } from "react";
import EmployeeInfoItem from "./EmployeeInfoItem";
import Modal from "antd/es/modal/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../../../api/setting/companyApi";

const EmployeeList = ({ data }) => {
	const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: deleteEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries(["companyInfo"]);
			setIsModalOpen(false);
		},
		onError: (error) => {
			console.error("Error updating inventory:", error);
		},
	});

	console.log(data);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = (employeeId) => {
		setSelectedEmployeeId(employeeId);
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setSelectedEmployeeId(null);
		setIsModalOpen(false);
	};
	const handleDelete = () => {
		if (selectedEmployeeId) {
			console.log(selectedEmployeeId);
			mutation.mutate(selectedEmployeeId);
		}
	};
	return (
		<div className="flex flex-col gap-3 items-center p-3 w-min-[4/5]">
			<Modal
				title="멤버 삭제"
				footer={null}
				open={isModalOpen}
				onCancel={handleCancel}
			>
				<div className="flex flex-col gap-3">
					<hr />
					<button
						className="text-white bg-blue-600 p-2 rounded-[20px]"
						onClick={handleDelete}
					>
						{"멤버 삭제"}
					</button>
				</div>
			</Modal>
			{data.map((item) => (
				<div onClick={() => showModal(item.userId)} className="w-full">
					<EmployeeInfoItem item={item} key={item.userId} />
				</div>
			))}
		</div>
	);
};

export default EmployeeList;
