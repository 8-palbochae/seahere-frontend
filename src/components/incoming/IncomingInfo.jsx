
import React, { useState } from 'react'; 
import PropTypes from 'prop-types';

const IncomingInfo = ({ onAmountChange, onPriceChange, isAmountValid, isPriceValid }) => {
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        const valid = value.trim() !== '' && !isNaN(value);
        onAmountChange(value, valid);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
        const valid = value.trim() !== '' && !isNaN(value);
        onPriceChange(value, valid);
    };

    return (
        <div className='flex flex-col mt-6'>
            <div className='flex flex-col w-full items-center'>
                <div className='w-10/12 flex items-center'>
                    <div className='w-full font-bold text-2xl'>입고 정보 입력</div>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-5 shadow-md border border-gray-200 rounded-lg py-4 mx-4'>
                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center justify-between'>
                        <div className='w-full font-bold text-xl flex items-center'>
                            입고량 *
                            {!isAmountValid && (
                                <span className='text-red-500 ml-2'>입고량을 입력해주세요</span>
                            )}
                            {isAmountValid && (
                                <span className='text-green-500 ml-2'>✔</span>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <span className='ml-2 font-bold text-lg'>Kg</span>
                    </div>
                </div>

                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center justify-between'>
                        <div className='w-full font-bold text-xl flex items-center'>
                            입고 금액 *
                            {!isPriceValid && (
                                <span className='text-red-500 ml-2'>입고 금액을 입력해주세요</span>
                            )}
                            {isPriceValid && (
                                <span className='text-green-500 ml-2'>✔</span>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input
                            className='border p-2 flex-grow rounded-xl'
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                        />
                        <span className='ml-2 font-bold text-lg'>원</span>
                    </div>
                </div>
                <div className='flex flex-col w-full items-center'>
                     <div className='w-11/12 flex items-center'>
                         <div className='w-full font-bold text-xl'>원산지 세부사항</div>
                     </div>
                     <div className='flex items-center w-11/12 mt-2'>
                         <input className='border p-2 flex-grow rounded-xl' type="text" />
                     </div>
                 </div>

                 <div className='flex flex-col w-full items-center'>
                     <div className='w-11/12 flex items-center'>
                         <div className='w-full font-bold text-xl'>기타 사항</div>
                     </div>
                     <div className='flex items-center w-11/12 mt-2'>
                         <textarea className='border p-2 flex-grow rounded-xl' type="text" />
                     </div>
                 </div>
             </div>
         </div>
     );
 };


IncomingInfo.propTypes = {
    onAmountChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired,
    isAmountValid: PropTypes.bool.isRequired,
    isPriceValid: PropTypes.bool.isRequired
};

export default IncomingInfo;
