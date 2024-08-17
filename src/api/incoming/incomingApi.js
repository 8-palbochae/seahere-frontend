import axios from "axios";
import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getProductList = async (value) => {
	try {
		const res = await axiosInstance.get(`${url}/product-search-${value}`, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		console.log("url: ", `${url}/product-search-${value}`);
		return res.data;
	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const getProduct = async (productId) => {
	try {
		const res = await axiosInstance.get(`${url}/product-qr/${productId}`, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
		console.log("adfa", res.data);
		return res.data;

	} catch (error) {
		throw new Error("서버 연결 실패");
	}
};

const saveIncomingData = async (data) => {
	try {
		const res = await axiosInstance.post(`${url}/incoming`, data, {
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

const modifyIncomingPrice = async (incomingId, price) => {
	const data = {
		incomingId: incomingId,
		price: price,
	};
	try {
		const res = await axiosInstance.patch(`${url}/incoming`, JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	} catch (error) {
		throw new Error("데이터 수정 실패");
	}
};
export { getProductList, getProduct, saveIncomingData, modifyIncomingPrice };
