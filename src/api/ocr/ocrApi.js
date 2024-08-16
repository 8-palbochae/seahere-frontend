import axios from 'axios';

export const uploadImageForOCR = async (imageSrc) => {
    const formData = new FormData();
    formData.append('file', imageSrc);

    try {
        const response = await axios.post('https://3b90-203-247-166-251.ngrok-free.app/ocr', formData, {
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
