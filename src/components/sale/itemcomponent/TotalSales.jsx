import React, { useState } from "react";
import Icon from "../../../assets/sales/graph.svg";
import SalesPeriodModal from "./SalesPeriodModal";
import Chart from "./Chart";
import { useSwipeable } from "react-swipeable";

const TotalSales = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [outgoingChartData, setOutgoingChartData] = useState(null);
    const [profitChartData, setProfitChartData] = useState(null); 
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearch = ({ incomingData, outgoingData }) => {
        console.log("Incoming Data:", incomingData);
        console.log("Outgoing Data:", outgoingData);
        
       
        const profitData = incomingData.map((item, index) => {
            const outgoingItem = outgoingData.find(out => out.commonDate === item.commonDate);
            const profit = (outgoingItem ? outgoingItem.commonPrice : 0) - item.commonPrice;
            return {
                ...item,
                commonPrice: profit 
            };
        });

        setChartData(incomingData);
        setOutgoingChartData(outgoingData);
        setProfitChartData(profitData); 
        closeModal();
    };

    const handleSwipe = (direction) => {
        if (direction === "Left" && currentIndex < 2) {
            setCurrentIndex(currentIndex + 1);
        } else if (direction === "Right" && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleSwipe("Left"),
        onSwipedRight: () => handleSwipe("Right"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div className="w-[370px] h-[314px] relative mx-auto mt-3">
            <div className="relative w-[90%] h-[314px] bg-blue-600 rounded-[10px] mx-auto">
                <div className="absolute w-[95%] h-[263px] top-[40px] left-[50%] transform -translate-x-[50%] bg-white rounded-[10px]" {...swipeHandlers}>
                    <div className="flex justify-between items-center w-full h-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-base text-gray-500 mt-2 ml-2">
                        <div className="whitespace-nowrap text-center tracking-[0] leading-[normal] text-sm">
                            {currentIndex === 0 ? "입고" : currentIndex === 1 ? "출고" : "수익"}
                        </div>
                        <div className="whitespace-nowrap text-right tracking-[0] leading-[normal] mr-5 text-sm">
                            (단위: 만 원)
                        </div>
                    </div>

                    <div className="w-full h-full">
                        {currentIndex === 0 && chartData && (
                            <Chart data={chartData} />
                        )}
                        {currentIndex === 1 && outgoingChartData && (
                            <Chart data={outgoingChartData} />
                        )}
                        {currentIndex === 2 && profitChartData && (
                            <Chart data={profitChartData} />
                        )}
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
            <SalesPeriodModal isOpen={isModalOpen} onClose={closeModal} onSearch={handleSearch} />
        </div>
    );
};

export default TotalSales;