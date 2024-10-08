import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getInventoryList = async () => {
	try {
		const res = await axiosInstance.get(`${url}/alarm/inventories`);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const postDiscountList = async ({ startDate, endDate, checkedValues }) => {
	const body = {
		startDate,
		endDate,
		inventories: checkedValues,
	};

	try {
		const res = await axiosInstance.post(`${url}/alarm/discounts`, body);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const getAlarmHistoryListSlice = async ({ page, size = 10 }) => {
	try {
		const res = await axiosInstance.get(`${url}/alarm/histories`, {
			params: { page, size },
		});
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export { getInventoryList, postDiscountList, getAlarmHistoryListSlice };
