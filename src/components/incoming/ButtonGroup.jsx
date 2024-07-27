import React, { useState } from 'react';
import CheckMessage from './CheckMessage'; // CheckMessage 경로에 맞게 수정

const ButtonGroup = ({ amount, price }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleAddClick = () => {
        let errorMessage = '';

        if (!amount && !price) {
            errorMessage = '입고량과 입고금액을 입력해주세요';
        } else if (!amount) {
            errorMessage = '입고량을 입력해주세요';
        } else if (!price) {
            errorMessage = '입고금액을 입력해주세요';
        }

        if (errorMessage) {
            setMessage(errorMessage);
            setShowModal(true);
        } else {
            setMessage('입고 등록이 완료되었습니다.');
            setShowModal(true);
        }
    };

    return (
        <div className='mt-5 flex flex-row justify-around items-center mb-6'>
            <div className='w-11/12 flex flex-row gap-5'>
                <button className='w-full bg-gray-200 text-black font-bold py-2 px-4 rounded-lg'>취소</button>
                <button
                    className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg  focus:ring-opacity-50'
                    onClick={handleAddClick}
                >
                    추가
                </button>
            </div>
            {showModal && (
                <CheckMessage 
                    onClose={() => setShowModal(false)} 
                    message={message} 
                />
            )}
        </div>
    );
};

export default ButtonGroup;
