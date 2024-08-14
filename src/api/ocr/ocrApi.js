import axios from 'axios';

export const uploadImageForOCR = async (imageSrc) => {
    const formData = new FormData();
    formData.append('file', imageSrc);

    try {
        const response = await axios.post('https://e5ca-14-44-120-104.ngrok-free.app/ocr', formData, {
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
