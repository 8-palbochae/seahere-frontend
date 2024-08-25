import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getHistoryList = async ({ startDate, endDate, page }) => {
	try {
		const res = await axiosInstance.get(`${url}/histories`, {
			params: { startDate, endDate, page },
		});
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const getHistoryIncomingList = async (date) => {
	try {
		const res = await axiosInstance.get(
			`${url}/histories/incomings/${date}`
		);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};
const getHistoryAdjustList = async (date) => {
	try {
		const res = await axiosInstance.get(`${url}/histories/adjusts/${date}`);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const getHistoryOutgoingList = async (date, search) => {
	try {
		const res = await axiosInstance.get(
			`${url}/histories/outgoings/${date}?search=${search}`
		);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

export {
	getHistoryList,
	getHistoryIncomingList,
	getHistoryOutgoingList,
	getHistoryAdjustList,
};
