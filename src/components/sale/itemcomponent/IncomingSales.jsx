import React, { useState,useEffect } from "react";
import Icon from "../../../assets/sales/graph.svg";
import SalesPeriodModal from "./SalesPeriodModal"; // 모달 경로 수정
import Chart from "./Chart";


const IncomingSales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chartData, setChartData] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearch = (data) => {
        setChartData(data); // 차트 데이터를 상태로 설정
        closeModal(); // 모달 닫기
    };

    
    return (
        <div className="w-[370px] h-[314px] relative mx-auto mt-3">
            <div className="relative w-[90%] h-[314px] bg-blue-600 rounded-[10px] mx-auto">
                <div className="absolute w-[95%] h-[263px] top-[38px] left-[50%] transform -translate-x-[50%] bg-white rounded-[10px]">
                <div className="w-[33px] h-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#afafaf] text-base whitespace-nowrap absolute text-center tracking-[0] leading-[normal] mt-2 ml-2">
                        입고
                    </div>
                <div className="w-full h-full">
                        {/* 차트 컴포넌트 렌더링 */}
                        {chartData && <Chart data={chartData} />}
                    </div>
                    
                    
                </div>
                <div className="flex items-center justify-start w-[90%] h-[25px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-lg absolute tracking-[0] leading-[normal] mt-2 ml-4">
                    <div className="flex items-center">
                        <img src={Icon} alt="Icon" className="w-5 h-5 mr-1" />
                        매출현황
                    </div>
                    <button
                        className="text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded ml-auto"
                        onClick={openModal}
                    >
                        조회 설정
                    </button>
                </div>
            </div>
            <SalesPeriodModal isOpen={isModalOpen} onClose={closeModal}  onSearch={handleSearch}/>
        </div>
    );
};

export default IncomingSales;
