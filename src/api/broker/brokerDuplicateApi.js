import axios from "axios";
import { url } from "../../constants/defaultUrl";

export const duplicateCompany = async (regNumber) => {
    try {

        const body = {
            registrationNumber: regNumber
        };
        console.log(url);
        const res = await axios.post(`${url}/companies/duplicate`, body, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });        
        return res.status;
    } catch (error) {
        if(error.response.status === 409){
            return 409
        }                
        throw new Error("서버 연결 실패");
    }
};
