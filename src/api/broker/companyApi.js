import axios from "axios"
import { url } from "../../constants/defaultUrl"

const postCompany = async (company) => {
    
    const body = {
        "registrationNumber" : company.registrationNumber,
        "representativeName" : company.representativeName,
        "companyName" : company.companyName,
        "address" : company.address,
        "profileImage" : null,

    };
    console.log(body)
    try {
        const res = await axios.post(`${url}/companies`,
            body,
            {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'

            }
        })
        return res.data;

    } catch (error) {
        throw new Error("서버 연결 실패")
    }
}
export { postCompany }