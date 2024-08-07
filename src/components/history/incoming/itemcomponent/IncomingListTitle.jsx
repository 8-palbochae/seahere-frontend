import React from 'react';

const IncomingListTitle = () => {
    return (
        <div className="w-full px-3">
            <div className="w-full h-[70px] bg-gray-100 flex items-center justify-between px-0 rounded-md">
                <div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
                    어종
                </div>
                <div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
                    분류
                </div>
                <div className="font-normal text-black text-base text-center leading-[normal] whitespace-nowrap flex-1">
                    입고량
                </div>
                <div className="font-normal text-black mr-2 text-base text-center leading-[normal] whitespace-nowrap flex-1">
                    입고금액
                    <br />
                    /1kg
                </div>
               
            </div>
        </div>
    );
};

export default IncomingListTitle;
