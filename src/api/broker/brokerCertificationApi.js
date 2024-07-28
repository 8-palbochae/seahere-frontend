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

    const serviceKey = "w%2F9mQZHK9naA0VQgcCPay%2B%2BAFoyLPVRNclaFvbIOC8%2B8BPTu%2FTAt1K9EdqkqnUlyJx4GEXMD4tsK22jqm7NLuA%3D%3D";

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
        console.log(response.data)
        if (response.data.data[0].valid === '01') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data); // responseText의 에러메세지 확인
        } else {
            console.log(error.message);
        }
        return false; // 에러 발생 시 false 반환
    }
};
