import axios from "axios";
import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const getInventoryList = async (companyId, pageNum, size, searchOption) => {
    try {
        const response = await axiosInstance.get(`${url}/inventories?page=${pageNum}&size=${size}&search=${searchOption}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        return response.data.content.content;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("서버 연결 실패");
    }
};

const getInventoryDetails = async (companyId, name, category) => {
    try {
        const target = `${url}/inventories/details?page=0&size=5&search=&name=${name}&category=${category}`;
        const response = await axiosInstance.get(target, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
        return response.data.content.content;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error("서버 연결 실패");
    }
};

const updateInventoryQuantity = async (inventoryId, reason, afterQuantity) => {
    try {
        const target = `${url}/adjust`;
        const requestBody = {
            inventoryId: inventoryId,
            reason: reason,
            afterQuantity: parseFloat(afterQuantity)
        };
        const response = await axiosInstance.post(target, requestBody, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

    } catch (error) {
        console.error('Error updating inventory:', error.message);
        throw new Error("서버 연결 실패");
    }
}

export { getInventoryList, getInventoryDetails, updateInventoryQuantity };
