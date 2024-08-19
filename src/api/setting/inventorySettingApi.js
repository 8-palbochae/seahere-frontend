import { axiosInstance } from "../common/axiosInstance";
import { url } from "../../constants/defaultUrl";

const getInventoryList = async () => {
	try {
		const res = await axiosInstance.get(`${url}/inventories/detail`);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const postInventoryDetail = async ({
	inventoryId,
	outgoingPrice,
	warningQuantity,
}) => {
	try {
		const res = await axiosInstance.post(
			`${url}/inventories/detail/${inventoryId}`,
			{
				outgoingPrice,
				warningQuantity,
			}
		);
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export { getInventoryList, postInventoryDetail };
