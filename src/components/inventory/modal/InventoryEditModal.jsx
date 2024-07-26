import React from 'react';
import productImg from '../../../assets/income/product.svg';
import { Select } from 'antd';

const InventoryEditModal = ({ dayOver, isOpen, onClose }) => {
    if (!isOpen) return null;
    const editOption = [
        {
            value: 1,
            label: '폐기',
        },
        {
            value: 2,
            label: '입력 오류',
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-80 p-6 rounded shadow-lg">
                <form className='flex flex-col'>
                    <div className='flex justify-center items-center mb-4'>
                        <img src={productImg} className='w-24 h-24 object-cover mr-4' alt="Product" />
                        <div className='flex flex-col gap-2'>
                            <p>광어</p>
                            <p>입고처 : 스파로스</p>
                            <p className='text-xs truncate text-red-500 border-2 rounded-full items-center text-center p-1'>+{dayOver}일</p>
                        </div>
                    </div>
                    <div className='flex justify-center mb-4'>
                        <Select
                            className='w-5/6'
                            showSearch
                            placeholder="수정 사유"
                            optionFilterProp="label"
                            options={editOption}
                        />
                    </div>
                    <div className='flex flex-col w-full justify-center items-center'>
                        <div className='flex items-center w-5/6 mb-4  pb-3'>
                            <label className='w-1/2 text-left pr-4'>입고량</label>
                            <input className='border p-2 flex-grow rounded-xl w-full' />
                        </div>
                        <div className='flex items-center w-5/6 mb-4'>
                            <label className='w-1/2 text-left pr-4'>입고 금액</label>
                            <input className='border p-2 flex-grow rounded-xl w-full' />
                        </div>
                    </div>

                    <div className="flex justify-around mt-5">
                        <button
                            type="button"
                            className="bg-blue-600 w-1/2 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            수정 완료
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 w-1/2 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InventoryEditModal;
