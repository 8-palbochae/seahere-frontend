import axios from "axios";
import { url } from "../../constants/defaultUrl";

const getHistoryList = async (startDate, endDate) => {
	try {
		const res = await axios.get(`${url}/histories`, {
			params: { startDate, endDate },
		});
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const getHistoryIncomingList = async (date) => {
	try {
		const res = await axios.get(`${url}/histories/incomings/${date}`);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};
const getHistoryAdjustList = async (date) => {
	try {
		const res = await axios.get(`${url}/histories/adjusts/${date}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const getHistoryOutgoingList = async (date, search) => {
	try {
		const res = await axios.get(
			`${url}/histories/outgoings/${date}?search=${search}`
		);
		console.log(res.data);
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
