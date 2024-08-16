import axios from 'axios';
import { url } from "../../constants/defaultUrl";

export const uploadImageForOCR = async (imageSrc) => {
    const formData = new FormData();
    formData.append('file', imageSrc);

    try {
        const response = await axios.post(`${url}/ocr`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during OCR processing:', error);
        throw error;
    }
};
