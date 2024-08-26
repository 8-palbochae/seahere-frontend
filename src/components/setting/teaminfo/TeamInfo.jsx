import React, { useEffect, useState } from "react";
import CompanyInfo from "./CompanyInfo";
import settingIcon from "../../../constants/setting/setting.image";
import EmployeeList from "./EmployeeInfoList";
import { Input, Modal } from "antd";
import { addEmployee, getCompanyInfo } from "../../../api/setting/companyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TeamInfo = () => {
	const [employeeEmail, setEmployeeEmail] = useState("");

	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: ["companyInfo"],
		queryFn: getCompanyInfo,
	});

	const mutation = useMutation({
		mutationFn: addEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries(["companyInfo"]);
		},
		onError: (error) => {
			console.error("Error updating inventory:", error);
		},
	});


	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setEmployeeEmail("");
		setIsModalOpen(false);
	};

	const handleAddEmployee = () => {
		mutation.mutate({ employeeEmail });
		setEmployeeEmail("");
		setIsModalOpen(false);
	};
	const onChange = (email) => {
		setEmployeeEmail(email);
	};

	if (isPending) {
		return (
			<>
				<Modal
					title="멤버 등록"
					footer={null}
					open={isModalOpen}
					onCancel={handleCancel}
				>
					<div className="flex flex-col gap-3">
						<hr />
						<Input className="" placeholder="이메일" />
						<button className="text-white bg-blue-600 p-2 rounded-[20px]">
							{"멤버 등록"}
						</button>
					</div>
				</Modal>
				<div className="flex justify-center p-2">
					<div className="flex flex-col h-full w-full"></div>
				</div>
				<hr className="bg-black" />
				<div className="flex flex-col">
					<div className="flex justify-between p-2">
						<div>멤버 목록</div>
						<img
							onClick={showModal}
							src={settingIcon.addIcon}
							alt="add-icon"
						/>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Modal
				title="멤버 등록"
				footer={null}
				open={isModalOpen}
				onCancel={handleCancel}
			>
				<div className="flex flex-col gap-3">
					<hr />
					<Input
						className=""
						placeholder="이메일"
						value={employeeEmail}
						onChange={(e) => onChange(e.target.value)}
					/>
					<button
						className="text-white bg-blue-600 p-2 rounded-[20px]"
						onClick={handleAddEmployee}
					>
						{"멤버 등록"}
					</button>
				</div>
			</Modal>
			<div className="flex justify-center p-2">
				<div className="flex flex-col h-full w-full">
					<CompanyInfo data={data} />
				</div>
			</div>
			<hr className="bg-black" />
			<div className="flex flex-col">
				<div className="flex justify-between p-2">
					<div>멤버 목록</div>
					<img
						onClick={showModal}
						src={settingIcon.addIcon}
						alt="add-icon"
					/>
				</div>
				<EmployeeList data={data.employeeList} />
			</div>
		</>
	);
};

export default TeamInfo;
