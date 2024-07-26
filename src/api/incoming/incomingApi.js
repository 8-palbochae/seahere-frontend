import axios from "axios"
import { url } from "../../constants/defaultUrl"

const getProductList = async (value) => {
    try {
        const res = await axios.get(`${url}/product-search-${value}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'

            }
        })
        console.log("url: ", `${url}/product-search-${value}`);
        return res.data;

    } catch (error) {
        throw new Error("서버 연결 실패")
    }
}
export { getProductList }