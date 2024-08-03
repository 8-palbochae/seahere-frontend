import React, { useState, useEffect } from 'react';
import productImg from '../../../assets/income/product.svg';
import { Select } from 'antd';
import InventoryEditCheckModal from './InventoryEditCheckModal';

const InventoryEditModal = ({ name, quantity, isOpen, onClose, inventoryId }) => {
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [afterQuantity, setAfterQuantity] = useState('');
    const [isCompleteDisabled, setIsCompleteDisabled] = useState(true);

    useEffect(() => {
        if (!afterQuantity) {
            setIsCompleteDisabled(true);
        } else {
            setIsCompleteDisabled(false);
        }
    }, [afterQuantity]);

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

    const handleEditComplete = () => {
        if (!afterQuantity) {
            setAfterQuantity(quantity);
        }
        setIsCheckModalOpen(true);
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setAfterQuantity(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    };

    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white w-80 p-6 rounded shadow-lg">
                    <form className='flex flex-col'>
                        <div className='flex justify-center items-center mb-4'>
                            <img src={productImg} className='w-24 h-24 object-cover mr-4' alt="Product" />
                            <div className='flex flex-col gap-2'>
                                <p>{name}</p>
                                <p>현재재고 : {quantity}kg</p>
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
                            <div className='flex items-center w-5/6 mb-1 pb-1'>
                                <label className='w-1/2 text-left pr-4'>입고량</label>
                                <input
                                    className='border p-2 flex-grow rounded-xl w-full text-right'
                                    value={afterQuantity}
                                    onChange={handleQuantityChange}
                                    placeholder="0"
                                />
                                <span className="ml-2">kg</span>
                            </div>
                        </div>

                        <div className="flex justify-around mt-5">
                            <button
                                type="button"
                                className="bg-blue-600 w-1/2 text-white px-4 py-2 rounded mr-2"
                                onClick={handleEditComplete}
                                disabled={isCompleteDisabled}
                            >
                                수정
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
            {isCheckModalOpen && (
                <InventoryEditCheckModal
                    onClose={() => setIsCheckModalOpen(false)}
                    success={true}
                    onSuccessClick={() => setIsCheckModalOpen(false)}
                    currentQuantity={quantity}
                    afterQuantity={afterQuantity}
                    inventoryId={inventoryId}
                    reason={editOption.label}
                />
            )}
        </div>
    );
};

export default InventoryEditModal;
