import { axiosInstance } from "../common/axiosInstance";
import { url } from "../../constants/defaultUrl";

export const sendSelectedQR = async (productIds) => {
    try {
        const response = await axiosInstance.post(`${url}/sendQR`, productIds, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/zip' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'qr_codes.zip';
        document.body.appendChild(link);
        link.click();
        link.remove();

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const reader = new FileReader();
            reader.onload = function () {
                console.error("다운로드 중 오류 발생:", reader.result);
            };
            reader.readAsText(error.response.data);
        } else {
            console.error("다운로드 중 오류 발생:", error);
        }
        throw error;
    }
};



