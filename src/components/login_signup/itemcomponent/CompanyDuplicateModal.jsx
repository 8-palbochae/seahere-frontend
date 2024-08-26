import React from 'react';

const CompanyDuplicateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-8 lg:mx-16">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    이미 등록된 회사입니다.
                </h2>
                <p className="text-gray-600 mb-6">
                    입력한 사업자 등록번호로 이미 등록된 회사가 있습니다.
                </p>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDuplicateModal;
