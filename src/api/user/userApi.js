import axios from "axios"
import { url } from "../../constants/defaultUrl"

const postUser = async (userInfo,type) => {
    
    const body = {
        "email" : userInfo.email,
        "password" : userInfo.password,
        "username" : userInfo.username,
        "address" : userInfo.address,
    };
    console.log(body)
    try {
        const res = await axios.post(`${url}/users/${type}`,
            body,
            {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'

            }
        })
        console.log(res.data);
        return res.data;

    } catch (error) {
        throw new Error("서버 연결 실패")
    }
}
export { postUser }