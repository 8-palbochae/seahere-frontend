import React from "react";
import Icon from "../../../assets/sales/todaychart.svg";

const Today = () => {
    return (
        <div className="w-[370px] h-[182px] relative">
            <div className="relative w-full h-full bg-blue-600 rounded-[10px] top-2 left-5">
                <div className="flex items-center justify-start w-full h-[25px] [font-family:'Inter-Bold', Helvetica] font-bold text-white text-lg absolute top-2 left-4 tracking-[0] leading-[normal]">
                    <img src={Icon} alt="Icon" className="w-5 h-5 mr-1" />
                    오늘의 통계
                </div>
                <div className="flex justify-between  absolute top-10 left-2 right-2">
                    <div className="w-[33px] h-[11px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#afafaf] text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        입고
                    </div>
                    <div className="w-[33px] h-[11px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#afafaf] text-base text-center tracking-[0] leading-[normal] whitespace-nowrap">
                        출고
                    </div>
                    <div className="w-[33px] h-[11px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#afafaf] mr-12 tracking-[0] leading-[normal] whitespace-nowrap">
                        수익
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Today;
