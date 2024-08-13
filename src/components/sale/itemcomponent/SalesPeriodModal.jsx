import React, { useState } from "react";
import PeriodStart from "../../history/main/itemcomponent/PeriodStart"; 
import PeriodEnd from "../../history/main/itemcomponent/PeriodEnd";     
import dayjs from "dayjs";
import { IncomingMonthSales, IncomingWeekSales, OutgoingMonthSales, OutgoingWeekSales } from "../../../api/sale/salesApi";

const SalesPeriodModal = ({ isOpen, onClose, onSearch }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [periodType, setPeriodType] = useState(""); 
    const [chartData, setChartData] = useState(null);

    const dateFormat = "YYYY-MM-DD";
    const date = dayjs(endDate);

    const weekCalc = () => {
        setStartDate(date.subtract(6, "day").format(dateFormat));
        setPeriodType('week');
    };

    const threemonthCalc = () => {
        setStartDate(date.subtract(2, "month").format(dateFormat));
        setPeriodType('month');
    };

    const sixmonthCalc = () => {
        setStartDate(date.subtract(5, "month").format(dateFormat));
        setPeriodType('month');
    };

    const handleSearch = async () => {
        if (startDate && endDate) {
            try {
                const data = { startDate, endDate };

                let incomingData, outgoingData;

                if (periodType === 'week') {
                    incomingData = await IncomingWeekSales(data);
                    outgoingData = await OutgoingWeekSales(data);
                } else if (periodType === 'month') {
                    incomingData = await IncomingMonthSales(data);
                    outgoingData = await OutgoingMonthSales(data);
                }

                console.log("Incoming Data:", incomingData);
                console.log("Outgoing Data:", outgoingData);

                onSearch({ incomingData, outgoingData });
            } catch (error) {
                alert("조회 실패: " + error.message);
                console.error("조회 실패:", error); 
            } finally {
                onClose();
            }
        } else {
            alert("날짜를 설정해주세요.");
        }
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={onClose}
            ></div>
            
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg ${
                    isOpen ? "translate-y-0" : "translate-y-full"
                } transition-transform transform z-50`}
                style={{ height: "50%" }}
            >
                <button
                    className="absolute top-4 right-5 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="text-center py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold">조회 설정</h3>
                </div>
                <div className="p-4">
                    <div className="mb-2 text-sm text-gray-600">
                        조회기간
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <PeriodStart setStartDate={setStartDate} startDate={startDate} />
                        <span className="text-gray-600">~</span>
                        <PeriodEnd setEndDate={setEndDate} endDate={endDate} />
                    </div>
                    <div className="flex gap-2 mb-4">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        onClick={weekCalc}>
                            1주일
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        onClick={threemonthCalc}>
                            3개월
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        onClick={sixmonthCalc}>
                            6개월
                        </button>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    onClick={handleSearch}>
                        조회
                    </button>
                </div>
            </div>
        </>
    );
};

export default SalesPeriodModal;
