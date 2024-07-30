import axios from "axios";
import { url } from "../../constants/defaultUrl";

const postLogin = async (loginInfo) => {
    const body = {
        "email": loginInfo.email,
        "password" : loginInfo.password,
    }; 
    console.log(loginInfo);
    try {
        const response = await axios.post(`${url}/login`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // 쿠키를 요청에 포함시키기 위한 설정
        });

        if(response.status===200){ 
            const accessToken = response.headers['authorization']; // 서버에서 설정한 헤더 이름으로 변경
            const refreshToken = response.headers['authorization-refresh']; 
            return response;
        }
        else{
            
        }
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 400) {
                const message = data.message || "잘못된 요청입니다. 입력값을 확인해주세요.";
                throw new Error(message);
            } else if (status === 401) {
                const message = data.message || "인증 실패";
                throw new Error(message);
            } else {
                const message = data.message || `서버 오류: ${status}`;
                throw new Error(message);
            }
        } else if (error.request) {
            throw new Error("서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.");
        } else {
            throw new Error(`요청 중 오류가 발생했습니다: ${error.message}`);
        }
    }
};

export { postLogin };
