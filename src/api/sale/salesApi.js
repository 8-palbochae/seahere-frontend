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

        console.log(res); // 응답 데이터 출력
		return res.data;
	} catch (error) {
		console.error("API 요청 실패:", error); // 에러 로그 출력
		throw new Error("데이터 저장 실패");
	}
};

const IncomingMonthSales = async(data) => {
    try{
        const res = await axiosInstance.post(`${url}/incoming/month`,data,{
            headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
        });
        return res.data;
    }catch(error){
        console.error("API 요청 실패:",error);
        throw new Error("데이터 저장 실패");
    }
} 

const outgoingWeekSales = async (data) => {
	try {
		const res = await axiosInstance.post(`${url}/outgoing/week`, data, {
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});

        console.log(res); // 응답 데이터 출력
		return res.data;
	} catch (error) {
		console.error("API 요청 실패:", error); // 에러 로그 출력
		throw new Error("데이터 저장 실패");
	}
};


export {IncomingWeekSales,IncomingMonthSales,outgoingWeekSales};