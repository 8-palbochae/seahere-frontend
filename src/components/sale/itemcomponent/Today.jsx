import React,{useState,useEffect} from "react";
import Icon from "../../../assets/sales/todaychart.svg";
import { IncomingWeekSales, OutgoingWeekSales } from "../../../api/sale/salesApi";

const Today = () => {
    const [incomingData, setIncomingData] = useState(0);
    const [outgoingData, setOutgoingData] = useState(0);
    const [profitData, setProfitData] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        setEndDate(today);
        if(startDate&&endDate){
            const fetchData = async ()=>{
            try{
                const data = {startDate,endDate};
                let incomingResponse, outgoingResponse;

                incomingResponse = await IncomingWeekSales(data);
                outgoingResponse = await OutgoingWeekSales(data);

                const incomingAmount = incomingResponse[0]?.commonPrice || 0;
                const outgoingAmount = outgoingResponse[0]?.commonPrice || 0;
                const profit = outgoingAmount - incomingAmount;

                setIncomingData(incomingAmount);
                setOutgoingData(outgoingAmount);
                setProfitData(profit);
            }catch(error){
                console.log("데이터 가져오기 실패:",error);
            }
        };
        fetchData();
    }
    }, [startDate,endDate]);

    return (
        <div className="w-[370px] h-[130px] relative">
            <div className="relative w-full h-full bg-blue-600 rounded-[10px] top-3 left-5">
                <div className="flex items-center justify-start w-full h-[25px] [font-family:'Inter-Bold', Helvetica] font-bold text-white text-lg absolute top-2 left-4 tracking-[0] leading-[normal]">
                    <img src={Icon} alt="Icon" className="w-5 h-5 mr-1" />
                    오늘의 통계
                </div>
                <div className="flex items-center absolute top-10 left-2 right-2">
                    <div className="flex flex-col items-center w-1/3">
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
                            입고
                        </span>
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap mt-4">
                            {incomingData.toLocaleString()} 원
                        </span>
                    </div>
                    <div className="border-l-2 border-black h-14 mx-2"></div>
                    <div className="flex flex-col items-center w-1/3">
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
                            출고
                        </span>
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap mt-4">
                            {outgoingData.toLocaleString()} 원
                        </span>
                    </div>
                    <div className="border-l-2 border-black h-14 mx-2"></div>
                    <div className="flex flex-col items-center w-1/3">
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
                            수익
                        </span>
                        <span className="text-white text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap mt-4">
                            {profitData.toLocaleString()} 원
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Today;
