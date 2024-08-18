import { Typography } from "antd";
import { url } from "../../constants/defaultUrl";
import { axiosInstance } from "../common/axiosInstance";

const IncomingWeekSales = async (data) => {
    try {
        const res = await axiosInstance.post(`${url}/incoming/week`, data, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });

        console.log(res);
        return res.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw new Error("데이터 저장 실패");
    }
};

const IncomingMonthSales = async (data) => {
    try {
        const res = await axiosInstance.post(`${url}/incoming/month`, data, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        return res.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw new Error("데이터 저장 실패");
    }
}

const OutgoingWeekSales = async (data) => {
    try {
        const res = await axiosInstance.post(`${url}/outgoing/week`, data, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });

        console.log(res);
        return res.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw new Error("데이터 저장 실패");
    }
};

const OutgoingMonthSales = async (data) => {
    try {
        const res = await axiosInstance.post(`${url}/outgoing/month`, data, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        return res.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw new Error("데이터 저장 실패");
    }
}


const FishDataSales = async (data) => {
    try {
        const res = await axiosInstance.post(`${url}/fish/chart`, data, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        return res.data;
    } catch (error) {
        console.error("API 요청 실패:", error);
        throw new Error("데이터 요청 실패");
    }
}
export { IncomingWeekSales, IncomingMonthSales, OutgoingWeekSales, OutgoingMonthSales, FishDataSales };