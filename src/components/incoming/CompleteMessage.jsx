import React from 'react';

const CompleteMessage = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={onClose}></div>
            <div className="relative w-[370px] bg-white rounded-[10px] shadow-lg p-6 z-20">
                <div className="text-center text-black text-lg font-medium mb-4">
                    입고 등록 완료
                </div>
                <p className="text-center mb-4">
                    입고 등록이 완료되었습니다.
                </p>
                <div className="w-full flex justify-center">
                    <button
                        className="w-[100px] h-8 bg-blue-600 rounded-[10px] text-white text-center font-medium"
                        onClick={onClose}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteMessage;
