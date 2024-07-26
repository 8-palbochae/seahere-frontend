import axios from "axios";
import { url } from "../../constants/defaultUrl";

const getOutgoingReqList = async (query) => {
	const { startDate, endDate, search } = query;
	try {
		const res = await axios.get(`${url}/outgoings`, {
			params: { startDate, endDate, search },
		});
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const getOutgoingReqDetailList = async (outgoingid) => {
	try {
		const res = await axios.get(`${url}/outgoings/${outgoingid}`);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export { getOutgoingReqList, getOutgoingReqDetailList };
