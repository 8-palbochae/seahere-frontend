import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getUserInfo = async () => {
	try {
		const res = await axiosInstance.get(`${url}/users/myinfo`);

		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

const updateUserPassword = async ({ password }) => {
	try {
		const res = await axiosInstance.patch(`${url}/users`, {
			password: password,
		});
		return res;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};
export { getUserInfo, updateUserPassword };
