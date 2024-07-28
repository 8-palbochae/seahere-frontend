import axios from "axios";

export const certifyCompany = async (regNumber, ceoName, startDate) => {
    const body = {
        "businesses": [
            {
                "b_no": `${regNumber}`,
                "start_dt": `${startDate}`,
                "p_nm": `${ceoName}`,
            }
        ]
    };

    const serviceKey = "";

    try {
        const response = await axios.post(
            `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${serviceKey}`,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        if (response.data.data[0].valid === '01') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false; // 에러 발생 시 false 반환
    }
};
