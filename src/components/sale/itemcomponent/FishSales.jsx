import React,{useEffect, useState} from "react";
import Icon from '../../../assets/sales/fish.svg'
import FishPeriodModal from "./FishPeriodModal";
import FishChart from "./FishChart";
import { FishDataSales } from "../../../api/sale/salesApi";

const FishSales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate,setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chartData, setChartData] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const fetchData = async (start, end) => {
        try {
            const data = { startDate: start, endDate: end };
            setChartData(null);
            const FishData = await FishDataSales(data);
            setChartData(FishData);
            console.log(FishData);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };

    const handleSearch = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
        fetchData(startDate, endDate);
        closeModal();
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setStartDate(today);
        setEndDate(today);
        fetchData(today, today);
    }, []);

    return(
        <div className="w-[370px] h-[314px] relative mx-auto mt-6">
        <div className="relative w-full h-[314px] bg-blue-600 rounded-[10px]">
            <div className="absolute w-[95%] h-[263px] top-[40px] left-[50%] transform -translate-x-[50%] bg-white rounded-[10px]">
                <div className="flex justify-between items-center w-full h-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-base text-gray-500 mt-2 ml-2">
                    <div className="whitespace-nowrap text-center tracking-[0] leading-[normal] text-sm">
                        {startDate && endDate ? `${startDate} ~ ${endDate}` : ""}
                    </div>
                </div>

                <div className="w-full h-full">
                <FishChart data={chartData} />
                </div>
            </div>
            <div className="flex items-center justify-start w-[90%] h-[25px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-lg absolute tracking-[0] leading-[normal] mt-2 ml-4">
                <div className="flex items-center">
                    <img src={Icon} alt="Icon" className="w-5 h-5 mr-1 mt-1" />
                    어종별 판매 순위
                </div>
                <button
                        className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded ml-auto"
                        onClick={openModal}
                    >
                        조회 설정
                    </button>
            </div>
        </div>
        <FishPeriodModal isOpen={isModalOpen} onClose={closeModal} onSearch={handleSearch}/>
    </div>
    );
};

export default FishSales;