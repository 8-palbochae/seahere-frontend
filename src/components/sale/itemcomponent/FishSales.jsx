import React from "react";
import Icon from '../../../assets/sales/fish.svg'


const FishSales = () => {

    
    return(
        <div className="w-[370px] h-[314px] relative mx-auto mt-3">
        <div className="relative w-[90%] h-[314px] bg-blue-600 rounded-[10px] mx-auto">
            <div className="absolute w-[95%] h-[263px] top-[40px] left-[50%] transform -translate-x-[50%] bg-white rounded-[10px]">
                <div className="flex justify-between items-center w-full h-[18px] [font-family:'Inter-Regular',Helvetica] font-normal text-base text-gray-500 mt-2 ml-2">
                </div>

                <div className="w-full h-full">
                   이곳은 차트가 나오는 부분
                </div>
            </div>
            <div className="flex items-center justify-start w-[90%] h-[25px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-lg absolute tracking-[0] leading-[normal] mt-2 ml-4">
                <div className="flex items-center">
                    <img src={Icon} alt="Icon" className="w-5 h-5 mr-1 mt-1" />
                    어종별 판매 순위
                </div>
                
            </div>
        </div>
        
    </div>
    );
};

export default FishSales;