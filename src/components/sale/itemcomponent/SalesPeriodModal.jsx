import React from "react";

const SalesPeriodModal = ({ isOpen, onClose }) => {
    return (
        <>
            {/* 배경 오버레이 */}
            <div
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${
                    isOpen ? "block" : "hidden"
                }`}
                onClick={onClose}
            ></div>
            
            {/* 모달창 */}
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
                    <div className="flex gap-2 mb-4">
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            1주일
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            3개월
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            6개월
                        </button>
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded py-2 px-3"
                        />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        조회
                    </button>
                </div>
            </div>
        </>
    );
};

export default SalesPeriodModal;
