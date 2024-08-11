import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const weekSalesData = async (data) => {
	try {
		const res = await axiosInstance.post(`${url}/incoming/week`, data, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		if (!res.ok) {
			throw new Error("데이터 저장 실패");
		}
		return res.data;
	} catch (error) {
		throw error;
	}
};

export {weekSalesData};