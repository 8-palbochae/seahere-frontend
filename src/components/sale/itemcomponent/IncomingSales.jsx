import React from "react";

const IncomingSales = () =>{

    return(
        <div className="w-[370px] h-[314px]">
            <div className="fixed w-[374px] h-[314px] top-0 left-0">
                <div className="relative w-[370px] h-[314px] bg-blue-300 rounded-[10px]">
                    <div className="absolute w-[348px] h-[263px] top-[38px] left-[11px] bg-white rounded-[10px]">
                        <div className="w-[33px] h-[18px] top-2 left-2 [font-family:'Inter-Regular',Helvetica] font-normal text-[#afafaf] text-base whitespace-nowrap absolute text-center tracking-[0] leading-[normal]">
                        입고
                        </div>
                    </div>

                    <div className="w-[87px] h-[25px] top-[7px] left-[15px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-xl absolute text-center tracking-[0] leading-[normal]">
                        매출현황
                    </div>
                </div>

            </div>
        </div>

    );

};

export default IncomingSales;