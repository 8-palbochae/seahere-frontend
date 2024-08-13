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
export { getInventoryList };
