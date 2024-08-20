import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getCompanyInfo = async () => {
	try {
		const res = await axiosInstance.get(`${url}/teams`);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const deleteEmployee = async (userId) => {
	console.log(userId);
	try {
		const res = await axiosInstance.delete(`${url}/teams/${userId}`);
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const addEmployee = async (employeeEmail) => {
	console.log(employeeEmail);

	try {
		const res = await axiosInstance.patch(`${url}/teams`, employeeEmail);
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export { getCompanyInfo, deleteEmployee, addEmployee };
