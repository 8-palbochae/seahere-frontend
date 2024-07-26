import React from 'react';
import PropTypes from 'prop-types';

const IncomingInfo = () => {
    return (
        <div className='flex flex-col mt-6'>
            <div className='flex flex-col w-full items-center'>
                <div className=' w-10/12 flex items-center'>
                        <div className=' w-full font-bold text-2xl'>입고 정보 입력</div>
                </div>
            </div>            

            <div className='flex flex-col gap-4 mt-5 shadow-md border border-gray-200 rounded-lg py-4 mx-4'>
                 <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center'>
                        <div className='w-full font-bold text-xl'>입고량 *</div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input className='border p-2 flex-grow rounded-xl' type="text" />
                        <span className='ml-2 font-bold text-lg'>Kg</span>
                    </div>
                </div>

                <div className='flex flex-col w-full items-center'>
                    <div className='w-11/12 flex items-center'>
                        <div className='w-full font-bold text-xl'>입고 금액 *</div>
                    </div>
                    <div className='flex items-center w-11/12 mt-2'>
                        <input className='border p-2 flex-grow rounded-xl' type="text" />
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

IncomingInfo.propTypes = {};

export default IncomingInfo;