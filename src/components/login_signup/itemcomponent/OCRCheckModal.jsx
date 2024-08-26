import React from 'react';

const OCRCheckModal = ({ onClose, onRetakeClick }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={onClose}></div>
            <div className="relative w-[370px] bg-white rounded-[10px] shadow-lg p-6 z-20">
                <div className="text-center text-black text-lg font-medium mb-4">
                    사업자 등록증 스캔 결과
                </div>

                <div className="text-center">
                    <p className="text-red-600 mb-4">OCR 스캔 실패</p>
                    <p className="text-black mb-4">다시 한번 촬영해주세요.</p>
                    <div className="flex justify-around">
                        <button
                            className="w-[100px] h-8 bg-red-600 rounded-[10px] text-white text-center font-medium"
                            onClick={onRetakeClick}
                        >
                            재촬영
                        </button>
                        <button
                            className="w-[100px] h-8 bg-gray-500 rounded-[10px] text-white text-center font-medium"
                            onClick={onClose}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OCRCheckModal;
